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
		.then((result) => {
			switch (result.option) {
				case "Add Departments":
					console.log("Add Departments");
					break;
				case "Add Roles":
					console.log("Add Roles");
					break;
				case "Add Employees":
					console.log("Add Employees");
					break;
				case "View Departments":
					console.log("View Departments");
					break;
				case "View Roles":
					console.log("View Roles");
					break;
				case "View Employees":
					console.log("View Employees");
					break;
				case "Update Employee Roles":
					console.log("Update Employee Roles");
					break;
				default:
					console.log("Bye");
					return;
			}
		});
};

run();
