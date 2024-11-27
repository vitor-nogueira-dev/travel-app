import 'dotenv/config';
import mysql from 'mysql2/promise';

const isDocker = process.env.MYSQL_HOST === 'db';

const connection = mysql.createPool({
  host: isDocker ? 'db' : '127.0.0.1',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default connection;
