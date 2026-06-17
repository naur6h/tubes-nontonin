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

function connectWithRetry(retries = 10, delay = 3000) {
  db.getConnection((err, connection) => {
    if (err) {
      console.error(`Database connection failed (retries left: ${retries}):`, err.message);
      if (retries > 0) {
        setTimeout(() => connectWithRetry(retries - 1, delay), delay);
      } else {
        console.error('Could not connect to database. Exiting.');
        process.exit(1);
      }
      return;
    }
    console.log('MySQL Pool Connected');
    connection.release();
  });
}

connectWithRetry();

module.exports = db;