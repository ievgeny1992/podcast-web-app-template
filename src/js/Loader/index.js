const $ = require('jquery');
const Tamplate = require('./templates.js');

class Loader{

    constructor(url){
        this.url = url;  
        this.allPodcasts = [];

        this.template = new Tamplate();
        this.GetPodcast();
    }

    GetPodcast(){
        var url = this.url + 'all_podcast';
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.allPodcasts = json;
                this.allPodcasts.forEach(podcast => {
                    this.template.CreatePodcastList(podcast);                    
                });
            })
            .then(() => {
                this.GetLastPodcast();
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
    }

    GetLastPodcast(){
        this.allPodcasts.forEach(podcast => {
            var url = this.url + 'get_last_podcast/' + podcast.id;
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    this.template.CreateLastPodcast(json[0], podcast.cover);  
                })
                .then(() => {
                    this.template.LoadPlayer();
                })
                .catch((error) => {
                    console.log('Error: ' + error);
                });                
        });
    }
}

module.exports = Loader;