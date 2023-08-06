const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');



const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Main Questions
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

const runEmployeePortal = async (answers) => {
  switch (answers.mainMenu) {

    case 'View all departments':
      db.query(`SELECT * FROM department`, function (err, results) {
        // Reduce function to replace the first index column with the id's.
        // The table looks nicer :)
        const newTable = results.reduce((acc, { id, ...x }) => { acc[id] = x; return acc }, {})
        console.table(newTable);
        return init();
      });
      break;

    case 'Add a department':
      inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter a department name:',
        }
      ])
        .then(function (answers) {
          db.query('INSERT INTO department(dpt_name) VALUES (?)', answers.name, (err, results) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            console.log(`${answers.name} has been added to the department table.`);
            return init();
          });
        })
      break;

    case 'View all roles':
      db.query('SELECT * FROM roles', function (err, results) {
        // Reduce function to replace the first index column with the id's.
        // The table looks nicer :)
        const newTable = results.reduce((acc, { id, ...x }) => { acc[id] = x; return acc }, {})
        console.table(newTable);
        return init();
      });
      break;

    case 'Add a role':
      db.query(`SELECT * FROM department`, function (err, results) {
        // Mapping the object to an array with name/value pair.
        const newArr = results.map(({ dpt_name, id }) => ({ 'name': dpt_name, 'value': id }))
        inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter a role name:',
          },
          {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role:',
            validate: function (input) {
              if (isNaN(input)) {
                return 'Please enter a valid number'
              }
            }
          },
          {
            type: 'list',
            name: 'dpt',
            message: 'Select a department that this role belongs to:',
            choices: newArr
          }
        ])
          .then(function (answers) {
            db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [answers.title, answers.salary, answers.dpt], (err, results) => {
              console.log(`${answers.title} has been added to the roles table.`);
              return init();
            });
          })
      });
      break;

    case 'View all employees':
      db.query(`SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, roles.title AS Role, roles.salary AS Salary, department.dpt_name AS Department, employee.manager_id AS ManagerID FROM employee JOIN roles on employee.roles_id = roles.id JOIN department on roles.department_id = department.id`, function (err, results) {
        // Reduce function to replace the first index column with the id's.
        // The table looks nicer :)
        const newTable = results.reduce((acc, { ID, ...x }) => { acc[ID] = x; return acc }, {})
        console.table(newTable);
        return init();
      });
      break;

    case 'Add an employee':
      db.query('SELECT * FROM roles', function (err, results) {
        // Mapping the object to an array with name/value pair.
        const roleArr = results.map(({ title, id }) => ({ 'name': title, 'value': id }))
        if (err) throw err;

        db.query('SELECT * FROM employee', function (err, results) {

          const manArr = results.map(({ first_name, last_name, id }) => ({ 'name': first_name + " " + last_name, 'value': id }))
          // Pushing NULL as a choice into the array.
          manArr.push('null')
          if (err) throw err;

          inquirer.prompt([
            {
              type: 'input',
              name: 'firstName',
              message: `Enter the employee's first name:`,
            },
            {
              type: 'input',
              name: 'lastName',
              message: `Enter the employee's last name:`,
            },
            {
              type: 'list',
              name: 'role',
              message: `Select this employee's role:`,
              choices: roleArr
            },
            {
              type: 'list',
              name: 'manager',
              message: `Select the manager for this employee:`,
              choices: manArr
            }
          ])

            .then(function (answers) {
              // set manager to true null.
              if (answers.manager === 'null') {
                answers.manager = null;
              }
              db.query('INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)', [answers.firstName, answers.lastName, answers.role, answers.manager], (err, results) => {
                if (err) throw err;
                console.log(`${answers.firstName} ${answers.lastName} has been added to the employee table.`);
                return init();
              });
            })
        });
      });
      break;

    case `Update an employee's role`:
      db.query('SELECT * FROM roles', function (err, results) {

        const roleArr = results.map(({ title, id }) => ({ 'name': title, 'value': id }))
        if (err) throw err;

        db.query('SELECT * FROM employee', function (err, results) {
          // Mapping the object to an array with name/value pair.
          const empArr = results.map(({ first_name, last_name, id }) => ({ 'name': first_name + " " + last_name, 'value': id }))
          const manArr = results.map(({ first_name, last_name, id }) => ({ 'name': first_name + " " + last_name, 'value': id }))
          // Pushing NULL as a choice into the array.
          manArr.push('null')
          if (err) throw err;

          inquirer.prompt([
            {
              type: 'list',
              name: 'employee',
              message: `Select the employee you would like to edit:`,
              choices: empArr,
            },
            {
              type: 'list',
              name: 'role',
              message: `Select this employee's new role:`,
              choices: roleArr
            },
            {
              type: 'list',
              name: 'change',
              message: `Do you want to change this employee's manager?`,
              choices: ['Yes', 'No']
            },
            {
              type: 'list',
              name: 'manager',
              message: `Select a new manager for this employee:`,
              choices: manArr,
              when: (answers) => answers.change === 'Yes'
            },
          ])

            .then(function (answers) {

              if (answers.change === 'No') {
                db.query('UPDATE employee SET roles_id = ? WHERE id = ?', [answers.role, answers.employee], (err, results) => {
                  console.log(`Employee ID ${answers.employee} has been updated.`);
                  return init();
                });
              }

              if (answers.change === 'Yes') {
                // set manager to true null.
                if (answers.manager === 'null') {
                  answers.manager = null;
                }
                db.query('UPDATE employee SET roles_id = ?, manager_id = ? WHERE id = ?', [answers.role, answers.manager, answers.employee], (err, results) => {
                  if (err) throw err;
                  console.log(`Employee ID ${answers.employee} has been updated.`);
                  return init();
                });
              }
            })
        });
      });
      break;
    case `Exit`:
      process.exit()
  }
}

// Create a function to initialize app
function init() {
  console.log(`
                _______  __   __  _______  ___      _______  __   __  _______  _______ 
               |       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |
               |    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|
               |   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___ 
               |    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|
               |   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___ 
               |_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|
                _______  _______  ______   _______  _______  ___     
               |       ||       ||    _ | |       ||   _   ||   |    
               |    _  ||   _   ||   | || |_     _||  |_|  ||   |    
               |   |_| ||  | |  ||   |_||   |   |  |       ||   |    
               |    ___||  |_|  ||    __ |  |   |  |       ||   |___ 
               |   |    |       ||   |  ||  |   |  |   _   ||       |
               |___|    |_______||___|  ||  |___|  |__| |__||_______|
  `)
  inquirer.prompt(questions)
    .then(function (answers) {
      runEmployeePortal(answers);
      // Check answers perform functions based on answer choices 
    });
};

init();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
