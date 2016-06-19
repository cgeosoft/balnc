module.exports = function(shipit) {
    shipit.initConfig({
        staging: {
            servers: 'www@balance.georgiou.xyz'
        }
    });

    shipit.task('pwd', function() {
        return shipit.remote('pwd');
    });
};
