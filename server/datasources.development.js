var conf = require('../config.json');

module.exports = {
  db: {
    database: conf.database,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  }
};
