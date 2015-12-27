module.exports = function(app, next) {

  var path = require('path');
  var models = require(path.resolve(__dirname, '../model-config.json'));
  var datasources = require(path.resolve(__dirname, '../datasources.json'));
  var ds = app.dataSources.db;

  var _models = [];

  Object.keys(models).forEach(function(key) {
    if (typeof models[key].dataSource != 'undefined') {
      if (typeof datasources[models[key].dataSource] != 'undefined') {
        _models.push(key);
      }
    }
  });

  ds.once('connected', function() {
    ds.automigrate(_models, function(err) {
      if (err) throw err;
      console.log('Models migrated', JSON.stringify(_models));
      next();
    });
  })
  
};
