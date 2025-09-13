
import { useState } from 'react';
import Router from 'next/router';

export default function Login() {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    setErr('');
    const res = await fetch('/api/login', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ username: u, password: p })
    });
    if (res.ok) {
      Router.push('/admin');
    } else {
      const data = await res.json();
      setErr(data.error || 'Login failed');
    }
  }

  return (
    <div style={{ padding:24 }}>
      <h2>Admin Login</h2>
      <form onSubmit={submit} style={{ display:'grid', gap:8, maxWidth:320 }}>
        <input value={u} onChange={e=>setU(e.target.value)} placeholder="Username" required />
        <input value={p} onChange={e=>setP(e.target.value)} placeholder="Password" type="password" required />
        <button type="submit">Login</button>
        {err && <div style={{ color:'red' }}>{err}</div>}
      </form>
    </div>
  );
}
