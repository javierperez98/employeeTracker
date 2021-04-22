CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE role (
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
	id INT PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
    role_id INT,
	FOREIGN KEY(role_id) REFERENCES role(id),
    manager_id INT,
	FOREIGN KEY(manager_id) REFERENCES employee(id)
);

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Cashier", 30000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tim", "Timmy", 1, 1);

SELECT role.id, title, salary, name
FROM role
INNER JOIN department ON department.id;

SELECT CONCAT(employee.first_name," ", employee.last_name) AS Employee, role.title AS Position, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
FROM employee
LEFT JOIN employee manager on manager.id = employee.manager_id
INNER JOIN role ON (role.id = employee.role_id)
INNER JOIN department ON (department.id = role.department_id);

UPDATE employee
SET role_id = ?
WHERE id = ?;

SELECT CONCAT(first_name,' ',last_name) AS name, id AS value
FROM employee;

SELECT role.id, title, salary, name FROM role INNER JOIN department ON role.id;

SELECT name, id as value from department;
SELECT title as name, id as value from role;
SELECT * FROM role;
SELECT * FROM employee;