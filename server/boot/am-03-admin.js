var _ = require('underscore');

module.exports = function(app, next) {

  var _user = {
    username: 'admin',
    email: 'admin@admin.com',
    password: "admin",
    created: new Date()
  };

  app.models.User.create(_user, function(err, user) {
    if (err) throw err;

    process.stdout.write('Default user created ' + user.username);

    app.models.Role.findOne({
      where: {
        name: "admin",
      }
    }, function(err, role) {

      app.models.RoleMapping.create({
        principalType: app.models.RoleMapping.USER,
        principalId: user.id,
        roleId: role.id,
      }, function(err, principal) {
        process.stdout.write(' and assigned to ' + role.name + "role\r\n");
        next();
      });

    });
  });

};
