const Loader = require('./Loader');
const $ = require("jquery");
const config = require('./config.json');

const url = config.host;

class App {
    initLoader() {
        this.loader = new Loader(url);
        this.loader.init();
    }

    init() {
        this.initLoader();
        new WOW().init();
    }
}

const app = new App();
app.init();