//#region //Setting const
const inquirer = require('inquirer');
const db = require('./db/connection');

const userChoice = {
    type: 'list',
    name: 'choice',
    message: 'Select a section below for more details!',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee', 'Exit'],
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
            case "Add employee":
                addEmployee();
                break; 
            case "Update employee":
                updateEmployee();
                break; 
            case "Exit":
                console.log('\x1b[93m%s\x1b[0m',"\n>>>>>>>>>> Good Bye! <<<<<<<<<<<\n")
                process.exit(0); 
            default: console.log("Please select a valid option")
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
            console.log('\x1b[93m%s\x1b[0m', '\n>>>>>>>>>> Department ' + answer.name + ' inserted! <<<<<<<<<<<\n');
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
                message: 'Select a Department?',
            },
        ])
        .then((answers) => {
            const sql = `
            INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);
            `;
            const params = [answers.title, answers.salary, answers.roleDepartment.split(' ')[0] ];

            db.query(sql, params, (err) => {
                if (err) throw err;
                console.log('\x1b[93m%s\x1b[0m', `\n>>>>>>>>>> The Role ${answers.title} with a base salary of ${answers.salary} was assigned to the ${answers.roleDepartment.split(' ')[2]} department was added! <<<<<<<<<<<\n`);
                initializeQuestions();
            });
        });
    });
};

function addEmployee() {
    const sql = `
        select 
        employee.id AS Employee_ID, 
        employee.first_name AS 'First Name', 
        employee.last_name AS 'Last Name',  
        CONCAT(employee.first_name, ' ',employee.last_name) AS fullName, 
        roles.id as Role_ID,
        roles.title AS Role, 
        employee.manager_id as Manager_ID,
        CONCAT(supervisor.first_name, ' ',supervisor.last_name) AS Manager
        from employees employee
        LEFT OUTER JOIN roles ON employee.role_id=roles.id  
        LEFT JOIN employees supervisor ON employee.manager_id  = supervisor.id;`;
    
    db.query(sql, function (err, result) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'text',
                name: 'firstName',
                message: 'What is the employee\'s first name?',
                validate: (firstNameInput) => {
                    if (firstNameInput !== '' && isNaN(firstNameInput)) {
                        return true;
                    } else {
                        return 'Please add a valid name!';
                    }
                }
            },
            {
                type: 'text',
                name: 'lastName',
                message: 'What is the employee\'s last name?',
                validate: (lastNameInput) => {
                    if (lastNameInput !== '' && isNaN(lastNameInput)) {
                        return true;
                    } else {
                        return 'Please add a valid name!';
                    }
                }
            },
            {
                type: 'rawlist',
                name: 'roleList',
                choices: function () {
                    let roleList = [];
                    for (i = 0; i < result.length; i++) {
                        roleList.push(result[i].Role_ID + ' - ' + result[i].Role);
                    }
                    return roleList;
                },
                message: 'Select a Role!',
            },
            {
                type: 'rawlist',
                name: 'managerList',
                choices: function () {
                    let managerList = ['0 - None'];
                    for (i = 0; i < result.length; i++) {
                        managerList.push(result[i].Employee_ID + ' - ' + result[i].fullName);
                    }
                    return managerList;
                },
                message: 'Select a Manager!',
            },
        ])
        .then((answers) => {
            const sql = `
                INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);
                `;
            if (parseInt(answers.managerList.split(' ')[0]) === 0) {
               const params = [answers.firstName, answers.lastName, answers.roleList.split(' ')[0], null];

                db.query(sql, params, (err) => {
                    if (err) throw err;
                    console.log('\x1b[93m%s\x1b[0m',`\n>>>>>>>>>> The employee ${answers.firstName} ${answers.lastName} was added to the ${answers.roleList.split(' - ').pop()} department and reports to himself or herself! <<<<<<<<<<<\n`);
                    initializeQuestions();
                });
            } else {
                const params = [answers.firstName, answers.lastName, answers.roleList.split(' ')[0], answers.managerList.split(' ')[0]];
                db.query(sql, params, (err) => {
                    if (err) throw err;
                    console.log('\x1b[93m%s\x1b[0m',`\n>>>>>>>>>> The employee ${answers.firstName} ${answers.lastName}, was added to the ${answers.roleList.split(' - ').pop()} department and reports to ${answers.managerList.split(' - ').pop()} <<<<<<<<<<<\n`);
                    initializeQuestions();
                });
            };
        });
    })
}

function updateEmployee() {
    const sql = `
        select 
        employee.id AS Employee_ID, 
        employee.first_name AS 'First Name', 
        employee.last_name AS 'Last Name',  
        CONCAT(employee.first_name, ' ',employee.last_name) AS fullName, 
        roles.id as Role_ID,
        roles.title AS Role, 
        employee.manager_id as Manager_ID,
        CONCAT(supervisor.first_name, ' ',supervisor.last_name) AS Manager
        from employees employee
        LEFT OUTER JOIN roles ON employee.role_id=roles.id  
        LEFT JOIN employees supervisor ON employee.manager_id  = supervisor.id;`;

    db.query(sql, function (err, result) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'employeeList',
                choices: function () {
                    let employeeList = [];
                    for (i = 0; i < result.length; i++) {
                        employeeList.push(result[i].Employee_ID + ' - ' + result[i].fullName);
                    }
                    return employeeList;
                },
                message: 'Select the employee to change!',
            }, {
                type: 'rawlist',
                name: 'roleList',
                choices: function () {
                    let roleList = [];
                    for (i = 0; i < result.length; i++) {
                        roleList.push(result[i].Role_ID + ' - ' + result[i].Role);
                    }
                    return roleList;
                },
                message: 'Choose a new role to the employee!',
            },
        ])
        .then((answers) => {
            const sql = `
                UPDATE employees SET Role_ID = ? WHERE id = ?;
                `;
            const params = [answers.roleList.split(' ')[0], answers.employeeList.split(' ')[0]];

            db.query(sql, params, (err) => {
                if (err) throw err;
                console.log('\x1b[93m%s\x1b[0m',`\n>>>>>>>>>> The employee ${answers.employeeList.split(' - ').pop()} has been assigned to the ${answers.roleList.split(' - ').pop()} role! <<<<<<<<<<<\n`);
                initializeQuestions();
            });
        });
    });
}
//#endregion // Adding queries

initializeQuestions();



