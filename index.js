#!/usr/bin/env node

let chalk      = require('chalk');
let changeCase = require('change-case');
let fs         = require('fs');
let path       = require('path');
let program    = require('commander');

let linkScssFile = require('./linkScssFile');
let templateFile = require('./templateFile');

program
  .arguments('<name>')
  .option('-r --redux', 'Connect the component to redux')
  .option('-s --scss', 'Create a scss file for the component')
  .option('-m --material', 'Create a material ui component')
  .action(name => {

    let redux     = typeof program.redux !== 'undefined';
    let scss      = typeof program.scss !== 'undefined';
    let material  = typeof program.material !== 'undefined';

    // // If components or containers directory doesn't exist, create it first.
    // if (!fs.existsSync(process.cwd() + `/${redux ? 'containers' : 'components'}`)) {
    //   fs.mkdirSync(process.cwd() + `/${redux ? 'containers' : 'components'}`);
    // }

    // // Create dir for component/container
    // let dir = process.cwd() + `/${redux ? 'containers' : 'components'}/${name}`;

    // if (fs.existsSync(dir)) {
    //   console.error(chalk.red(`The ${redux ? 'container' : 'component'} "${name}" already exists.`));
    //   // Exit with failure
    //   process.exit(1);
    // }

    // fs.mkdirSync(dir);

    let options = {
      "name":      name,
      "className": changeCase.paramCase(name)
    };

    /*
      Create package.json file
     */

    templateFile(`package.json`, 'package.json', options, () => {
      console.log(chalk.green(`The ${redux ? 'container' : 'component'}'s "package.json" has been created successfully!`));
    });

    /*
      Create component or container file
     */

    if (material) {
      templateFile(`${name}.js`, 'component/material.js', options, () => {
        console.log(chalk.green(`The material ui component "${name}" has been created successfully!`));
      });

      templateFile(`styles.js`, 'component/styles.js', options, () => {
        console.log(chalk.green(`The material ui component "${name}"'s style.js has been created successfully!`));
      });
    } else {
      templateFile(`${dir}/${name}.js`, `${redux ? 'container' : 'component'}.js`, options, () => {
        console.log(chalk.green(`The ${redux ? 'container' : 'component'} "${name}" has been created successfully!`));
      });
    }


    if (scss) {
      /*
        Create scss file
       */

      templateFile(`${dir}/${name}.scss`, 'style.scss', options, () => {
        console.log(chalk.green(`The scss stylesheet has been created successfully!`));
      });

      scssIndexPath = process.cwd() + `/${redux ? 'containers' : 'components'}/${redux ? 'containers' : 'components'}.scss`;
      scssIndexData = `@import './${name}/${name}.scss';\n`;

      // If components or containers scss file doesn't exist, create it first.
      if (!fs.existsSync(scssIndexPath)) {

        console.log(`/${redux ? 'containers' : 'components'}/${redux ? 'containers' : 'components'}.scss does not exist, creating now.`);

        fs.writeFile(scssIndexPath, scssIndexData, err => {
          if (err) console.error(err);
          console.log(`/${redux ? 'containers' : 'components'}/${redux ? 'containers' : 'components'}.scss has been created successfully!`);
        });
      } else {
        // Add scss import to "index" of stylesheets
        console.log(`Appending ${name}.scss to /${redux ? 'containers' : 'components'}/${redux ? 'containers' : 'components'}.scss`);

        fs.appendFileSync(scssIndexPath, scssIndexData);
        console.log('Scss file linked successfully!');

      }
    }
  })
  .parse(process.argv);
