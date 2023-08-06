const mysql = require('mysql2');

require('dotenv').config()

const password = process.env.DB_PASS;

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

module.exports = db;