const Loader = require('./Loader');
const $ = require("jquery");

class App {
    InitLoader() {
        this.loader = new Loader('http://192.168.1.37:3000/');
    }

    Init() {
        this.InitLoader();
    }
}

const app = new App();
app.Init();

new WOW().init();