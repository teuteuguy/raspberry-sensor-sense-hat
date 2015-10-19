var PythonShell = require('python-shell');

module.exports = {

  get: function(cb) {
    PythonShell.run('./sense-hat.py', function(err, results) {
      if (err) cb(err, null);
      cb(err, JSON.parse(results[0]));
    });
  }
};
