const Loader = require('./loader');

const selectorList = {
    allPodcastElem: 'js-podcast-list',
    lastEpisodeElem: 'js-last-podcast',
    calendarElem: 'js-calendar',
}

class App {
    init() {
        this.loader = new Loader(selectorList);
        new WOW().init();

        const $body = $('body');
        $body.trigger('show-all-podcasts');
        $body.trigger('show-calendar');
        $body.trigger('show-chart');
    }
}

const app = new App();
app.init();