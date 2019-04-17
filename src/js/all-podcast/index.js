const Tamplate = require('./templates.js');

class AllPodcastList{
    constructor(url){
        this.url = url;
        this.podcastList = $('.js-podcast-list');

        this.initHandlers();
    }

    initHandlers(){
        const $body = $('body');
        
        $body.on('show-all-podcasts', (self) => {
            this.getPodcast();
        });
    }

    getPodcast() {
        var allPodcastItems = '';
        var url = this.url + 'all_podcast';
        this.template = new Tamplate();

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