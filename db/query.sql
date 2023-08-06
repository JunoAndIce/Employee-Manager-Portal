-- Add your code below and execute file in MySQL Shell --

-- WHEN I choose to view all departments
-- THEN I am presented with a formatted table showing department names and      department ids
-- SELECT * FROM department;

-- WHEN I choose to view all roles
-- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

-- SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.dpt_name AS Department
-- FROM roles
-- JOIN department ON roles.department_id = department.id

-- WHEN I choose to view all employees
-- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

-- SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, roles.title AS JobTitle, roles.salary AS Salary, department.dpt_name AS Department, employee.manager_id AS ManagerID
-- FROM employee
-- JOIN roles on employee.roles_id = roles.id
-- JOIN department on roles.department_id = department.id

UPDATE employee
SET roles_id = '5'
WHERE id = 3