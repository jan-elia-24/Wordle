import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

console.log('🔧 Database URL:', process.env.DATABASE_URL ? 'Exists' : 'Missing');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Testa connection
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Connected to Supabase'))
  .catch(err => console.error('❌ Supabase connection failed:', err.message));

// Skapa tabell
pool.query(`
  CREATE TABLE IF NOT EXISTS highscores (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    attempts INTEGER NOT NULL,
    time INTEGER NOT NULL,
    wordLength INTEGER NOT NULL,
    allowRepeats BOOLEAN NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).then(() => console.log('✅ Table ready'))
  .catch(err => console.error('❌ Table error:', err));

export async function saveHighscore(name, attempts, time, wordLength, allowRepeats) {
  const query = `
    INSERT INTO highscores (name, attempts, time, wordLength, allowRepeats) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *
  `;
  
  const values = [name, attempts, time, wordLength, allowRepeats];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error saving highscore:', err);
    throw err;
  }
}

export async function getAllHighscores() {
  const query = `
    SELECT 
      id,
      name,
      attempts,
      time,
      wordlength as "wordLength",        
      allowrepeats as "allowRepeats",    
      date
    FROM highscores 
    ORDER BY time ASC, attempts ASC 
    LIMIT 10
  `;
  
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Error fetching highscores:', err);
    throw err;
  }
}