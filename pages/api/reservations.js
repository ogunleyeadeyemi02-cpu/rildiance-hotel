
import { getDB } from '../../lib/db';

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return Object.fromEntries(cookieHeader.split(';').map(c => c.trim().split('=')));
}

export default async function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie || '');
  if (!cookies.admin) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  try {
    const db = await getDB();
    const rows = await db.all('SELECT * FROM reservations ORDER BY createdAt DESC');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
}
