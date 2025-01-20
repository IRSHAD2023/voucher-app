const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use environment variable
  ssl: {
    rejectUnauthorized: false, // Required for hosted databases
  },
});

// Logging for debugging
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err.stack);
});

pool.connect()
  .then(client => {
    console.log('✅ Successfully connected to PostgreSQL database');
    client.release();
  })
  .catch(err => {
    console.error('❌ Error connecting to PostgreSQL database:', err.message);
  });

module.exports = pool;
