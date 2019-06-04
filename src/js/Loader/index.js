const AllPodcastList = require('../all-podcast');
const NewEpisode = require('../new-episodes');
const ReleaseCalendar = require('../release-calendar');
const PodcastChart = require('../chart');

const config = require('../config.json');

class Loader {
    constructor(argArray) {
        this.url = config.host;;

        this.allPodcastList = new AllPodcastList(this.url);
        this.newEpisode = new NewEpisode(this.url);
        this.releaseCalendar = new ReleaseCalendar(this.url);
        this.podcastChart = new PodcastChart(this.url);
    }
}

module.exports = Loader;