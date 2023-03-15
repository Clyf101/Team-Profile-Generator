const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const teamTemplate = require('./Templates/template.hbs');

const teamMembers = [];

const addManager = async () => {
  const managerAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the team manager's name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the team manager's employee ID?",
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the team manager's email address?",
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "What is the team manager's office number?",
    },
  ]);
  

  const manager = new Manager(
    managerAnswers.name,
    managerAnswers.id,
    managerAnswers.email,
    managerAnswers.officeNumber
  );

  teamMembers.push(manager);

  console.log('\nManager added successfully!\n');
  await addTeamMember();
};

const addEngineer = async () => {
  const engineerAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the engineer's name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the engineer's employee ID?",
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the engineer's email address?",
    },
    {
      type: 'input',
      name: 'github',
      message: "What is the engineer's GitHub username?",
    },
  ]);

  const engineer = new Engineer(
    engineerAnswers.name,
    engineerAnswers.id,
    engineerAnswers.email,
    engineerAnswers.github
  );

  teamMembers.push(engineer);

  console.log('\nEngineer added successfully!\n');
  await addTeamMember();
};

const addIntern = async () => {
  const internAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the intern's name?",
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the intern's employee ID?",
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the intern's email address?",
    },
    {
      type: 'input',
      name: 'school',
      message: "What school does the intern attend?",
    },
  ]);

  const intern = new Intern(
    internAnswers.name,
    internAnswers.id,
    internAnswers.email,
    internAnswers.school
  );

  teamMembers.push(intern);

  console.log('\nIntern added successfully!\n');
  await addTeamMember();
};

const addTeamMember = async () => {
    const addTeamMemberAnswers = await inquirer.prompt([
      {
        type: 'list',
        name: 'addTeamMemberChoice',
        message: 'What would you like to do?',
        choices: [
          'Add an engineer',
          'Add an intern',
          'Finish building my team',
        ],
      },
    ]);
  
    switch (addTeamMemberAnswers.addTeamMemberChoice) {
      case 'Add an engineer':
        await addEngineer();
        break;
  
      case 'Add an intern':
        await addIntern();
        break;
  
      case 'Finish building my team':
        const renderedTeam = teamTemplate(teamMembers);
        fs.writeFile('./dist/index.html', renderedTeam, (err) => {
          if (err) throw err;
          console.log(
            '\nSuccess! Your team page has been generated and saved to ./dist/index.html.\n'
          );
        });
        break;
  
      default:
        console.log('\nInvalid choice. Please try again.\n');
        await addTeamMember();
        break;
    }
  };
  