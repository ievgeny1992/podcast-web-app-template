const Loader = require('./Loader');
const $ = require("jquery");

const url = 'http://192.168.31.139:3333/';

class App {
    InitLoader() {
        this.loader = new Loader(url);
    }

    Init() {
        this.InitLoader();
    }
}

const app = new App();
app.Init();

new WOW().init();