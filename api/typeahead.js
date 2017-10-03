//var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');
var createTemplate = require('../utils/template.js').typeahead

var currencies = [
        "AUD",
        "BGN",
        "BRL",
        "CAD",
        "CHF",
        "CNY",
        "CZK",
        "DKK",
        "EUR",
        "GBP",
        "HKD",
        "HRK",
        "HUF",
        "IDR",
        "ILS",
        "INR",
        "JPY",
        "KRW",
        "MXN",
        "MYR",
        "NOK",
        "NZD",
        "PHP",
        "PLN",
        "RON",
        "RUB",
        "SEK",
        "SGD",
        "THB",
        "TRY",
        "USD",
        "ZAR"
    ]

// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  var currenciesTable = createTemplate();
  var entryInfo = '<i>(enter: CURRENCY to CURRENCY - Ex: USD to AUD)</i>' + currenciesTable;

  if (!term) {
    res.json([{
      title: entryInfo,
      text: ''
    }]);
    return;
  }

  var tokens = term.split(" ");
  var first = false, second = false;
  var baseCurrency = "", otherCurrency = "";

  // Check if user enters the correct number of tokens and that currency is valid
  if (tokens.length == 3) {
    baseCurrency = tokens[0].toUpperCase();
    otherCurrency = tokens[2].toUpperCase();
    first = currencies.indexOf(baseCurrency) > -1;
    second = currencies.indexOf(otherCurrency) > -1;
  }

  // If valid entry is not given, then keep prompting
  if (tokens.length != 3 || !first || !second) {
    res.json([{
      title: entryInfo,
      text: '',
      resolve: false
    }])
    return;
  }

  request({
    url: 'http://api.fixer.io/latest?base=' + baseCurrency,
    gzip: true,
    json: true,
    timeout: 15 * 1000
  }, function(err, response, body) {
    if (err) {
      res.status(500).send('Error');
      return;
    }
    var rate = body.rates[otherCurrency];
    rate = rate.toFixed(4);
    var result = '<a><b>Latest Currency Conversion:</b> 1 ' + baseCurrency +
      ' is ' + rate + ' ' + otherCurrency + '</a>';
    res.json([{
      title: result,
      text: result,
      resolve: true
    }])
  });
};
