# ProjectArk - ID Finder

Modern web application for administrative ID lookup, built with Next.js 14 and integrated with Google Sheets as a database.

## Features

- 🔐 Secure admin authentication
- 🔍 Email-based ID lookup
- 📊 Google Sheets integration
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Built on Next.js 14 with TypeScript
- 🚀 Ready for Vercel deployment

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Google Sheets

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the Google Sheets API
4. Create a Service Account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Create a new service account
   - Generate a JSON key file
5. Create a Google Sheet with this structure:

   | email | id | name | department |
   |-------|----|----- |------------|
   | user@example.com | 12345 | John Doe | IT |

6. Share your Google Sheet with the service account email (found in the JSON key)

### 3. Environment Variables

Create `.env.local` file:

```env
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
GOOGLE_SHEETS_SPREADSHEET_ID="your-spreadsheet-id"

ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password"

SESSION_SECRET="generate-a-random-secret-at-least-32-characters-long"
```

**Finding the Spreadsheet ID:**
From your Google Sheet URL: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Option 2: Vercel Dashboard

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your repository
4. Add environment variables in project settings
5. Deploy

**Important:** Add all environment variables from `.env.local` to Vercel:
- Settings > Environment Variables
- Add each variable for Production, Preview, and Development

## Project Structure

```
projectark/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/        # Authentication endpoints
│   │   │   └── search/      # Search endpoint
│   │   ├── dashboard/       # Admin dashboard
│   │   ├── login/           # Login page
│   │   └── layout.tsx
│   └── lib/
│       ├── session.ts       # Session management
│       └── sheets.ts        # Google Sheets integration
├── public/
├── package.json
└── next.config.js
```

## Usage

1. **Login**: Use admin credentials from `.env.local`
2. **Search**: Enter an email address to lookup user ID
3. **Results**: View complete user information from the database

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Google Sheets API
- **Auth**: Iron Session
- **Deployment**: Vercel

## Security Notes

- Never commit `.env.local` to git
- Use strong passwords for admin access
- Keep service account credentials secure
- Enable 2FA on Google Cloud project

## License

MIT
