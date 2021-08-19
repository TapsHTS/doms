# IKEAPI

<img src="https://user-images.githubusercontent.com/61658427/129480465-9b166f89-1734-4e0d-bdf8-96884e116104.png" widght="100" height="100">


An api to control your ikea smart devices. Work with [ikea-tradfri](https://www.npmjs.com/package/ikea-tradfri) and [express](https://www.npmjs.com/package/express)

## 📥 Installation

* Run `git clone https://github.com/TapsHTS/ikeapi` to download
* After `cd /ikeapi` 
* And `npm install`

## ⚙ Configuration

Go into the `config.json` file.
* `"identity"` : it is located at the back of your Gateaway
* `"iplocal"` : open a terminal and run `ipconfig`, it start by `192.68.X.XX`
* `"device"` : replace name by the devices name get in `tradfri.js`
* `"port"` : the port of the web server: default 3000
* `"security_token"` : to generate with the site: https://passwordsgenerator.net/ like that:  
<img src="https://user-images.githubusercontent.com/61658427/130067801-2aae9a9d-b438-4061-9fa0-db6543c68f12.png" widght="250" height="250">

## 🚀 Let's go

Run `node app.js` for run the website and go to `https://localhost:PORT/ikea/SECURITY_TOKEN/`... **whith de POST method** *(you can use [Axios](https://www.npmjs.com/package/axios))*

## 📌 Credits

Thank's to [@CliffS](https://github.com/CliffS/ikea-tradfri) for the node modules and Me ❤.
