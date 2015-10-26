var path = require('path');
var PythonShell = require('python-shell');

var defaultOptions = {
  scriptPath: path.join(__dirname)
};

PythonShell.defaultOptions = defaultOptions;

module.exports = function() { // Last argument will be the callback.
  var args = Array.prototype.slice.call(arguments);
  var cb = args[args.length - 1];
  args.splice(args.length - 1, 1);

  PythonShell.run('generic.py', {
    args: args
  }, cb);

};
