let fs = require('fs');

function linkScssFile(name, redux) {
  let path = `/${redux ? 'containers' : 'components'}/${redux ? 'containers' : 'components'}.scss`;
  let data = `@import ./${name}/${name}.scss`;

  console.log(`Appending ${name}.scss to /${redux ? 'containers' : 'components'}/${redux ? 'containers' : 'components'}.scss`);

  fs.appendFileSync(path, data);
  console.log('Scss file linked successfully!');

}

module.exports = linkScssFile;
