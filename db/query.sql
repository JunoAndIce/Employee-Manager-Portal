-- Add your code below and execute file in MySQL Shell --

-- Department View
-- SELECT * FROM department;


-- Department View
SELECT roles_id AS id, roles_id AS Title, roles_salary AS Salary, department_name AS Department;
from roles
JOIN department ON roles_department_id = department_id
