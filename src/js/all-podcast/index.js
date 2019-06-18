import Tamplate from './templates.js';

class AllPodcastList{
    constructor(url){
        this.url = url;
        this.podcastList = $('.js-podcast-list');

        this.podcastListWrap = null;

        this.initHandlers();
    }

    initHandlers(){
        const $body = $('body');
        
        $body.on('show-all-podcasts', () => {
            this.getAllPodcast();
        });
    }

    getAllPodcast() {
        const url = this.url + 'all_podcast';
        this.template = new Tamplate();

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(allPodcasts => {
                const header = this.template.getHeader();
                this.podcastList.append(header);

                this.podcastListWrap = this.template.getPodcastListWrapper();
                this.podcastList.append(this.podcastListWrap);

                this.getPodcastData(allPodcasts);
                this.createHandlerShowLastEpisodes(allPodcasts);
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
    }

    getPodcastData(allPodcasts){
        allPodcasts.forEach((podcast) => {
            this.getEpisodeCount(podcast);
        });
    }

    getEpisodeCount(podcast){
        const podcastId = podcast.podcast_id;
        const url = this.url + 'episode_count/' + podcastId;

        $.getJSON(url, (data) => {
            podcast.total = data.total;
            this.getEpisodeCountListened(podcast);
        });
    }

    getEpisodeCountListened(podcast){
        const podcastId = podcast.podcast_id;
        const url = this.url + 'episode_count_listened/' + podcastId;

        $.getJSON(url, (data) => {
            podcast.listened =  data.total;
            this.createPodcastList(podcast);
        });
    }

    createPodcastList(podcast){
        const podcastItem = this.template.getPodcast(podcast);
        this.podcastListWrap.append(podcastItem);
        this.createHandlerDeletePodcast();
    }

    createHandlerShowLastEpisodes(allPodcasts){
        $('body').trigger('show-new-episodes', [allPodcasts]);
    }

    createHandlerDeletePodcast() {
        $('.user-podcast-item__wrap').on('click', '.user-podcast-item__close', event => {
            this.deletePodcast(event.delegateTarget);
        });
    }

    deletePodcast(target) {
        $(target).fadeOut(500);
    }
}

export default AllPodcastList;