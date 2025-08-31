import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,      // database host
  user: process.env.DB_USER,      // your MySQL username
  password: process.env.DB_PASS,  // your MySQL password
  database: process.env.DB_NAME,  // database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;