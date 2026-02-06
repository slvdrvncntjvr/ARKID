import { google } from "googleapis";

export async function getGoogleSheetsClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
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
}

export async function searchUserByEmail(
  email: string,
): Promise<UserRecord | null> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    // Read data from the sheet (adjust range as needed)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:Z", // Adjust based on your sheet structure
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return null;
    }

    // Assume first row is headers
    const headers = rows[0].map((h: any) => String(h).toLowerCase());
    const emailIndex = headers.indexOf("email");
    const idIndex = headers.indexOf("id");

    if (emailIndex === -1 || idIndex === -1) {
      throw new Error("Sheet must have 'email' and 'id' columns");
    }

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
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    // Read data from Members sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Members!A:Z", // Adjust sheet name and range as needed
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return null;
    }

    // Assume first row is headers: id, name, email, department, role, joined
    const headers = rows[0].map((h: any) => String(h).toLowerCase());
    const idIndex = headers.indexOf("id");
    const nameIndex = headers.indexOf("name");
    const emailIndex = headers.indexOf("email");
    const departmentIndex = headers.indexOf("department");
    const roleIndex = headers.indexOf("role");
    const joinedIndex = headers.indexOf("joined");

    if (idIndex === -1) {
      throw new Error("Members sheet must have 'id' column");
    }

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
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error searching member by ID:", error);
    throw error;
  }
}

export async function searchMember(
  query: string,
): Promise<MemberRecord | null> {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    // Read data from Members sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Members!A:Z",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return null;
    }

    // Assume first row is headers: id, name, email, department, role, joined
    const headers = rows[0].map((h: any) => String(h).toLowerCase());
    const idIndex = headers.indexOf("id");
    const nameIndex = headers.indexOf("name");
    const emailIndex = headers.indexOf("email");
    const departmentIndex = headers.indexOf("department");
    const roleIndex = headers.indexOf("role");
    const joinedIndex = headers.indexOf("joined");

    if (idIndex === -1) {
      throw new Error("Members sheet must have 'id' column");
    }

    const queryLower = query.toLowerCase().trim();

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
        return {
          id: row[idIndex],
          name: row[nameIndex] || "Unknown",
          email: row[emailIndex] || "No email provided",
          department: row[departmentIndex] || "No department",
          role: row[roleIndex] || "Member",
          joined: row[joinedIndex] || "Unknown",
        };
      }
    }

    return null;
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
