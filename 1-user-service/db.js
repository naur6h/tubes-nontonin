const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST || 'mysql-db',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'nontonin',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test koneksi
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }

  console.log('MySQL Pool Connected');
  connection.release();
});

module.exports = db;