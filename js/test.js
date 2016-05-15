var detection = require('./detection.js');
var mraa = require('mraa');
var noisebridge = new detection.Bathroom();
noisebridge.isOn(true);
console.log(noisebridge.currentSession);
noisebridge.isOn(false);
console.log(noisebridge.currentSession);
setTimeout(function () { console.log('Past Sessions: ' + noisebridge.pastSessions); }, noisebridge.minTimeGap + 500);
var switchGPIO = new mraa.Gpio(6);
switchGPIO.dir(mraa.DIR_IN);
function pollSwitch() {
    var status = switchGPIO.read();
    noisebridge.isOn(status == true);
    console.log(noisebridge.currentSession);
    setTimeout(pollSwitch, 1000);
}
