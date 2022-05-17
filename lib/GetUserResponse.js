const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');


const userChoice = {
    type: 'list',
    name: 'choice',
    message: 'Select a section below for more details!',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee'],
};

function initializeQuestions() {
    inquirer.prompt(userChoice).then((answer) => {
        switch (answer.choice) {
            case 'View all departments':
                getAllDepartments();
                break;
            case "View all roles":
                getAllRoles();
                break;
            case "View all employees":
                getAllEmployees();
                break;
            default: console.log("default")
        }
    })
}

//#region //Get All
function getAllDepartments() {
    const sql = `
        SELECT * FROM departments;
        `;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        initializeQuestions();
    });
};

function getAllRoles() {
    const sql = `
        SELECT * FROM roles;
        `;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        initializeQuestions();
    });
};

function getAllEmployees() {
    const sql = `
        select 
        employee.id AS 'Employee ID', 
        employee.first_name AS 'First Name', 
        employee.last_name AS 'Last Name',  
        roles.title AS Role, 
        employee.manager_id as 'Manager ID',
        CONCAT(supervisor.first_name, ' ',supervisor.last_name) AS Manager
        from employees employee
        LEFT OUTER JOIN roles ON employee.role_id=roles.id  
        LEFT JOIN employees supervisor ON employee.manager_id  = supervisor.id;
        `;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        initializeQuestions();
    });
};

//#endregion

initializeQuestions();




// getUserResponse() {
//     inquirer.prompt(userChoice).then((answer) => {
//         if (answer.choice === "View all departments") {
//             const sql = `
//                     SELECT * FROM departments;
//                     `;
//             db.query(sql, (err, rows) => {
//                 if (err) {
//                     res.status(500).json({ error: err.message });
//                     return;
//                 }
//                 console.table(rows);
//             }).then((response) => { this.getUserResponse(); })

//         } else if (answer.choice === "View all roles") {
//             console.log(answer.choice)
//         } else if (answer.choice === "View all employees") {
//             console.log(answer.choice)
//         } else if (answer.choice === "Add department") {
//             console.log(answer.choice)
//             inquirer.prompt([
//                 {
//                     type: 'text',
//                     name: 'name',
//                     message: 'What is the department\'s name?',
//                     validate: (nameInput) => {
//                         if (nameInput !== '' && isNaN(nameInput)) {
//                             return true;
//                         } else {
//                             return 'Please add a valid department name!';
//                         }
//                     }
//                 },
//             ])
//                 .then((answer) => {
//                     console.log(answer);
//                 })
//         } else if (answer.choice === "Add role") {
//             console.log(answer.choice)
//             inquirer.prompt([
//                 {
//                     type: 'text',
//                     name: 'name',
//                     message: 'What is the role\'s name?',
//                     validate: (nameInput) => {
//                         if (nameInput !== '' && isNaN(nameInput)) {
//                             return true;
//                         } else {
//                             return 'Please add a valid role name!';
//                         }
//                     }
//                 },
//                 {
//                     type: 'input',
//                     name: 'salary',
//                     message: 'What is the role\'s salary?',
//                     validate: (salaryInput) => {
//                         if (isNaN(salaryInput) || salaryInput === '') {
//                             return 'Please enter a number!';
//                         } else {
//                             return true;
//                         }
//                     }
//                 },
//                 {
//                     type: 'text',
//                     name: 'roleDepartment',
//                     message: 'What is the role\'s Department?',
//                     validate: (roleDepartmentInput) => {
//                         if (isNaN(roleDepartmentInput) || roleDepartmentInput === '') {
//                             return true;
//                         } else {
//                             return 'Please enter a valid department name!';
//                         }
//                     }
//                 },
//             ])
//                 .then((answer) => {
//                     console.log(answer);
//                 })
//         } else if (answer.choice === "Add employee") {
//             console.log(answer.choice)
//             inquirer.prompt([
//                 {
//                     type: 'text',
//                     name: 'firstName',
//                     message: 'What is the employee\'s first name?',
//                     validate: (firstNameInput) => {
//                         if (firstNameInput !== '' && isNaN(firstNameInput)) {
//                             return true;
//                         } else {
//                             return 'Please add a valid name!';
//                         }
//                     }
//                 },
//                 {
//                     type: 'text',
//                     name: 'lastName',
//                     message: 'What is the employee\'s last name?',
//                     validate: (lastNameInput) => {
//                         if (lastNameInput !== '' && isNaN(lastNameInput)) {
//                             return true;
//                         } else {
//                             return 'Please add a valid name!';
//                         }
//                     }
//                 },
//                 {
//                     type: 'input',
//                     name: 'role',
//                     message: 'What is the role\'s role?',
//                     validate: (roleInput) => {
//                         if (isNaN(roleInput) || roleInput === '') {
//                             return 'Please enter a number!';
//                         } else {
//                             return true;
//                         }
//                     }
//                 },
//             ])
//                 .then((answer) => {
//                     console.log(answer);
//                 })
//         } else if (answer.choice === "Update employee") {
//             console.log(answer.choice)
//         }
//     })
// }


