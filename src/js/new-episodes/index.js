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
        this.template = new Tamplate();

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
                    this.loadPlayer($lastEpisode);
                })
                .catch((error) => {
                    console.log('Error: ' + error);
                });
        });
    }

    loadPlayer(elem) {
        const player = elem.find('.js-player');
        const episodeId = player.data('id');
        let time = player.data('time');

        let playFlag = new Boolean(true);

        let plyrPlayer = new Plyr( player );

        plyrPlayer.on('play', (event) => {
            let instance = event.detail.plyr;

            if ( time && playFlag == true){
                time = time - 15;
                if ( time < 0 ) {
                    time = 0;
                }

                instance.currentTime = time;
                playFlag = false;
            }
    
            const $plyrContainer = $(instance.elements.container);
            const $lastPodcastItem = $plyrContainer.closest('.last-podcast-item');
            const $label = $lastPodcastItem.find('.last-podcast-item__new-label');

            if ($label.length) {
                $label.css('animation-delay', '0s');
                $label.css('animation-name', 'bounceOut');
                $label.css('animation-fill-mode', 'both');

                this.checkListenFlag(episodeId);
            }

            this.createPlayBubble(instance);
        });

        plyrPlayer.on('pause', event => {
            let instance = event.detail.plyr;
            this.removePlayBubble(instance);

            const currentTime = Math.ceil(instance.currentTime);
            this.setCurrentTimeForEpisode(episodeId, currentTime);
        });
    }

    createPlayBubble(instance){
        const $plyrContainer = $(instance.elements.container);
        const $lastPodcastItem = $plyrContainer.closest('.last-podcast-item');

        $lastPodcastItem.append( this.template.getPlayBubble() );
    }

    removePlayBubble(instance){
        const $plyrContainer = $(instance.elements.container);
        const $lastPodcastItem = $plyrContainer.closest('.last-podcast-item');

        $lastPodcastItem.find('.last-podcast-item__play-bubble').remove();
    }

    setCurrentTimeForEpisode(episodeId, currentTime){
        var url = this.url + 'set_current_time/id/' + episodeId + '/currentTime/' + currentTime;
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