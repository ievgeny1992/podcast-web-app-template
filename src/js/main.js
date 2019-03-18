const Loader = require('./Loader');
const $ = require("jquery");
const config = require('./config.json');

const url = config.host;

class App {
    InitLoader() {
        this.loader = new Loader(url);
    }

    Init() {
        this.InitLoader();
        new WOW().init();
    }
}

const app = new App();
app.Init();