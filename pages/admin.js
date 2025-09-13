
import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function Admin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    fetch('/api/reservations')
      .then(r=> {
        if (!r.ok) {
          Router.push('/login');
          return [];
        }
        return r.json();
      })
      .then(data => { setRows(data || []); setLoading(false); })
      .catch(()=> Router.push('/login'));
  }, []);

  return (
    <div style={{ padding:24 }}>
      <h2>Reservations</h2>
      {loading ? <div>Loading...</div> : (
        <table border="1" cellPadding="6">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>CheckIn</th><th>CheckOut</th><th>Guests</th><th>Created</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.phone}</td>
                <td>{r.checkIn}</td>
                <td>{r.checkOut}</td>
                <td>{r.guests}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ marginTop:12 }}>
        <a href="/logout">Logout</a>
      </div>
    </div>
  );
}
