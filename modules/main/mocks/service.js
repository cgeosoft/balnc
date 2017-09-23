var fs = require('fs');
var path = require('path');
var jsf = require('json-schema-faker');
var faker = require('faker');

// let set = "business/contacts/order"
let f = "order"
let set = "business/orders/" + f
let counter = 10

let mockPath = path.join(__dirname, "../../schemas/" + set + ".json")
var schema = JSON.parse(fs.readFileSync(mockPath, "utf8"))

jsf.extend('faker', function () {
  faker.locale = "en"; // or any other language
  faker.custom = {
    statement: function (length) {
      return faker.name.firstName() + " has " + faker.finance.amount() + " on " + faker.finance.account(length) + ".";
    },
    pastDateISO: function () {
      return faker.date.past().toISOString()
    }
  };
  return faker;
});

jsf
  .resolve({
    type: "array",
    items: schema
  })
  .then(function (sample) {
    console.log("sample:", sample)
    fs.writeFileSync("./mocks/" + f + ".json", JSON.stringify(sample, "", 4))
  }, function (error) {
    console.error("error:", error)
  });