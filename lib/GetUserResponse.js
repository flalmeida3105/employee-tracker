const inquirer = require('inquirer');


const userChoice = {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee'],
};

class InitializeQuestions {
    constructor() {

    };

    getUserResponse() {
        inquirer.prompt(userChoice).then((answer) => {
            if (answer.choice === "View all departments") {
                console.log(answer.choice)
            } else if (answer.choice === "View all roles") {
                console.log(answer.choice)
            } else if (answer.choice === "View all employees") {
                console.log(answer.choice)
            } else if (answer.choice === "Add department") {
                console.log(answer.choice)
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
                    console.log(answer);
                })
            } else if (answer.choice === "Add role") {
                console.log(answer.choice)
                inquirer.prompt([
                    {
                        type: 'text',
                        name: 'name',
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
                ])
                .then((answer) => {
                    console.log(answer);
                })
            } else if (answer.choice === "Add employee") {
                console.log(answer.choice)
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
                        type: 'input',
                        name: 'role',
                        message: 'What is the role\'s role?',
                        validate: (roleInput) => {
                            if (isNaN(roleInput) || roleInput === '') {
                                return 'Please enter a number!';
                            } else {
                                return true;
                            }
                        }
                    },
                ])
                .then((answer) => {
                    console.log(answer);
                })
            } else if (answer.choice === "Update employee") {
                console.log(answer.choice)
            } 
        })
    }
    
}

module.exports = InitializeQuestions;

