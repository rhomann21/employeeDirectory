var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Rach!805618H",
  database: "employee_db"
});

connection.connect(function(err) { 
  if (err) throw err;
 // console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do? Use arrow keys to select.",
      choices: [
        "View all employees",
        "View departments",
        "View roles",
        "Add employee",
        "Add role",
        "Update employee role",
        "Add department",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {

      case "View department":
        viewDepartment();
        break;

      case "View role":
        viewRole();
        break;

      case "View employee":
        viewEmployee();
        break;

      case "Add employee":
        addEmployee();
        break;      
      
      case "Add role":
        addRole();
        break;            
      
      case "Update employee role":
        updateRole();
        break;      
        
      case "Add department":
        addDepartment();
        break;  

      case "Exit":
        exitApp();
        break;  

      }
    });
};


function viewEmployee() {
  var query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(`Name: ${res[i].first_name} ${res[i].last_name}`);
    }
    start();
  });
};


function viewDepartment() {
  var query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
  if (err) throw err;
  for (var i = 0; i < res.length; i++) {
    console.log(`Department: ${res[i].dept_name}`);
  }
  start();
  });
};


function viewRole() {
  var query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
  if (err) throw err;
  for (var i = 0; i < res.length; i++) {
    console.log(`Role: ${res[i].title}  ||  Salary: $${res[i].salary}`)
  }
  start();
  });
};




