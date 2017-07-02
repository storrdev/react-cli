let fs         = require('fs');
let Handlebars = require('handlebars');

function file(path, template, options, cb) {
  let source = fs.readFileSync(__dirname + '/templates/' + template).toString();

  let _template = Handlebars.compile(source);

  let result = _template(options);

  fs.writeFile(path, result, err => {
    if (err) console.error(err);
    cb();
  });
}

module.exports = file;
