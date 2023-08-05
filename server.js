const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Parabellum',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);

inquirer.prompt([
  {
    type: ''
  }
])

// Count # of favorite books in_stock and # of favorite books not in_stock.
db.query('SELECT * FROM movies', function (err, results) {
  console.log(results);
});
// Count # of favorite books in_stock and # of favorite books not in_stock.
db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
  console.log(results);
});

// Gets # of books and groups by section, grabs max, min, and average quantity.
db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
  console.log(results);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
