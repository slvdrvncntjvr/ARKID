import { sheets_v4 } from "googleapis";
import { randomBytes } from "crypto";
import { getGoogleSheetsClient, getGoogleSheetsWriteClient } from "@/lib/sheets";

const DEFAULT_CERTIFICATES_SHEET_NAME = "CERTIFICATES";

const CERTIFICATE_HEADERS = [
  "certificate_id",
  "student_name",
  "student_email",
  "program_name",
  "event_name",
  "completion_date",
  "issued_at",
  "issuer_username",
  "status",
  "revoked_at",
  "revoked_reason",
  "metadata_json",
] as const;

type CertificateStatus = "active" | "revoked";

export interface CertificateRecord {
  certificateId: string;
  studentName: string;
  studentEmail: string;
  programName: string;
  eventName: string;
  completionDate: string;
  issuedAt: string;
  issuerUsername: string;
  status: CertificateStatus;
  revokedAt: string;
  revokedReason: string;
  metadataJson: string;
}

export interface IssueCertificateInput {
  studentName: string;
  studentEmail?: string;
  programName: string;
  eventName?: string;
  completionDate: string;
  issuerUsername: string;
  metadata?: Record<string, unknown>;
}

export interface RevokeCertificateInput {
  certificateId: string;
  reason: string;
  revokedBy: string;
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getSheetName(): string {
  return (process.env.CERTIFICATES_SHEET_NAME || DEFAULT_CERTIFICATES_SHEET_NAME).trim();
}

function getSpreadsheetId(): string {
  return getRequiredEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function toRow(record: CertificateRecord): string[] {
  return [
    record.certificateId,
    record.studentName,
    record.studentEmail,
    record.programName,
    record.eventName,
    record.completionDate,
    record.issuedAt,
    record.issuerUsername,
    record.status,
    record.revokedAt,
    record.revokedReason,
    record.metadataJson,
  ];
}

function fromRow(headers: string[], row: unknown[]): CertificateRecord {
  const safeRow = row.map((value) => String(value || ""));

  const get = (header: string) => {
    const index = headers.findIndex((h) => normalize(h) === normalize(header));
    return index >= 0 ? safeRow[index] || "" : "";
  };

  const status = get("status") === "revoked" ? "revoked" : "active";

  return {
    certificateId: get("certificate_id"),
    studentName: get("student_name"),
    studentEmail: get("student_email"),
    programName: get("program_name"),
    eventName: get("event_name"),
    completionDate: get("completion_date"),
    issuedAt: get("issued_at"),
    issuerUsername: get("issuer_username"),
    status,
    revokedAt: get("revoked_at"),
    revokedReason: get("revoked_reason"),
    metadataJson: get("metadata_json"),
  };
}

function generateCertificateId(): string {
  const token = randomBytes(6).toString("hex").toUpperCase();
  return `ARK-CERT-${token}`;
}

async function getSheetTitles(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
): Promise<string[]> {
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });

  return meta.data.sheets?.map((sheet) => sheet.properties?.title || "") || [];
}

async function ensureCertificatesSheet(): Promise<void> {
  const sheets = await getGoogleSheetsWriteClient();
  const spreadsheetId = getSpreadsheetId();
  const sheetName = getSheetName();

  const titles = await getSheetTitles(sheets, spreadsheetId);

  if (!titles.includes(sheetName)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName,
              },
            },
          },
        ],
      },
    });
  }

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:L1`,
  });

  if (!existing.data.values || existing.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1:L1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [Array.from(CERTIFICATE_HEADERS)],
      },
    });
  }
}

async function getAllCertificateRows(): Promise<{
  headers: string[];
  rows: unknown[][];
}> {
  await ensureCertificatesSheet();

  const sheets = await getGoogleSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const sheetName = getSheetName();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:L`,
  });

  const values = response.data.values || [];

  if (values.length === 0) {
    return { headers: Array.from(CERTIFICATE_HEADERS), rows: [] };
  }

  const headers = values[0].map((header) => String(header || ""));
  const rows = values.slice(1);

  return { headers, rows };
}

export async function issueCertificate(
  input: IssueCertificateInput,
): Promise<CertificateRecord> {
  await ensureCertificatesSheet();

  const sheets = await getGoogleSheetsWriteClient();
  const spreadsheetId = getSpreadsheetId();
  const sheetName = getSheetName();

  const record: CertificateRecord = {
    certificateId: generateCertificateId(),
    studentName: input.studentName.trim(),
    studentEmail: (input.studentEmail || "").trim(),
    programName: input.programName.trim(),
    eventName: (input.eventName || "").trim(),
    completionDate: input.completionDate.trim(),
    issuedAt: new Date().toISOString(),
    issuerUsername: input.issuerUsername.trim(),
    status: "active",
    revokedAt: "",
    revokedReason: "",
    metadataJson: input.metadata ? JSON.stringify(input.metadata) : "",
  };

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:L`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [toRow(record)],
    },
  });

  return record;
}

export async function getCertificateById(
  certificateId: string,
): Promise<CertificateRecord | null> {
  const normalizedTarget = normalize(certificateId);
  const { headers, rows } = await getAllCertificateRows();

  for (const row of rows) {
    const record = fromRow(headers, row);
    if (normalize(record.certificateId) === normalizedTarget) {
      return record;
    }
  }

  return null;
}

export async function revokeCertificate(
  input: RevokeCertificateInput,
): Promise<CertificateRecord | null> {
  await ensureCertificatesSheet();

  const sheets = await getGoogleSheetsWriteClient();
  const spreadsheetId = getSpreadsheetId();
  const sheetName = getSheetName();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:L`,
  });

  const values = response.data.values || [];
  if (values.length === 0) {
    return null;
  }

  const headers = values[0].map((header) => String(header || ""));

  for (let index = 1; index < values.length; index += 1) {
    const row = values[index] || [];
    const current = fromRow(headers, row);

    if (normalize(current.certificateId) !== normalize(input.certificateId)) {
      continue;
    }

    const updated: CertificateRecord = {
      ...current,
      status: "revoked",
      revokedAt: new Date().toISOString(),
      revokedReason: `${input.reason.trim()} (by ${input.revokedBy.trim()})`,
    };

    const rowNumber = index + 1;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A${rowNumber}:L${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [toRow(updated)],
      },
    });

    return updated;
  }

  return null;
}