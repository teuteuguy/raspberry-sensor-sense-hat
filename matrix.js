var path = require('path');
var PythonShell = require('python-shell');

var defaultOptions = {
  scriptPath: path.join(__dirname)
};

PythonShell.defaultOptions = defaultOptions;

module.exports = {

  show_message: function(text, cb) {
    var options = {
      args: [JSON.stringify(text)]
    };
    PythonShell.run('show_message.py', options, function(err, results) {
      if (err) throw new Error(err);
      cb(null, results);
    });
  },

  set_pixels: function(pixel_list, cb) {
    var options = {
      args: [JSON.stringify(pixel_list)]
    };
    PythonShell.run('set_pixels.py', options, function(err, results) {
      if (err) throw new Error(err);
      cb(null, results);
    });
  }

};
