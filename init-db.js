import fs from 'fs';
import mysql from 'mysql2/promise';

const isDocker = process.env.MYSQL_HOST === 'db';

const config = {
  host: isDocker ? 'db' : '127.0.0.1',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
};

async function initDatabase() {
  try {
    const connection = await mysql.createConnection(config);

    const sql = fs.readFileSync('/app-backend/src/database/init.sql', 'utf8');

    const statements = sql
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt);

    for (const statement of statements) {
      await connection.query(statement);
    }

    console.log('Banco de dados inicializado com sucesso.');
    await connection.end();
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    process.exit(1);
  }
}

async function waitForMySQL() {
  while (true) {
    try {
      const connection = await mysql.createConnection(config);
      await connection.query('SELECT 1');
      await connection.end();
      break;
    } catch (error) {
      console.log('Aguardando o MySQL iniciar...');
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  await initDatabase();
}

waitForMySQL();
