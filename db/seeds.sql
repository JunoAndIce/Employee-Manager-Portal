INSERT INTO department (dpt_name)
VALUES ("Engineering"),
      ("Electronics"),
      ("Finance"),
      ("Legal"),
      ("Pharmacy");

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 180000, 1),
      ("Mechanical Engineer", 130000, 1),
      ("Creative Director", 150000, 2),
      ("Electronics Expert", 100000, 2),
      ("Accountant", 120000, 3),
      ("Treasurer", 160000, 3),
      ("Lawyer", 160000, 4),
      ("Corporate Secretary", 140000, 4),
      ("Head Surgeon", 200000, 5),
      ("Therapist", 110000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tony","Bespen",1, NULL),
      ("Jimmy","Atmos" 2, 1),
      ("Scott", "Pilgrim", 3, NULL),
      ("Justin", "Saint", 4, NULL),
      ("Anya", "Forger", 5, 6),
      ("Sarah", "Fortune", 6, NULL),
      ("Harry", "Osborne", 7, NULL),
      ("Yor", "Forger", 8, 7),
      ("Loid", "Forger", 9, NULL),
      ("Reo" "Mikage", 10, 9);
