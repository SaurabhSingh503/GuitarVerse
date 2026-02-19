const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const DB_PATH = path.join(__dirname, '../database/guitarpro.db');
const SCHEMA_PATH = path.join(__dirname, '../database/schema.sql');
const SEED_PATH = path.join(__dirname, '../database/seed.sql');

// Make sure the database folder exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

let db = null;

async function getDB() {
  if (db) return db;
  db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });
  await db.run('PRAGMA journal_mode = WAL');
  await db.run('PRAGMA foreign_keys = ON');
  return db;
}

async function initDB() {
  const database = await getDB();

  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  await database.exec(schema);

  const row = await database.get('SELECT COUNT(*) AS c FROM songs');
  if (row.c === 0) {
    console.log('🌱 Seeding database with 100 songs...');
    const seed = fs.readFileSync(SEED_PATH, 'utf8');
    await database.exec(seed);
    console.log('✅ Database seeded!');
  }

  console.log('✅ Database ready at', DB_PATH);
}

module.exports = { getDB, initDB };