// controllers/colorController.js
const axios = require('axios');

const sendColorToESP32 = async (color) => {
  try {
    const esp32Url = `http://192.168.1.101/changeColor?red=${color.red}&green=${color.green}&blue=${color.blue}`;
    await axios.post(esp32Url);
    console.log('Color sent to ESP32:', color);
  } catch (error) {
    console.error('Error sending color to ESP32:', error.message);
    throw error;
  }
};

module.exports = {
  sendColorToESP32,
};