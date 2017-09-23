var connectModrewrite = require('connect-modrewrite');

module.exports = function() {
  return connectModrewrite([
    '^[^\\.]*$ /index.html [L]'
  ]);
};
