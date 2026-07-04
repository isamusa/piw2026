import { Pool } from 'pg';

const connectionString = 
  process.env.DATABASE_URL || 
  process.env.POSTGRES_URL || 
  process.env.SUPABASE_DATABASE_URL || 
  'postgresql://postgres:postgres@localhost:5432/piw2026';

const isRemote = connectionString.includes('supabase') || 
  (!connectionString.includes('localhost') && !connectionString.includes('127.0.0.1'));

// Clean connectionString by removing conflicting sslmode parameters to ensure pg respects the Pool's ssl options
let cleanConnectionString = connectionString;
try {
  const parsedUrl = new URL(connectionString);
  if (parsedUrl.searchParams.has('sslmode')) {
    parsedUrl.searchParams.delete('sslmode');
    cleanConnectionString = parsedUrl.toString();
  }
} catch (e) {
  // Fallback if URL parsing fails
}

const pool = new Pool({
  connectionString: cleanConnectionString,
  ssl: isRemote ? { rejectUnauthorized: false } : false
});

let isInitialized = false;

export async function initDB() {
  if (isInitialized) return pool;

  const client = await pool.connect();
  try {
    // Create the central submissions table with indexing (ignore PgBouncer transaction errors if already created)
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
    
    console.log('PostgreSQL database schema initialized successfully.');
  } catch (err) {
    console.warn('Failed to run schema DDL statements (non-fatal in transaction-pooling environments):', err.message);
  } finally {
    isInitialized = true;
    client.release();
  }
  return pool;
}

export async function query(text, params) {
  await initDB();
  return pool.query(text, params);
}
