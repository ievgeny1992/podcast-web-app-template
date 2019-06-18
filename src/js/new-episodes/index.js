import Tamplate from './templates.js';

class LastEpisode{
    constructor(url){
        this.url = url;
        this.newEpisodeBlock = $('.js-new-episode');

        this.initHandlers();
    }

    initHandlers(){
        const $body = $('body');
        
        $body.on('show-new-episodes', (self, allPodcasts) => {
            this.getNewEpisode(allPodcasts);
        });
    }

    getNewEpisode(allPodcasts) {
        this.template = new Tamplate();

        const header = this.template.getHeader();
        this.newEpisodeBlock.append(header);

        const newEpisodeWrap = this.template.getNewEpisodeWrapper();
        this.newEpisodeBlock.append(newEpisodeWrap);

        allPodcasts.forEach(podcast => {
            const url = this.url + 'get_last_podcast/' + podcast.podcast_id;

            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    const $newEpisode = $(this.template.createNewPodcast(json[0]));
                    const $newEpisodeLabel = $newEpisode.find('.new-episode-item__new-label');

                    if ($newEpisodeLabel.length) {
                        newEpisodeWrap.prepend($newEpisode);
                    } else {
                        newEpisodeWrap.append($newEpisode);
                    }
                    this.loadPlayer($newEpisode);
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

        plyrPlayer.on('playing', (event) => {
            const instance = event.detail.plyr;

            if ( time && playFlag == true){
                time = time - 15;
                if ( time < 0 ) {
                    time = 0;
                }

                instance.currentTime = time;
                playFlag = false;
            }
    
            const $plyrContainer = $(instance.elements.container);
            const $newPodcastItem = $plyrContainer.closest('.new-episode-item');
            const $label = $newPodcastItem.find('.new-episode-item__new-label');

            if ($label.length) {
                $label.css('animation-delay', '0s');
                $label.css('animation-name', 'bounceOut');
                $label.css('animation-fill-mode', 'both');

                this.checkListenFlag(episodeId);
            }

            this.createPlayBubble(instance);
        });

        plyrPlayer.on('pause', event => {
            const instance = event.detail.plyr;
            this.removePlayBubble(instance);

            const currentTime = Math.ceil(instance.currentTime);
            this.setCurrentTimeForEpisode(episodeId, currentTime);
        });
    }

    createPlayBubble(instance){
        const $plyrContainer = $(instance.elements.container);
        const $newEpisodeItem = $plyrContainer.closest('.new-episode-item');

        $newEpisodeItem.append( this.template.getPlayBubble() );
    }

    removePlayBubble(instance){
        const $plyrContainer = $(instance.elements.container);
        const $newEpisodeItem = $plyrContainer.closest('.new-episode-item');

        $newEpisodeItem.find('.new-episode-item__play-bubble').remove();
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

export default LastEpisode;