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
									console.table(res);
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
											department_id: answer.id,
										},
										(err, res) => {
											if (err) throw err;
											console.table(res);
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
							inquirer
								.prompt([
									{
										type: "input",
										message: "Enter Employee First Name:",
										name: "nameFirst",
									},
									{
										type: "input",
										message: "Enter Employee Last Name:",
										name: "nameLast",
									},
									{
										type: "list",
										message: "Enter Employee Role:",
										name: "role",
										choices: roleList,
									},
									{
										type: "list",
										message: "Enter Employee Role:",
										name: "role",
										choices: roleList,
									},
								])
								.then((answer) => {
									connection.query(
										"INSERT INTO employee SET ?",
										{
											first_name: answer.nameFirst,
											last_name: answer.nameLast,
											role_id: answer.role,
										},
										(err, res) => {
											if (err) throw err;
											console.table(res);
											return run();
										}
									);
								});
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
						"SELECT title as Postion, salary as Salary, name as Department FROM role INNER JOIN department ON role.id;",
						(err, res) => {
							if (err) throw err;
							console.table(res);
							return run();
						}
					);
					break;
				case "View All Employees":
					connection.query(
						"SELECT CONCAT(first_name,' ', last_name) as Name, title as Postion, salary as Salary, name as Department FROM employee, department INNER JOIN role ON role.id;",
						(err, res) => {
							if (err) throw err;
							console.table(res);
							return run();
						}
					);
					break;
				case "Update Employee Role":
					return run();
				default:
					console.log("Bye");
					return close();
			}
		});

run();
