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
  console.log("connected as id " + connection.threadId);
  start();
//  viewEmployee();
//  viewDepartment();
//  viewRole();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do? Use arrow keys to select.",
      choices: [
        "View department",
        "View role",
        "View employee",
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
      
      }
    });
};


function viewEmployee() {
  connection.query("SELECT * FROM employee", function(err, res) {
    console.log(res);
    console.log("--------------------");
  });
};

function viewDepartment() {
  connection.query("SELECT * FROM department", function(err, res) {
    console.log(res);
    console.log("--------------------");
  });
};

function viewRole() {
  connection.query("SELECT * FROM employee_role", function(err, res) {
    console.log(res);
    console.log("--------------------");
  });
};


// function loadPrompts() {
//    view employees
 //   viewemployees by depart

 //function viewEmployees
 //select * from employees , all employees=>
 //cxocnsole.log employees
 //loadpromtps()

 //function add employee() {
//findAllRoles.then() {
    //const roleid - inquirer prompt;
    //findAllEmployees.then() {
     //   const managerid = prompt
  //   query to add employee to table
  //  }
//}
 //}




