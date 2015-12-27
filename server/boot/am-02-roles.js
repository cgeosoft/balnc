var _ = require('underscore');

module.exports = function(app, next) {

  var _roles = ["admin", "member"];

  app.models.Role.create(_.map(_roles, function(item) {
    return {
      name: item
    };
  }), function(err, roles) {
    if (err) throw err;

    console.log('Default roles created', JSON.stringify(_roles));
    next();
  });

};
