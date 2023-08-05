const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config()


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

const questions = [
  {
    type: 'list',
    name: 'mainMenu',
    message: 'What would you like to do?',
    choices: [
      "View all departments",
      "Add a department",
      new inquirer.Separator(),
      "View all roles",
      "Add a role",
      new inquirer.Separator(),
      "View all employees",
      "Add an employee",
      "Update an employee's role",
      new inquirer.Separator(),
      "Exit",
      new inquirer.Separator()
    ]
  }
];

// Create a function to initialize app
function init() {
  inquirer.prompt(questions)
    .then(function (answers) {
      console.log(answers);

      switch (answers.mainMenu) {

        case 'View all departments':
          db.query('SELECT * FROM department', function (err, results) {
            console.log(results);
            return init();
          });

        case 'Add a department':
          
          inquirer.prompt(questions)
            .then(function (answers) {
              console.log(answers);
              
              db.query('INSERT * FROM department', function (err, results) {
                console.log(results);
                return init();
              });
            })
          
          
      }
    });
};

init();
// // Count # of favorite books in_stock and # of favorite books not in_stock.
// db.query('SELECT * FROM movies', function (err, results) {
//   console.log(results);
// });
// // Count # of favorite books in_stock and # of favorite books not in_stock.
// db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
//   console.log(results);
// });

// // Gets # of books and groups by section, grabs max, min, and average quantity.
// db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
//   console.log(results);
// });

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
