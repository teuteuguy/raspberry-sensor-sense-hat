var Humidity = require('./hts221');
var Pressure = require('./lps25h');

var Matrix = require('./matrix');

module.exports.get = function(cb) {

  var humidity = Humidity.get();
  var pressure = Pressure.get();

  cb(null, {
    humidity: humidity,
    pressure: pressure
  });

};

module.exports.set_pixels = Matrix.set_pixels;
module.exports.show_message = Matrix.show_message;
module.exports.generic = require('./sense-hat');
