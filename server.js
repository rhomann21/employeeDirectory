var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
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
        connection.end();
        break;  

      }
    });
};

//View employyes
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

//view dapartments
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

//view roles
function viewRole() {
  var query = "SELECT * FROM employee_role";
  connection.query(query, (err, res) => {
  if (err) throw err;
  for (var i = 0; i < res.length; i++) {
    console.log(`Role: ${res[i].title}  ||  Salary: $${res[i].salary}`)
  }
  start();
  });
};


function addEmployee() {
  inquirer.prompt([
      {
          type: "input",
          name: "first",
          message: "Enter Employee First Name: ",
      },
      {
          type: "input",
          name: "last",
          message: "Enter Employee Last Name: ",
      },
      {
          type: "input",
          name: "id",
          message: "Enter Employee's ID': ",
      },
      {
          type: "input",
          name: "role",
          message: "Enter Employee's Role ID: ",
      },
      {
          type: "input",
          name: "manager",
          message: "Enter Employee's Manager ID: ",
      },
  ]).then(answer => {

      connection.query(
          "INSERT INTO employee SET ?",
          {
              id: answer.id,
              first_name: answer.first,
              last_name: answer.last,
              role_id: answer.role,
              manager_id: answer.manager

          }, function (err, res) {
              if (err) throw err;
              console.log('Employee Added!');
              start();
          });
  });
};

function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the new department?"
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO department SET ?",
          {
            dept_name: answer.name
          },
          function(err) {
            if (err) throw err;
            console.log("Department added successfully!");
            start();
          }
        );
      });
  };

function addRole() {
  inquirer.prompt([
      {
          type: "input",
          name: "title",
          message: "Enter employee's name: ",
      },
      {
          type: "input",
          name: "deptID",
          message: "Enter employee's department ID: ",
      },
      {
          type: "input",
          name: "id",
          message: "Enter employee's ID: ",
      },
      {
          type: "input",
          name: "salary",
          message: "Enter employee's salary",
      },
  ]).then(answer => {
      connection.query(
          "INSERT INTO employee_role SET ?",
          {
              title: answer.title,
              id: answer.id,
              department_id: answer.deptID,
              salary: answer.salary

          }, function (err, res) {
              if (err) throw err;
              console.log("Employee Role Added!");
          });
          start();

  });
};



