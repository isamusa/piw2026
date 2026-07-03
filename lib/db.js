import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/piw2026';

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

let isInitialized = false;

export async function initDB() {
  if (isInitialized) return pool;

  const client = await pool.connect();
  try {
    // Create the central submissions table with indexing
    await client.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        ref_code VARCHAR(25) UNIQUE NOT NULL,
        type VARCHAR(50) NOT NULL,
        data JSONB NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_submissions_type ON submissions(type);
      CREATE INDEX IF NOT EXISTS idx_submissions_ref_code ON submissions(ref_code);
    `);
    
    isInitialized = true;
    console.log('PostgreSQL database schema initialized successfully.');
    return pool;
  } catch (err) {
    console.error('Failed to initialize PostgreSQL schema:', err.message);
    throw err;
  } finally {
    client.release();
  }
}

export async function query(text, params) {
  await initDB();
  return pool.query(text, params);
}
