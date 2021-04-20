const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

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
					"Add Departments",
					"Add Roles",
					"Add Employees",
					"View Departments",
					"View Roles",
					"View Employees",
					"Update Employee Roles",
					"Exit",
				],
			},
		])
		.then((answer) => {
			switch (answer.option) {
				case "Add Departments":
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
									consoleTable(res);
								}
							);
						});
					break;
				case "Add Roles":
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
									consoleTable(res);
								}
							);
						});
					break;
				case "Add Employees":
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
									consoleTable(res);
								}
							);
						});
					break;
				case "View All Departments":
					connection.query("SELECT * FROM department;", (err, res) => {
						if (err) throw err;
						consoleTable(res);
					});
					break;
				case "View All Roles":
					connection.query("SELECT * FROM role;", (err, res) => {
						if (err) throw err;
						consoleTable(res);
					});
					break;
				case "View All Employees":
					connection.query("SELECT * FROM employee;", (err, res) => {
						if (err) throw err;
						consoleTable(res);
					});
					break;
				case "Update Employee Roles":
					break;
				default:
					console.log("Bye");
					return;
			}
		});
};

run();
