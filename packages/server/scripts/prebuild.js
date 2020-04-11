var fs = require("fs")
var path = require("path")
var nodegit = require('nodegit');

nodegit.Repository
  .open(path.join(__dirname, "../../.."))
  .then(async (repository) => {
    const branch = await repository.getCurrentBranch()
    const commit = await repository.getHeadCommit();

    const template = `// this is generated from scripts/prebuild.js
export const build = {
  builded: ${(new Date()).getTime()},
  author: "${commit.author().name() + " - " + commit.author().email()}",
  commited: ${commit.date().getTime()},
  message: "${commit.message().trim()}",
  hash: "${commit.sha()}",
  branch: "${branch.shorthand()}",
}`

    fs.writeFileSync(path.join(__dirname, "../src/build.ts"), template)
  });
