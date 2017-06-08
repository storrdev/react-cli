#!/usr/bin/env node

let chalk      = require('chalk');
let changeCase = require('change-case');
let fs         = require('fs');
let Handlebars = require('handlebars');
let path       = require('path');
let program    = require('commander');

program
  .arguments('<name>')
  .option('-r --redux', 'Connect the component to redux')
  .action(name => {

    let redux = typeof program.redux !== 'undefined';

    // If components or containers directory doesn't exist, create it first.
    if (!fs.existsSync(process.cwd() + `/${redux ? 'containers' : 'components'}`)) {
      fs.mkdirSync(process.cwd() + `/${redux ? 'containers' : 'components'}`);
    }

    // Create dir for component/container
    let dir = process.cwd() + `/${redux ? 'containers' : 'components'}/${name}`;

    if (fs.existsSync(dir)) {
      console.error(chalk.red(`The ${redux ? 'container' : 'component'} "${name}" already exists.`));
      // Exit with failure
      process.exit(1);
    }

    fs.mkdirSync(dir);

    let options = {
      "name":      name,
      "className": changeCase.paramCase(name)
    };

    /*
      Create package.json file
     */

    let packagePath = `${dir}/package.json`;

    let packageSource = fs.readFileSync(__dirname + '/templates/package.json').toString();

    let packageTemplate = Handlebars.compile(packageSource);

    let packageResult = packageTemplate(options);

    fs.writeFile(packagePath, packageResult, err => {
      if (err) throw err;
      console.log(chalk.green(`The ${redux ? 'container' : 'component'}'s "package.json" has been created successfully!`));
    });

    /*
      Create component or container file
     */

    let scriptPath = `${dir}/${name}.js`;

    let scriptSource = fs.readFileSync(__dirname + `/templates/${redux ? 'container' : 'component'}.js`).toString();

    let scriptTemplate = Handlebars.compile(scriptSource);

    let scriptResult = scriptTemplate(options);

    fs.writeFile(scriptPath, scriptResult, err => {
      if (err) throw err;
      console.log(chalk.green(`The ${redux ? 'container' : 'component'} "${name}" has been created successfully!`));
    });
  })
  .parse(process.argv);
