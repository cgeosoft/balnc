var _ = require('underscore');

module.exports = function(app) {

  var _events = require('../../common/mock/balance.event.json');

  console.log('Found %s events', _events.length);
  app.models.Event.create(_events, function(err) {
    if (err) throw err;
  });

};
