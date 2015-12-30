var generic = require('./sense-hat');

generic('get_orientation', function(err, data) {
  console.log(err, data);
});
