var i2c = require('i2c-bus');

var LPS25H_ADDRESS        = 0x5C;
var LPS25H_ID             = 0xBD;

var LPS25H_REF_P_XL       = 0x08;
var LPS25H_REF_P_XH       = 0x09;
var LPS25H_RES_CONF       = 0x10;
var LPS25H_CTRL_REG_1     = 0x20;
var LPS25H_CTRL_REG_2     = 0x21;
var LPS25H_CTRL_REG_3     = 0x22;
var LPS25H_CTRL_REG_4     = 0x23;
var LPS25H_INT_CFG        = 0x24;
var LPS25H_INT_SOURCE     = 0x25;
var LPS25H_STATUS_REG     = 0x27;
var LPS25H_PRESS_OUT_XL   = 0x28;
var LPS25H_PRESS_OUT_L    = 0x29;
var LPS25H_PRESS_OUT_H    = 0x2A;
var LPS25H_TEMP_OUT_L     = 0x2B;
var LPS25H_TEMP_OUT_H     = 0x2C;
var LPS25H_FIFO_CTRL      = 0x2E;
var LPS25H_FIFO_STATUS    = 0x2F;
var LPS25H_THS_P_L        = 0x30;
var LPS25H_THS_P_H        = 0x31;
var LPS25H_RPDS_L         = 0x39;
var LPS25H_RPDS_H         = 0x3A;

var initialized = false;

function init() {

  initialized = false;

  var i2c1 = i2c.openSync(1);

  // Calibrate it.
  i2c1.writeByteSync(LPS25H_ADDRESS, LPS25H_CTRL_REG_1, 0xC4);
  i2c1.writeByteSync(LPS25H_ADDRESS, LPS25H_RES_CONF, 0x05);
  i2c1.writeByteSync(LPS25H_ADDRESS, LPS25H_FIFO_CTRL, 0xC0);
  i2c1.writeByteSync(LPS25H_ADDRESS, LPS25H_CTRL_REG_2, 0x40);

  i2c1.closeSync();

  initialized = true;
}

var data = {
  pressureValid: false,
  temperatureValid: false,
  temperature: 0,
  pressure: 0
};

function pressureRead() {

  if (!initialized) init();

  data.pressureValid = false;
  data.temperatureValid = false;
  data.pressure = 0;
  data.temperature = 0;

  var i2c1 = i2c.openSync(1);

  var status = i2c1.readByteSync(LPS25H_ADDRESS, LPS25H_STATUS_REG);

  if (status & 2) {
    data.pressure = ((i2c1.readByteSync(LPS25H_ADDRESS, LPS25H_PRESS_OUT_XL + 2) * 256 * 256) | (i2c1.readByteSync(LPS25H_ADDRESS, LPS25H_PRESS_OUT_XL + 1) * 256) | i2c1.readByteSync(LPS25H_ADDRESS, LPS25H_PRESS_OUT_XL)) / 4096;
    data.pressureValid = true;
  }

  if (status & 1) {
    data.temperature = (i2c1.readByteSync(LPS25H_ADDRESS, LPS25H_TEMP_OUT_H) * 256) | i2c1.readByteSync(LPS25H_ADDRESS, LPS25H_TEMP_OUT_L);
    if (data.temperature > 32768) data.temperature -= 65536; // To convert to a int16 instead of uint16
    data.temperature = data.temperature / 480 + 42.5;
    data.temperatureValid = true;
  }

  i2c1.closeSync();

  return data;
}

module.exports.get = pressureRead;
