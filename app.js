const express = require('express');
const Tradfri = require('ikea-tradfri');
const { Bulb } = require('yeelight.io');
const data = require('./config.json');

const app = express();
const tradfri = new Tradfri(data.homebridge.iplocal, data.homebridge.identity);
const l1 = new Bulb(data.yeelight.ip);


//For the yeelight light
function y_light_on() {
    l1.connect();
    l1.onn();
}

//For the yeelight light
function y_light_off() {
    l1.connect();
    l1.off();
}

//For the light
function light(state) {
    tradfri.connect()
        .then(cred => {
            const light = tradfri.device(data.device.num1)
            light.switch(state)
        })
}


//For the plug / outlet
function plug(state) {
    tradfri.connect()
        .then(cred => {
            const plug = tradfri.device(data.device.num2)
            plug.switch(state)
        })
}


//For change the color of the light
function color(color) {
    tradfri.connect()
        .then(cred => {
            const light = tradfri.device(data.device.num1)
            light.switch(true)
            light.setColor(color)
        })
}


//For set the brightness of the light
function brightness(pourcent) {
    tradfri.connect()
        .then(cred => {
            const light = tradfri.device(data.device.num1)
            light.setBrightness(pourcent)
        })
}

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With, Content-Type, Authorization');
    if ('OPTIONS' == req.method) {
        res.sendStatus(204);
    } else {
        next();
    };
});

//Get the light status
app.post(`/ikea/${data.web.security_token}/light/:state`, (req, res) => {
    try {
        if (req.params.state === "true") {
            light(true)
            return res.status(202).json({
                status: 'on'
            });
        }
        if (req.params.state === "false") {
            light(false)
            return res.status(202).json({
                status: 'off'
            });
        }
        if (req.params.state != "true" || "false") {
            return res.status(404).json({
                status: 'error'
            });
        }

    } catch (error) {
        return res.status(404).json({
            status: 'error: ' + error
        })

    }
})


//Get the plug status
app.post(`/ikea/${data.web.security_token}/plug/:state`, (req, res) => {
    try {
        if (req.params.state === "true") {
            plug(true)
            return res.status(202).json({
                status: 'on'
            });
        }
        if (req.params.state === "false") {
            plug(false)
            return res.status(202).json({
                status: 'off'
            });
        }
        if (req.params.state != "true" || "false") {
            return res.status(404).json({
                status: 'error'
            });
        }

    } catch (error) {
        return res.status(404).json({
            status: 'error: ' + error
        })

    }
})


//Get mort information about device
app.post(`/ikea/${data.web.security_token}/data/:name`, (req, res) => {
    const devices = tradfri.devices
    try {
        if (req.params.name === data.device.num1) {
            tradfri.connect()
                .then(cred => {
                    const light = tradfri.device(data.device.num1)
                    if (devices.find(x => x.name === data.device.num1 && x.isOn)) {
                        return res.status(202).json({
                            isOn: 'true',
                            brightness: light.brightness,
                            color: light.hexcolour
                        });
                    } else {
                        return res.status(202).json({
                            isOn: 'false',
                            brightness: 0
                        });
                    }
                })
        }
        if (req.params.name === data.device.num2) {
            tradfri.connect()
                .then(cred => {
                    const plug = tradfri.device(data.device.num2)
                    if (devices.find(x => x.name === data.device.num2 && x.isOn)) {
                        return res.status(202).json({
                            isOn: 'true'
                        });
                    } else {
                        return res.status(202).json({
                            isOn: 'false'
                        });
                    }
                })
        }
    } catch (error) {
        return res.status(404).json({
            status: 'error: ' + error
        })
    }
})

app.post(`/ikea/${data.web.security_token}/scene/:sc`, (req, res) => {
    try {
        if (req.params.sc === "gamingon") {
            plug(true)
            light(true)
            color(16740388)
            brightness(56)
            return res.status(202).json({
                status: 'changed: ' + req.params.sc
            });
        }
        if (req.params.sc === "gamingoff") {
            plug(false)
            light(false)
            return res.status(202).json({
                status: 'changed: ' + req.params.sc
            });
        }
        if (req.params.sc === "chillon") {
            plug(false)
            light(true)
            color(16777215)
            brightness(56)
            return res.status(202).json({
                status: 'changed: ' + req.params.sc
            });
        }
        if (req.params.sc === "chilloff") {
            plug(false)
            light(false)
            return res.status(202).json({
                status: 'changed: ' + req.params.sc
            });
        }
        if (!req.params.state) {
            return res.status(404).json({
                status: 'error'
            });
        }

    } catch (error) {
        return res.status(404).json({
            status: 'error: ' + error
        })

    }
})

app.post(`/ikea/${data.web.security_token}/bright/:device/:brg`, (req, res) => {

    const device = req.params.device
    const bright = req.params.brg
    try {

        if (device === data.device.num1) {
            if (!bright) {
                return res.status(404).json({
                    bright: 'error: ' + error
                })
            }
            brightness(bright)
            return res.status(200).json({
                bright: bright
            })
        }

    } catch (error) {
        return res.status(404).json({
            status: 'error: ' + error
        })

    }



})

app.post(`/ikea/${data.web.security_token}/color/:device/:color`, (req, res) => {

    const device = req.params.device
    const reqColor = req.params.color

    try {

        if (device === data.device.num1) {
            if (!reqColor) {
                return res.status(404).json({
                    status: 'error: ' + error
                })
            }
            color(parseInt(reqColor, 16))
            return res.status(200).json({
                color: reqColor
            })
        }

    } catch (error) {
        return res.status(404).json({
            status: 'error: ' + error
        })

    }



})

app.post(`/yeelight/${data.web.security_token}/light/:state`, (req, res) => {

    const state = req.params.state

    try {
        if (state === "on") {
            y_light_on()
            return res.status(202).json({
                status: 'on'
            })
        }

        if (state === "off") {
            y_light_off()
            return res.status(202).json({
                status: 'off'
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            status: 'error: ' + error
        })

    }



})

app.listen(data.web.port, () => { console.log(`[✔] IKEAPI start: https://localhost:${data.web.port}`) })