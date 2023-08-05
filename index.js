const inquirer = require('inquirer');
const fs = require('fs');


// Inquire the user on startup 
inquirer.prompt([
  {
    type: 'input',
    name: 'title',
    message: 'What is your project title?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter a description of your project.',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Enter installation instructions.',
  },
  {
    type: 'input',
    name: 'technologies',
    message: 'Enter any technologies used:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Enter usage information.',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Enter contribution guidelines.',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project.',
    choices: ['MIT', 'GPLv3', 'Apache', 'Unlicense', 'BSD'],
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub username.',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your github email:',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Enter your first and last name',
  }
])

  .then((response) => {
    console.log(response);


    const readme = generateReadme(response)


    fs.writeFile('README.md', readme, (err) =>
      err ? console.error(err) : console.log('Success!'))
  });



// A function to simply return a readme string
function generateReadme(response) {
  return `
# ${response.title}
  
![License](https://img.shields.io/badge/License-${encodeURIComponent(response.license)}-blue.svg)
  
## Description
  
${response.description}
  
## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Media](#media)
  - [Credits](#credits)
  
## Installation
  
${response.installation}

## Technologies
  
${response.technologies}
  
## Usage
  
${response.usage}
  
## License
  
This project is covered under the ${response.license} license.
  
## Contributing
  
${response.contributing}
  
 ## Media
  
## Credits
  ${response.name} | ${response.github}

  https://github.com/${response.github} | [${response.email}](mailto:${response.email})
  `;
}