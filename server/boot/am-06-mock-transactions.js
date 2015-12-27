var _ = require('underscore');

module.exports = function(app) {

  var _transactions = require('../../common/mock/balance.transactions.json');

  console.log('Found %s transactions', _transactions.length);
  app.models.Transaction.create(_transactions, function(err) {
    if (err) throw err;
  });

};
