import { google, sheets_v4 } from "googleapis";

export async function getGoogleSheetsClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
}

/**
 * Fetches all worksheet/tab names from the spreadsheet.
 * Returns them in order, with "MEMBERS" prioritised first (if it exists).
 */
async function getAllSheetNames(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
): Promise<string[]> {
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });

  const sheetTitles =
    meta.data.sheets?.map((s) => s.properties?.title ?? "") ?? [];

  // Prioritise the MEMBERS tab so it's searched first
  const sorted = sheetTitles.sort((a, b) => {
    const aIsMembers = a.toUpperCase() === "MEMBERS" ? 0 : 1;
    const bIsMembers = b.toUpperCase() === "MEMBERS" ? 0 : 1;
    return aIsMembers - bIsMembers;
  });

  return sorted;
}

export interface UserRecord {
  email: string;
  id: string;
  name?: string;
  department?: string;
  [key: string]: any;
}

export interface MemberRecord {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  joined: string;
  source: string;
}

export async function searchUserByEmail(
  email: string,
): Promise<UserRecord | null> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

    // Get all tabs and search through each one
    const sheetNames = await getAllSheetNames(sheets, spreadsheetId);

    for (const sheetName of sheetNames) {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A:Z`,
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) continue;

      // Assume first row is headers
      const headers = rows[0].map((h: any) => String(h).toLowerCase());
      const emailIndex = headers.indexOf("email");
      const idIndex = headers.indexOf("id");

      // Skip tabs that don't have the required columns
      if (emailIndex === -1 || idIndex === -1) continue;

      // Search for matching email (case-insensitive)
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row[emailIndex]?.toLowerCase() === email.toLowerCase()) {
          // Build user record from row data
          const userRecord: UserRecord = {
            email: row[emailIndex],
            id: row[idIndex],
          };

          // Add other columns dynamically
          headers.forEach((header, index) => {
            if (header !== "email" && header !== "id" && row[index]) {
              userRecord[header] = row[index];
            }
          });

          return userRecord;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error searching Google Sheets:", error);
    throw error;
  }
}

export async function searchMemberById(
  memberId: string,
): Promise<MemberRecord | null> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

    // Get all tabs and search through each one
    const sheetNames = await getAllSheetNames(sheets, spreadsheetId);

    for (const sheetName of sheetNames) {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A:Z`,
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) continue;

      // Assume first row is headers
      const headers = rows[0].map((h: any) => String(h).toLowerCase());
      const idIndex = headers.indexOf("id");
      const nameIndex = headers.indexOf("name");
      const emailIndex = headers.indexOf("email");
      const departmentIndex = headers.indexOf("department");
      const roleIndex = headers.indexOf("role");
      const joinedIndex = headers.indexOf("joined");

      // Skip tabs that don't have the required 'id' column
      if (idIndex === -1) continue;

      // Search for matching member ID (case-insensitive)
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row[idIndex]?.toUpperCase() === memberId.toUpperCase()) {
          return {
            id: row[idIndex],
            name: row[nameIndex] || "Unknown",
            email: row[emailIndex] || "No email provided",
            department: row[departmentIndex] || "No department",
            role: row[roleIndex] || "Member",
            joined: row[joinedIndex] || "Unknown",
            source: sheetName,
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error searching member by ID:", error);
    throw error;
  }
}

export async function searchMember(query: string): Promise<MemberRecord[]> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

    // Get all tabs and search through each one
    const sheetNames = await getAllSheetNames(sheets, spreadsheetId);

    const queryLower = query.toLowerCase().trim();
    const results: MemberRecord[] = [];

    for (const sheetName of sheetNames) {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A:Z`,
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) continue;

      // Assume first row is headers
      const headers = rows[0].map((h: any) => String(h).toLowerCase());
      const idIndex = headers.indexOf("id");
      const nameIndex = headers.indexOf("name");
      const emailIndex = headers.indexOf("email");
      const departmentIndex = headers.indexOf("department");
      const roleIndex = headers.indexOf("role");
      const joinedIndex = headers.indexOf("joined");

      // Skip tabs that don't have the required 'id' column
      if (idIndex === -1) continue;

      // Search for matching member by ID, name, or email (case-insensitive)
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const id = row[idIndex]?.toLowerCase() || "";
        const name = row[nameIndex]?.toLowerCase() || "";
        const email = row[emailIndex]?.toLowerCase() || "";

        // Check if query matches ID, name, or email
        if (
          id === queryLower ||
          name.includes(queryLower) ||
          email === queryLower
        ) {
          results.push({
            id: row[idIndex],
            name: row[nameIndex] || "Unknown",
            email: row[emailIndex] || "No email provided",
            department: row[departmentIndex] || "No department",
            role: row[roleIndex] || "Member",
            joined: row[joinedIndex] || "Unknown",
            source: sheetName,
          });
        }
      }
    }

    return results;
  } catch (error) {
    console.error("Error searching member:", error);
    throw error;
  }
}

export function verifyAdmin(username: string, password: string): boolean {
  // Parse ADMIN_USERS from env (format: "user1:pass1,user2:pass2,user3:pass3")
  const adminUsers = process.env.ADMIN_USERS || "";

  if (adminUsers) {
    const users = adminUsers.split(",").map((user) => {
      const [u, p] = user.trim().split(":");
      return { username: u, password: p };
    });

    return users.some(
      (user) => user.username === username && user.password === password,
    );
  }

  // Fallback to single admin from legacy env vars
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}