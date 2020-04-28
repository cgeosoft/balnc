var Metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var static = require('metalsmith-static');
var sass = require('metalsmith-sass');
var moveUp = require('metalsmith-move-up')
var discoverPartials = require('metalsmith-discover-partials')
var fs = require("fs")
var buildinfo = require("metalsmith-build-info");

// Create your Metalsmith instance and add this like other middleware.
Metalsmith(__dirname)
.metadata(JSON.parse(fs.readFileSync("./metadata.json")))
.source("./src")
.destination('./dist')
.ignore(["layouts", "assets"])
.clean(true)
.use(moveUp('pages/*'))
.use(static([{
    src: "src/assets",
    dest: "."
  }, {
    src: "../../docs",
    dest: "_docs"
  }, {
    src: "../../assets",
    dest: "img"
  }]))
  .use(sass({
    outputDir: 'css/'
  }))
  .use(collections({
    posts: 'posts/*.md'
  }))
  .use(buildinfo())
  .use(markdown())
  .use(permalinks({
    relative: false
  }))
  .use(discoverPartials({
    directory: './src/layouts/partials',
    pattern: /\.hbs$/
  }))
  .use(layouts({
    default: "main.hbs",
    pattern: "**/*.html",
    directory: "./src/layouts"
  }))
  .build((err, files) => {
    // if (files)
    //   console.log(Object.keys(files))
    if (err) throw err;
  });

