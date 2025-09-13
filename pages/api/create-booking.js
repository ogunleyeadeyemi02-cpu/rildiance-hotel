
import { getDB } from '../../lib/db';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, phone, checkIn, checkOut, guests } = req.body || {};

  if (!name || !email || !phone || !checkIn || !checkOut) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const db = await getDB();
    await db.run(
      'INSERT INTO reservations (name, email, phone, checkIn, checkOut, guests, createdAt) VALUES (?,?,?,?,?,?,?)',
      [name, email, phone, checkIn, checkOut, guests || 1, new Date().toISOString()]
    );

    // send emails
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT || 587),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const hotelEmail = process.env.HOTEL_EMAIL;

    // email to guest
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Rildiance Tower Hotel — Reservation Request Received`,
      text: `Hello ${name},\n\nWe received your reservation request from ${checkIn} to ${checkOut}. Please call ${process.env.HOTEL_PHONE || '+234 808 775 8801'} to confirm.\n\nThank you.`
    });

    // email to hotel
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: hotelEmail,
      subject: `New reservation request — ${name}`,
      text: `New reservation:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}`
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
