
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: 1
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || 'Rildiance Tower Hotel';
  const hotelPhone = process.env.NEXT_PUBLIC_HOTEL_PHONE || '+234 808 775 8801';

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/create-booking', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Reservation request received. Please call us at ' + hotelPhone + ' to confirm.');
        setForm({ name:'', email:'', phone:'', checkIn:'', checkOut:'', guests:1 });
      } else {
        setMessage(data.error || 'Failed to create reservation.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="Reserve a room at Rildiance Tower Hotel" />
      </Head>
      <div style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', padding: 24, maxWidth: 900, margin:'0 auto' }}>
        <header style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:64, height:64, background:'#334155', color:'#fff', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>RT</div>
          <div>
            <h1 style={{ margin:0 }}>{siteTitle}</h1>
            <div style={{ color:'#475569' }}>Call to confirm: <strong>{hotelPhone}</strong></div>
          </div>
        </header>

        <main style={{ marginTop:24 }}>
          <h2>Reserve a Room</h2>
          <form onSubmit={handleSubmit} style={{ display:'grid', gap:10, maxWidth:600 }}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" required />
            <div style={{ display:'flex', gap:8 }}>
              <input name="checkIn" value={form.checkIn} onChange={handleChange} type="date" required />
              <input name="checkOut" value={form.checkOut} onChange={handleChange} type="date" required />
            </div>
            <input name="guests" value={form.guests} onChange={handleChange} type="number" min="1" />
            <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Book Now'}</button>
          </form>

          {message && <p style={{ marginTop:12 }}>{message}</p>}
        </main>

        <footer style={{ marginTop:36, color:'#64748b' }}>
          © {new Date().getFullYear()} {siteTitle}
        </footer>
      </div>
    </>
  );
}
