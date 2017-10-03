var fs = require('fs');

var templates = {
  currencies: fs.readFileSync(__dirname + '/../templates/currencies-template.html', {
    encoding: 'UTF-8'
  }),
};

exports.typeahead = function () {
  return templates.currencies;
};
