var _ = require('underscore');

module.exports = function(app) {

  var _companies = require('../../common/mock/contacts.json');

  console.log('Found %s companies', _companies.length);

  _.each(_companies, function(_company) {

    process.stdout.write("Inserting "+ _company.name+"\r");

    _company.lastAccess = new Date();
    
    app.models.Company.create(_company, function(err, company) {
      if (err) throw err;

      _.each(_company.persons, function(element, index) {
        _.extend(element, {
          company: company
        });
      });

      app.models.Person.create(_company.persons, function(err) {
        if (err) throw err;
      });

    });
  });

};
