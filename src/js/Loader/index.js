const AllPodcastList = require('../all-podcast');
const LastEpisode = require('../last-episodes');
const ReleaseCalendar = require('../release-calendar');

const config = require('../config.json');

class Loader {

    constructor(argArray) {
        this.url = config.host;;

        this.allPodcastList = new AllPodcastList(this.url);
        this.lastEpisode = new LastEpisode(this.url);
        this.releaseCalendar = new ReleaseCalendar(this.url);

        // this.podcastList = $('.' + argArray.allPodcastElem);
        // this.lastPodcast = $('.' + argArray.lastEpisodeElem);
        // this.calendar = $('.' + argArray.calendarElem);
    }
}

module.exports = Loader;