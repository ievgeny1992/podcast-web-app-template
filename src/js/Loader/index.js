const $ = require('jquery');
const Tamplate = require('./templates.js');

class Loader{

    constructor(url){
        this.url = url;  
        this.allPodcasts = [];
        this.players = [];

        this.template = new Tamplate();
    }

    init(){
        this.getPodcast();
        this.getEpisodesForMonth();
    }

    getPodcast(){
        var url = this.url + 'all_podcast';
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(allPodcasts => {
                this.allPodcasts = allPodcasts;
                this.allPodcasts.forEach(podcast => {
                    this.template.createPodcastList(podcast);                    
                });
            })
            .then(() => {
                this.createHandlerDeletePodcast();
            })
            .then(() => {
                this.deletePodcast();
                this.allPodcasts.forEach(podcast => {
                    this.getLastPodcast(podcast);      
                });
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
    }

    getLastPodcast(podcast){
        var url = this.url + 'get_last_podcast/' + podcast.id;
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.template.createLastPodcast(json[0]);
            })
            .then(() => {
                this.loadPlayer();
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });                
    }

    getEpisodesForMonth(){
        var url = this.url + 'get_episode_in_month';
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.template.createReleaseCalendar(json);
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
    }

    loadPlayer() {
        this.players = Array.from(document.querySelectorAll('.js-player')).map(player => new Plyr(player));

        this.players.forEach(player => {
            player.on('playing', event => {
                const instance = event.detail.plyr;

                // const currentTime = instance.currentTime;
                // console.log(currentTime);

                const $plyrContainer = $(instance.elements.container);
                const $lastPodcastItem = $plyrContainer.parent().parent().parent();
                const $label = $lastPodcastItem.find('.last-podcast-item__new-label');
                
                if ( $label.length ){
                    $label.css('animation-delay', '0s');
                    $label.css('animation-name', 'bounceOut');
                    $label.css('animation-fill-mode', 'both');
  
                    const episodeId = $lastPodcastItem.attr('data-id');
                    this.checkListenFlag(episodeId);
                }
            });
        });
    }

    checkListenFlag(episodeId){
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

    createHandlerDeletePodcast(){
        $('.user-podcast-item__wrap').on('click','.user-podcast-item__close', (self) => { 
            this.deletePodcast(self.delegateTarget);
        }); 
    }

    deletePodcast(target){
        $(target).fadeOut();
    }
}

module.exports = Loader;