const Tradfri = require('ikea-tradfri');
const data = require('./config.json');
const tradfri = new Tradfri(data.homebridge.iplocal, data.homebridge.identity);

tradfri.connect()
    .then(cred => {
        const devices = tradfri.devices;
        console.log('All your devices: \n' + devices)
    })
    .catch(err => {
        console.log(err)
    })