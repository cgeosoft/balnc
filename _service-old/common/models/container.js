module.exports = function(Container) {

  Container.beforeRemote('upload', function(ctx, res, next) {
    if (!ctx.req.params.container) {
      next();
      return;
    }
    var fs = require('fs');
    var storage = "storage" + "/" + ctx.req.params.container;
    if (!fs.existsSync(storage)) {
      fs.mkdirSync(storage);
    }
    next();
  });
  
};
