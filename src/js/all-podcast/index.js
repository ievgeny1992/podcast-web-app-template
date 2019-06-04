const Tamplate = require('./templates.js');

class AllPodcastList{
    constructor(url){
        this.url = url;
        this.podcastList = $('.js-podcast-list');

        this.initHandlers();
    }

    initHandlers(){
        const $body = $('body');
        
        $body.on('show-all-podcasts', () => {
            this.getPodcast();
        });
    }

    getPodcast() {
        const url = this.url + 'all_podcast';
        this.template = new Tamplate();

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(allPodcasts => {
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
        const podcastId = podcast.id;
        const url = this.url + 'episode_count/' + podcastId;

        $.getJSON(url, (data) => {
            podcast.total = data.total;
            this.getEpisodeCountListened(podcast);
        });
    }

    getEpisodeCountListened(podcast){
        const podcastId = podcast.id;
        const url = this.url + 'episode_count_listened/' + podcastId;

        $.getJSON(url, (data) => {
            podcast.listened =  data.total;
            this.createPodcastList(podcast);
        });
    }

    createPodcastList(podcast){
        const podcastItem = this.template.getPodcast(podcast);
        this.podcastList.append(podcastItem);
        this.createHandlerDeletePodcast();
    }

    createHandlerShowLastEpisodes(allPodcasts){
        $('body').trigger('show-last-episodes', [allPodcasts]);
    }

    createHandlerDeletePodcast() {
        $('.user-podcast-item__wrap').on('click', '.user-podcast-item__close', (self) => {
            this.deletePodcast(self.delegateTarget);
        });
    }

    deletePodcast(target) {
        $(target).fadeOut(500);
    }
}

module.exports = AllPodcastList;