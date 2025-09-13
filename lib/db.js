
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export async function getDB() {
  if (db) return db;
  db = await open({
    filename: './reservations.db',
    driver: sqlite3.Database
  });

  await db.exec(`CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    checkIn TEXT,
    checkOut TEXT,
    guests INTEGER,
    createdAt TEXT
  )`);

  return db;
}
