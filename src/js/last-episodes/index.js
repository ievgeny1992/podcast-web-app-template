const Tamplate = require('./templates.js');

class LastEpisode{
    constructor(url){
        this.url = url;
        this.lastPodcast = $('.js-last-podcast');

        this.initHandlers();
    }

    initHandlers(){
        const $body = $('body');
        
        $body.on('show-last-episodes', (self, allPodcasts) => {
            this.getLastEpisode(allPodcasts);
        });
    }

    getLastEpisode(allPodcasts) {
        allPodcasts.forEach(podcast => {
            const url = this.url + 'get_last_podcast/' + podcast.id;
            this.template = new Tamplate();

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

    loadPlayer() {
        const players = Plyr.setup('.js-player');

        players.forEach(player => {
            player.on('playing', (event, self) => {
                const instance = event.detail.plyr;

                // const currentTime = instance.currentTime;
                // console.log(currentTime);

                const $plyrContainer = $(instance.elements.container);
                const $lastPodcastItem = $plyrContainer.closest('.last-podcast-item');
                const $label = $lastPodcastItem.find('.last-podcast-item__new-label');

                $lastPodcastItem.append(`<div class="last-podcast-item__play-bubble"></div>`);

                if ($label.length) {
                    $label.css('animation-delay', '0s');
                    $label.css('animation-name', 'bounceOut');
                    $label.css('animation-fill-mode', 'both');

                    const episodeId = $lastPodcastItem.attr('data-id');
                    this.checkListenFlag(episodeId);
                }
            })

            player.on('pause', event => {
                const instance = event.detail.plyr;
                const $plyrContainer = $(instance.elements.container);
                const $lastPodcastItem = $plyrContainer.closest('.last-podcast-item');
                
                $lastPodcastItem.find('.last-podcast-item__play-bubble').remove();
            })
        });
    }

    createPlayBubble(event){
        const instance = event.detail.plyr;
        const $plyrContainer = $(instance.elements.container);
        const $lastPodcastItem = $plyrContainer.closest('.last-podcast-item');

        if ( event.type == 'playing' ) {
            $lastPodcastItem.append( this.template.getPlayBubble() );
        }

        if ( event.type == 'pause' ) $lastPodcastItem.find('.last-podcast-item__play-bubble').remove();
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

    deletePodcast(target) {
        $(target).fadeOut(500);
    }
}

module.exports = LastEpisode;