var gulp = require('gulp');

require('cg-static')(gulp, {
    dirs: {
        dist: "./dist",
        src: "./src",
        scss: "./scss",
    },
    statics: [{
        destination: "./dist",
        files: [
            "./src/static/**/*.*"
        ],
    }, {
        destination: "./dist/modules",
        files: [
            "./README.md"
        ],
    }],
    handlebars: {
        helpers: {
            json: require("./src/helpers/json"),
        }
    }
});