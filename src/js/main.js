const Loader = require('./Loader');
const config = require('./config.json');

const url = config.host;
const selectorList = {
    allPodcastElem: 'js-podcast-list',
    lastEpisodeElem: 'js-last-podcast',
    calendarElem: 'js-calendar',
}

class App {
    init() {
        this.loader = new Loader(url, selectorList);
        new WOW().init();

        const $body = $('body');
        $body.trigger('show-all-podcasts');
        $body.trigger('show-calendar');
    }
}

const app = new App();
app.init();