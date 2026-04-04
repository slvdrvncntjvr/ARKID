# ProjectArk

ProjectArk is a Next.js App Router website with two major capabilities:

- Member lookup backed by Google Sheets.
- Certificate issuance and verification portal (bootcamps/events/programs).

## Certificate System (Implemented)

This project now includes:

- Public certificate verification portal:
  - /certificates
  - /certificates/:id
- Admin authentication for certificates:
  - /certificates/login
  - /certificates/dashboard
- Certificate APIs:
  - POST /api/certificates/auth/login
  - POST /api/certificates/auth/logout
  - POST /api/certificates/issue
  - POST /api/certificates/revoke
  - GET /api/certificates/verify?id=...
- Host-based rewrite middleware so the subdomain can use clean URLs:
  - https://www.certificates.arkph.tech/<CERTIFICATE_ID>

## Required Environment Variables

Use .env.example as reference.

Core Google Sheets:

- GOOGLE_SHEETS_SPREADSHEET_ID
- GOOGLE_SHEETS_CLIENT_EMAIL
- GOOGLE_SHEETS_PRIVATE_KEY
- CERTIFICATES_SHEET_NAME (default: CERTIFICATES)

Admin auth:

- ADMIN_USERS (format: user1:pass1,user2:pass2)
- or legacy ADMIN_USERNAME + ADMIN_PASSWORD

Session:

- SESSION_SECRET (use a long, random string)

Certificate domain behavior:

- CERTIFICATES_HOSTS (comma separated hosts for middleware rewrite)
- CERTIFICATES_BASE_URL (optional, controls verify URL returned by API)

## Local Development

1. Install dependencies:
	- npm install
2. Configure environment:
	- copy .env.example to .env.local
	- fill all required values
3. Run dev server:
	- npm run dev
4. Open:
	- http://localhost:3000/certificates

## Google Sheets Setup (Certificate Storage)

1. Create or choose a Google Spreadsheet.
2. Create a Google Cloud service account and enable Sheets API.
3. Share the spreadsheet with the service account email (Editor permission).
4. Put credentials in env vars:
	- GOOGLE_SHEETS_CLIENT_EMAIL
	- GOOGLE_SHEETS_PRIVATE_KEY
5. The app auto-creates the certificate tab (CERTIFICATES by default) and headers on first issue/verify request.

## Vercel + GitHub + Namecheap + SSL (arkph.tech)

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. In Vercel Project Settings -> Environment Variables, add all required vars from .env.example.
4. In Vercel Project Settings -> Domains, add:
	- certificates.arkph.tech
	- www.certificates.arkph.tech
5. In Namecheap DNS for arkph.tech, create records exactly as Vercel instructs.
	- Usually CNAME for subdomains to Vercel target.
6. Wait for DNS propagation.
7. In Vercel Domains page, confirm both domains show Valid Configuration.
8. SSL certificates are auto-provisioned by Vercel once DNS is correct.

## Expected Verification URLs

After deployment and DNS setup:

- https://www.certificates.arkph.tech/<CERTIFICATE_ID>
- https://certificates.arkph.tech/<CERTIFICATE_ID>

Both resolve to the same verification page through middleware rewrites.

## Security Notes

- Use strong admin passwords.
- Prefer ADMIN_USERS with unique credentials per issuer.
- Rotate SESSION_SECRET if compromised.
- Revoke certificates instead of deleting rows (audit trail).

## License

MIT
