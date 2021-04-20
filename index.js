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
							console.log(answer.dep);
						});
					break;
				case "Add Roles":
					inquirer
						.prompt([
							{
								type: "input",
								message: "Enter Role name:",
								name: "role",
							},
						])
						.then((answer) => {
							console.log(answer.role);
						});
					break;
				case "Add Employees":
					inquirer
						.prompt([
							{
								type: "input",
								message: "Enter Employee name:",
								name: "emp",
							},
						])
						.then((answer) => {
							console.log(answer.emp);
						});
					break;
				case "View Departments":
					break;
				case "View Roles":
					break;
				case "View Employees":
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
