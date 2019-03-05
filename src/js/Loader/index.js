const $ = require('jquery');
const Tamplate = require('./templates.js');

class Loader{

    constructor(url){
        this.url = url;
        this.allPodcastName = [];        
        this.allPodcasts = [];

        this.template = new Tamplate();
        this.GetPodcastList();
    }

    GetPodcastList(){
        fetch(this.url + 'podcastList')
            .then(response => {
                this.template.CreateIndicationServerStatus(response.status, this.url);
                this.template.CreateAddPodcast(this.url);
                return response.json();
            })
            .then(json => {
                this.allPodcastName = json;
            })
            .then(()=> {
                this.GetPodcast(); 
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
    }``

    GetPodcast(name, title, site){
        fetch(this.url + 'db')
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.allPodcasts = json;

                this.allPodcastName.forEach((item, index) => {
                    const length = this.allPodcasts[item.name].length;
                    this.allPodcastName[index].length = length;
                });

                this.template.CreatePodcastList(this.allPodcastName);
                this.template.CreateLastPodcast(this.allPodcasts, this.allPodcastName);

            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
    }
}

module.exports = Loader;