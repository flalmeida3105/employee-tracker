//#region //Setting const
const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');

const userChoice = {
    type: 'list',
    name: 'choice',
    message: 'Select a section below for more details!',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee'],
};
//#endregion //Setting const

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
            case "Add department":
                addDepartment();
                break;                 
            case "Add role":
                addRole();
                break;
            default: console.log("default")
        }
    })
}

//#region //Getting queries
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
//#endregion // Getting queries

//#region //Adding queries
function addDepartment() {
    inquirer.prompt([
        {
            type: 'text',
            name: 'name',
            message: 'What is the department\'s name?',
            validate: (nameInput) => {
                if (nameInput !== '' && isNaN(nameInput)) {
                    return true;
                } else {
                    return 'Please add a valid department name!';
                }
            }
        },
    ])
    .then((answer) => {
        const sql = `
            INSERT INTO departments (name) VALUES (?);
            `;
        const params = [answer.name];

        db.query(sql, params, (err) => {
            if (err) throw err;
            console.log('Department ' + answer.name + ' inserted');
            initializeQuestions();
        });
    });
        
};

function addRole() {
    db.query(`SELECT * FROM departments`, function(err, result) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'text',
                name: 'title',
                message: 'What is the role\'s name?',
                validate: (nameInput) => {
                    if (nameInput !== '' && isNaN(nameInput)) {
                        return true;
                    } else {
                        return 'Please add a valid role name!';
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the role\'s salary?',
                validate: (salaryInput) => {
                    if (isNaN(salaryInput) || salaryInput === '') {
                        return 'Please enter a number!';
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'rawlist',
                name: 'roleDepartment',
                choices: function(){
                    let roleDepartmentList = [];
                    for(i = 0; i < result.length; i++){
                        roleDepartmentList.push(result[i].id + ' - ' + result[i].name);

                    }
                    return roleDepartmentList;
                },
                message: 'Select a Department?'

    ,
                // validate: (roleDepartmentInput) => {
                //     if (isNaN(roleDepartmentInput) || roleDepartmentInput === '') {
                //         return true;
                //     } else {
                //         return 'Please enter a valid department name!';
                //     }
                // }
            },
        ])
        .then((answers) => {
            const sql = `
            INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);
            `;
            const params = [answers.title, answers.salary, answers.roleDepartment.split(' ')[0] ];

            db.query(sql, params, (err) => {
                if (err) throw err;
                console.log(`Role ${answers.title} with ${answers.salary} and ${answers.roleDepartment.split(' ')[0]}`);
                initializeQuestions();
            });
        });
    });
};



initializeQuestions();





//         } else if (answer.choice === "Add role") {
//             console.log(answer.choice)
//             
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


