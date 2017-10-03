# Currency Conversion Slash Command for Mixmax

This slash command allows users to easily calculate the rate of conversion from one currency to another. Simply enter in BASE_CURRENCY_NAME to OTHER_CURRENCY_NAME and the slash command will output the latest conversion rate.

Conducts currency conversion using Fixer.io - the foreign exchange rates and currency conversion API. According to Fixer.io, rates are updated daily around 4PM CET.

## Running locally

1. Install using `npm install`
2. Run using `npm start`
3. Follow the instructions on how to run locally - https://developer.mixmax.com/docs/overview-slash-commands
- Name: Currency Conversion
- Command: convert
- Placeholder: [currency to currency]
- Typeahead API URL: https://localhost:9145/typeahead
- Resolver API URL: https://localhost:9145/resolver
