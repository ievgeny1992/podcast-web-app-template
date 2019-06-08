import AllPodcastList from '../all-podcast';
import NewEpisode from '../new-episodes';
import ReleaseCalendar from '../release-calendar';
import PodcastChart from '../chart';

import { host } from '../config.json';

class Loader {
    constructor(argArray) {
        this.url = host;;

        this.allPodcastList = new AllPodcastList(this.url);
        this.newEpisode = new NewEpisode(this.url);
        this.releaseCalendar = new ReleaseCalendar(this.url);
        this.podcastChart = new PodcastChart(this.url);
    }
}

export default Loader;