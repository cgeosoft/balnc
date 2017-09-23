module.exports = function(Company) {

  Company.observe('loaded', function(ctx, next) {
    if (ctx.instance) {
      ctx.instance.updateAttributes({
        lastAccess: new Date(),
      });
    } else {
      //console.log("===");
      // console.log(ctx.data);
      // ctx.data.lastAccess = new Date();
      // Company.updateAll(ctx.data);
    }
    next();
  });

};
