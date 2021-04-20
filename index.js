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

const run = () => {
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
									name: `${answer.dep}`,
								},
								(err, res) => {
									if (err) throw err;
									console.table(res);
								}
							);
						});
					return close();
				case "Add Role":
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
						])
						.then((answer) => {
							connection.query(
								"INSERT INTO role SET ?",
								{
									title: `${answer.title}`,
									salary: `${answer.salary}`,
								},
								(err, res) => {
									if (err) throw err;
									console.table(res);
								}
							);
						});
					return close();
				case "Add Employee":
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
						])
						.then((answer) => {
							connection.query(
								"INSERT INTO employee SET ?",
								{
									first_name: `${answer.nameFirst}`,
									last_name: `${answer.nameLast}`,
								},
								(err, res) => {
									if (err) throw err;
									console.table(res);
								}
							);
						});
					return close();
				case "View All Departments":
					connection.query("SELECT * FROM department;", (err, res) => {
						if (err) throw err;
						console.table(res);
					});
					return close();
				case "View All Roles":
					connection.query(
						"SELECT role.id, title, salary, department.name FROM role INNER JOIN department ON role.id;",
						(err, res) => {
							if (err) throw err;
							console.table(res);
						}
					);
					return close();
				case "View All Employees":
					connection.query("SELECT * FROM employee;", (err, res) => {
						if (err) throw err;
						console.table(res);
					});
					return close();
				case "Update Employee Role":
					return close();
				default:
					console.log("Bye");
					return close();
			}
		});
};

run();
