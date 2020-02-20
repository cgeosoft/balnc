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
  .then(async (repository) => {
    const branch = await repository.getCurrentBranch()
    const commit = await repository.getHeadCommit();
    build.git.author = commit.author().name() + " - " + commit.author().email()
    build.git.date = commit.date()
    build.git.message = commit.message()
    build.git.hash = commit.sha()
    build.git.branch = branch.shorthand()
    console.log(build)
    fs.writeFileSync(
      path.join(__dirname, "../src/assets/build.json"),
      JSON.stringify(build, " ", 2))
  });
