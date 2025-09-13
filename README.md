
# Rildiance Tower Hotel — Reservation Site (Serverless ready)

This is a minimal Next.js project prepared for deployment to Vercel (or similar serverless hosts).
It provides:
- Public reservation form (no online payment)
- Saves bookings into a SQLite database
- Sends email to hotel and guest on booking
- Admin area protected by a simple login (cookie-based)

## Deploy

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variables (see `.env.example`) — in Vercel add them in the Project → Settings → Environment Variables.

3. Run locally:
   ```bash
   npm run dev
   ```

4. Deploy to Vercel: connect your GitHub repo or upload this project, then deploy.

## Notes

- SQLite database file `reservations.db` will be created at runtime in the project root.
- For email sending use Gmail app password or any SMTP credentials and set `EMAIL_USER` and `EMAIL_PASS`.

