const $ = require("jquery");

class Tamplate{

    constructor(){
        this.serverStatus = $('.js-server-status');
        this.podcastList = $('.js-podcast-list');
        this.lastPodcast = $('.js-last-podcast');
        this.addPodcast = $('.js-add-podcast');
    }

    CreateIndicationServerStatus(status, url){
        const segment = $('<div>').attr({ class : 'ui segment wow animated fadeInUp' });
        const item = $('<div>').attr({ class : 'item' });
        const label = $('<div>').attr({ class : 'ui label' });
        const link = $('<a>').attr({ href : url , target : '_blank', class : 'server-link'}).text(url);

        if ( status == 200 ) {
            label.addClass('green').text('Online');
            item.append(label);
            item.append(link);
        } else {
            label.addClass('red').text('Offline');
            item.append(label);
        }

        segment.append(item);
        this.serverStatus.append(segment);
    }

    CreatePodcastList(allPodcasName){
        allPodcasName.forEach((podcastName) => {
            const segment = $('<div>').attr({ class : 'ui segment wow animated fadeInUp' });
            const item = $('<div>').attr({ class : 'item' });
            const content = $('<div>').attr({ class : 'content' });
            const item__title = $('<div>').attr({ class : 'item__title wow animated fadeInUp' }).text(podcastName.title);
            const label = $('<div>').attr({ class : 'ui floating label-color green label circular wow animated fadeInUp' }).text(podcastName.length);
            const link = $('<a>').attr({ href : podcastName.site, target : '_blank', class : 'item__link wow animated fadeInUp' }).text(podcastName.site);

            content.append(item__title);
            content.append(label);
            content.append(link);

            item.append(content);
            segment.append(item);

            this.podcastList.append(segment);

        });
    }

    CreateLastPodcast(allPodcasts, allPodcastName){
        allPodcastName.forEach(podcast => {
            const length = podcast.length - 1;
            const name = podcast.name;

            const lastPodcast = allPodcasts[name][length];

            const segment = $('<div>').attr({ class : 'ui segment wow animated fadeInUp segment-last-podcast ' + name });
            const item = $('<div>').attr({ class : 'item' });
            const content = $('<div>').attr({ class : 'content' });
            const item__name = $('<div>').attr({ class : 'item__name' }).text(lastPodcast.title);
            const item__date = $('<div>').attr({ class : 'item__date' }).text(lastPodcast.date);
            const topicList = $('<ul>').attr({ class : 'ui list' });
            const player = $('<audio>').attr({ class : 'js-player' });
            const source = $('<source>').attr({ type : 'audio/mp3', src : lastPodcast.file });
            const icon__calendar = $('<i>').attr({ class : 'calendar alternate outline icon' });
            const icon__microphone = $('<i>').attr({ class : 'microphone icon' });

            player.append(source);

            item__name.prepend(icon__microphone);
            item__date.prepend(icon__calendar);
    
            content.append(item__name);
            content.append(item__date);    
            content.append(topicList);
            content.append(player);
            // content.prepend(label);
            item.append(content);
            segment.append(item);
    
            if ( lastPodcast.topic !== undefined && lastPodcast.topic !== '' ){
                let topics = lastPodcast.topic.slice(0, -1);
                topics = topics.split(';');
                topics.forEach( function(topic){
                    const item = $('<li>').text(topic);
                    topicList.append(item);
                });
            }
    
            this.lastPodcast.append(segment);
            this.LoadPlayer();

        });

        // const label = $('<a>').attr({ class : 'ui orange right ribbon label js-new' }).text('Reviews');
        
    }

    CreateAddPodcast(url){
        const segment = $('<div>').attr({ class : 'ui segment wow animated fadeInUp' });
        const form = $('<form>').attr({ class : 'ui form', method: 'post', action:  url + 'podcastList'});

        const field_name = $('<div>').attr({ class : 'field' });
        const field_title = $('<div>').attr({ class : 'field' });
        const field_rss = $('<div>').attr({ class : 'field' });
        const field_website = $('<div>').attr({ class : 'field' });        

        const name = $('<input>').attr({ type : 'text', class : 'wow animated fadeInUp', name : 'name', placeholder : 'Name' });  
        const title = $('<input>').attr({ type : 'text', class : 'wow animated fadeInUp', name : 'title', placeholder : 'Title' });   
        const rss = $('<input>').attr({ type : 'text', class : 'wow animated fadeInUp', name : 'rss', placeholder : 'RSS' });  
        const website = $('<input>').attr({ type : 'text', class : 'wow animated fadeInUp', name : 'site', placeholder : 'Website' });        
           
        const button = $('<button>').attr({ class : 'ui inverted blue button', type : 'submit' }).text('Add');;

        field_name.append(name);  
        field_title.append(title);              
        field_website.append(website);
        field_rss.append(rss);
        
        form.append(field_name);
        form.append(field_title);
        form.append(field_website);
        form.append(field_rss);
        
        form.append(button);
        segment.append(form);

        this.addPodcast.append(segment);
    }

    LoadPlayer() {
        const players = Array.from(document.querySelectorAll('.js-player')).map(player => new Plyr(player));
    }
}

module.exports = Tamplate;