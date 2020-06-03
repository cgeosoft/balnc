var fs = require('fs');
var path = require('path');
var getRepoInfo = require('git-repo-info');

var info = getRepoInfo();

var build = {
  date: Date.now(),
  hash: info.sha,
  branch: info.branch,
}

var p = path.join(__dirname, '../src/build.json')
fs.writeFileSync(p, JSON.stringify(build), { encoding: 'utf8' });
