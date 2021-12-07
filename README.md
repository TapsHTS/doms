# DOM'S

<img src="https://user-images.githubusercontent.com/61658427/145006726-a37cb5bd-6080-4a7b-809f-4dc2ad9564f0.png" widght="100" height="100">


An api to control your ikea smart devices and yeelight devices. Work with [ikea-tradfri](https://www.npmjs.com/package/ikea-tradfri), [express](https://www.npmjs.com/package/express) and [yeelight.io](https://www.npmjs.com/package/yeelight.io).

## 📥 Installation

* Run `git clone https://github.com/TapsHTS/doms` to download
* After `cd /doms` 
* And `npm install`

## ⚙ Configuration

Go into the `config.json` file.
* `"identity"` : it is located at the back of your Gateaway
* `"iplocal"` : open a terminal and run `ipconfig`, it start by `192.68.X.XX`
* `"ip"` : it is the yeelight bulp ip (go in yeelight app -> your device -> click top right -> device infos -> ip adress)
* `"device"` : replace name by the devices name get in `tradfri.js`
* `"port"` : the port of the web server: default 3000
* `"security_token"` : to generate with the site: https://passwordsgenerator.net/ like that:  
<img src="https://user-images.githubusercontent.com/61658427/130067801-2aae9a9d-b438-4061-9fa0-db6543c68f12.png" widght="250" height="250">

## 🚀 Let's go

Run `node app.js` for generate the website and go to `https://localhost:PORT/ikea/SECURITY_TOKEN/`... **with the POST method** *(you can use [Axios](https://www.npmjs.com/package/axios))*

## 📌 Credits

Thank's to [@CliffS](https://github.com/CliffS/ikea-tradfri) for the ikea modules, [@tonylin0826](https://github.com/tonylin0826/yeelight.io) for the yeelight module and Me ❤.
