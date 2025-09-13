
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'Missing' });

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    // set a simple cookie
    res.setHeader('Set-Cookie', 'admin=1; Path=/; HttpOnly; Max-Age=86400');
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
}
