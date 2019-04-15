const Tamplate = require('./templates.js');

class Loader {

    constructor(url, argArray) {
        this.url = url;
        this.players = [];

        this.podcastList = $('.' + argArray.allPodcastElem);
        this.lastPodcast = $('.' + argArray.lastEpisodeElem);
        this.calendar = $('.' + argArray.calendarElem);

        this.template = new Tamplate();
        this.initHandlers();
    }

    initHandlers(){
        const $body = $('body');
        
        $body.on('show-all-podcasts', (self) => {
            this.getPodcast();
        });

        $body.on('show-last-episodes', (self, allPodcasts) => {
            this.getLastPodcast(allPodcasts);
        });

        $body.on('show-calendar', (self) => {
            this.getEpisodesForMonth();
        });
    }

    getPodcast() {
        var allPodcastItems = '';
        var url = this.url + 'all_podcast';
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(allPodcasts => {
                allPodcasts.forEach(podcast => {
                    allPodcastItems += this.template.getPodcastList(podcast);
                });

                this.podcastList.append(allPodcastItems);
                this.createHandlerDeletePodcast();
                
                $('body').trigger('show-last-episodes', [allPodcasts]);
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
    }

    getLastPodcast(allPodcasts) {
        allPodcasts.forEach(podcast => {
            const url = this.url + 'get_last_podcast/' + podcast.id;
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    const $lastEpisode = $(this.template.createLastPodcast(json[0]));
                    const $newEpisodeLabel = $lastEpisode.find('.last-podcast-item__new-label');

                    if ($newEpisodeLabel.length) {
                        this.lastPodcast.prepend($lastEpisode);
                    } else {
                        this.lastPodcast.append($lastEpisode);
                    }
                    this.loadPlayer();
                })
                .catch((error) => {
                    console.log('Error: ' + error);
                });
        });
    }

    getEpisodesForMonth() {
        var url = this.url + 'get_episode_in_month';
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.createReleaseCalendar(json);
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
    }

    createReleaseCalendar(podcasts){
        var calendar = this.template.getReleaseCalendar(podcasts);
        this.calendar.append(calendar);
    }

    loadPlayer() {
        const players = Plyr.setup('.js-player');

        players.forEach(player => {
            player.on('playing', event => {
                const instance = event.detail.plyr;

                // const currentTime = instance.currentTime;
                // console.log(currentTime);

                const $plyrContainer = $(instance.elements.container);
                const $lastPodcastItem = $plyrContainer.closest('.last-podcast-item');
                const $label = $lastPodcastItem.find('.last-podcast-item__new-label');

                if ($label.length) {
                    $label.css('animation-delay', '0s');
                    $label.css('animation-name', 'bounceOut');
                    $label.css('animation-fill-mode', 'both');

                    const episodeId = $lastPodcastItem.attr('data-id');
                    this.checkListenFlag(episodeId);
                }
            });
        });
    }

    checkListenFlag(episodeId) {
        var url = this.url + 'check_listen_flag/' + episodeId;
        const formData = new FormData();
        formData.append('id', episodeId);

        fetch(url, {
            method: 'PUT',
            body: formData
            })
            .then(response => {
                return response.json();
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
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

module.exports = Loader;