//Required Node packages
const inquirer = require(`inquirer`);
const fs = require('fs');

//Declare classes
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

//Initialize empty array
const employees = [];

//Initialize application
function initApp() {
  createHtml();
  createEmployee();
}

//Collect responses from user inputs
function createEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter Team Member's name:",
      },
      {
        type: 'list',
        name: 'title',
        message: "Select Team Member's title:",
        choices: ['Manager', 'Engineer', 'Intern'],
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter Team Member's ID:",
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter Team Member's email address:",
      },
    ])
    .then(function ({ name, title, id, email }) {
      let titleInfo = '';
      if (title === 'Engineer') {
        titleInfo = 'GitHub Username';
      } else if (title === 'Intern') {
        titleInfo = 'School Name';
      } else {
        titleInfo = 'Office Number';
      }
      inquirer
        .prompt([
          {
            message: `Enter Team Member's ${titleInfo}:`,
            name: 'titleInfo',
          },
          {
            type: 'list',
            message: 'Would you like to add more Team Members?:',
            choices: ['yes', 'no'],
            name: 'moreMembers',
          },
        ])
        .then(function ({ titleInfo, moreMembers }) {
          let newMember;
          if (title === 'Engineer') {
            newMember = new Engineer(name, id, email, titleInfo);
          } else if (title === 'Intern') {
            newMember = new Intern(name, id, email, titleInfo);
          } else {
            newMember = new Manager(name, id, email, titleInfo);
          }
          employees.push(newMember);
          addHtml(newMember).then(function () {
            if (moreMembers === 'yes') {
              createEmployee();
            } else {
              endFile();
            }
          });
        });
    });
}