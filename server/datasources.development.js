var config = require('../common/config/system/database.json');

module.exports = {
  db: {
    database: config.database,
    username: (config.username != "ENV") ? config.username : process.env.MYSQL_USERNAME,
    password: (config.password != "ENV") ? config.password : process.env.MYSQL_PASSWORD
  }
};
