/* global require, module  */
var exec = require('child_process').exec;
var hooks = ['pre-commit', 'commit-msg', 'pre-push'];

module.exports = () => {
  hooks.forEach((item) => {
    exec(`cp -R hooks/${item} .git/hooks/${item}`, (err, stdout, stderr) => {
      if(err) { return; }
      exec(`chmod +x .git/hooks/${item}`);
    });
  });
};
