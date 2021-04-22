const mysql = require("mysql");
const inquirer = require("inquirer");
const close = () => connection.end();
require("console.table");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password1",
	database: "company_db",
});

const run = () =>
	inquirer
		.prompt([
			{
				type: "list",
				message: "What would you like to do?",
				name: "option",
				choices: [
					"Add Department",
					"Add Role",
					"Add Employee",
					"View All Departments",
					"View All Roles",
					"View All Employees",
					"Update Employee Role",
					"Exit",
				],
			},
		])
		.then((answer) => {
			switch (answer.option) {
				case "Add Department":
					inquirer
						.prompt([
							{
								type: "input",
								message: "Enter Department name:",
								name: "dep",
							},
						])
						.then((answer) => {
							connection.query(
								"INSERT INTO department SET ?",
								{
									name: answer.dep,
								},
								(err, res) => {
									if (err) throw err;
									return run();
								}
							);
						});
					break;
				case "Add Role":
					connection.query(
						"SELECT name, id as value from department;",
						(err, depList) => {
							if (err) throw err;
							inquirer
								.prompt([
									{
										type: "input",
										message: "Enter Role title:",
										name: "title",
									},
									{
										type: "input",
										message: "Enter Role Salary:",
										name: "salary",
									},
									{
										type: "list",
										message: "Select Department:",
										name: "dep",
										choices: depList,
									},
								])
								.then((answer) => {
									connection.query(
										"INSERT INTO role SET ?",
										{
											title: answer.title,
											salary: answer.salary,
											department_id: answer.dep,
										},
										(err, res) => {
											if (err) throw err;

											return run();
										}
									);
								});
						}
					);
					break;
				case "Add Employee":
					connection.query(
						"SELECT title as name, id as value from role;",
						(err, roleList) => {
							if (err) throw err;
							connection.query(
								"SELECT CONCAT(employee.first_name,' ', employee.last_name) AS name, id AS value FROM employee;",
								(err, managerList) => {
									if (err) throw err;
									inquirer
										.prompt([
											{
												type: "input",
												message: "Enter Employee First Name:",
												name: "First",
											},
											{
												type: "input",
												message: "Enter Employee Last Name:",
												name: "Last",
											},
											{
												type: "list",
												message: "Enter Employee Role:",
												name: "role",
												choices: roleList,
											},
											{
												type: "list",
												message: "Enter Employee's Manager:",
												name: "manager",
												choices: managerList,
											},
										])
										.then((answer) => {
											connection.query(
												"INSERT INTO employee SET ?",
												{
													first_name: answer.First,
													last_name: answer.Last,
													role_id: answer.role,
													manager_id: answer.manager,
												},
												(err, res) => {
													if (err) throw err;
													return run();
												}
											);
										});
								}
							);
						}
					);
					break;
				case "View All Departments":
					connection.query(
						"SELECT name as Department FROM department;",
						(err, res) => {
							if (err) throw err;
							console.table(res);
							return run();
						}
					);
					break;
				case "View All Roles":
					connection.query(
						"SELECT role.title AS Position, role.salary AS Salary, name AS Department FROM role LEFT JOIN department ON department_id = department.id ORDER BY department;",
						(err, res) => {
							if (err) throw err;
							console.table(res);
							return run();
						}
					);
					break;
				case "View All Employees":
					connection.query(
						"SELECT CONCAT(employee.first_name,' ', employee.last_name) AS Employee, role.title AS Position, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY department;",
						(err, res) => {
							if (err) throw err;
							console.table(res);
							return run();
						}
					);
					break;
				case "Update Employee Role":
					connection.query(
						"SELECT CONCAT(first_name,' ',last_name) AS name, id AS value FROM employee;",
						(err, empList) => {
							if (err) throw err;
							connection.query(
								"SELECT title as name, id as value from role;",
								(err, roleList) => {
									if (err) throw err;
									inquirer
										.prompt([
											{
												type: "list",
												message: "Pick an Employee:",
												name: "employee",
												choices: empList,
											},
											{
												type: "list",
												message: "Pick a Role",
												name: "role",
												choices: roleList,
											},
										])
										.then((answer) => {
											connection.query(
												"UPDATE employee SET ? WHERE ? ;",
												[{ role_id: answer.role }, { id: answer.employee }],
												(err, res) => {
													if (err) throw err;
													return run();
												}
											);
										});
								}
							);
						}
					);
					break;
				default:
					console.log("Bye");
					return close();
			}
		});

run();
