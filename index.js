var Humidity = require('./hts221');
var Pressure = require('./lps25h');

module.exports.get = function(cb) {

  var humidity = Humidity.get();
  var pressure = Pressure.get();

  cb(null, {
    humidity: humidity,
    pressure: pressure
  });

};
