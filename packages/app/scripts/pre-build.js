var fs = require("fs")
var path = require("path")
var nodegit = require('nodegit');

var build = {
  timestamp: 0,
  git: {
    hash: ""
  }
}

build.timestamp = (new Date()).getTime()

nodegit.Repository
  .open(path.join(__dirname, "../../.."))
  .then((repository) => {
    return repository.getHeadCommit();
  })
  .then((commit) => {
    build.git.author = commit.author().name() + " - " + commit.author().email()
    build.git.date = commit.date()
    build.git.message = commit.message()
    build.git.hash = commit.sha()
    fs.writeFileSync(
      path.join(__dirname, "../src/assets/build.json"),
      JSON.stringify(build, " ", 2))
  });
