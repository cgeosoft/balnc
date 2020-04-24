var fs = require("fs")
var path = require("path")
var nodegit = require('nodegit');
var pkg = require('../package.json');

nodegit.Repository
  .open(path.join(__dirname, "../../.."))
  .then(async (repository) => {
    const branch = await repository.getCurrentBranch()
    const commit = await repository.getHeadCommit();

    const template = `// this is generated from scripts/prebuild.js
export const build = {
  version: "${pkg.version}",
  timestamp: ${(new Date()).getTime()},
  git: {
    commited: ${commit.date().getTime()},
    hash: "${commit.sha()}",
    branch: "${branch.shorthand()}",
  }
}`

    fs.writeFileSync(path.join(__dirname, "../src/build.ts"), template)
  });
