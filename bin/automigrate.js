var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.db;

ds.automigrate([
  "User",
  "AccessToken",
  "ACL",
  "RoleMapping",
  "Role",
  "Lottery",
  "Plist",
], function(err) {
  if (err) throw err;

  app.models.User.create({
    username: 'admin',
    email: 'admin@admin.com',
    password: "admin",
    createdAt: new Date(),
    lastModifiedAt: new Date()
  }, function(err, user) {
    if (err) throw err;

    console.log('Created User:', user.username);

    app.models.Role.create([{
        name: 'admin'
      }, {
        name: 'client'
      }],
      function(err, roles) {
        if (err) return console.log(err);

        console.log('Created Role:', roles);

        roles[0].principals.create({
          principalType: app.models.RoleMapping.USER,
          principalId: user.id
        }, function(err, principal) {

          if (err) return console.log(err);

          console.log('Created Principal:', principal);

          ds.disconnect();

        });

      });
  });

});
