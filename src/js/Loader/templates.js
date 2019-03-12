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

    CreatePodcastList(podcast){
        this.podcastList.append(`
            <div class="col-xs-12 col-sm-6 col-md-4 user-podcast-item__wrap">
                <div class="user-podcast-item">
                    <div class="row middle-xs">
                        <div class="col-xs-4 col-sm-3">
                            <div class="user-podcast-item__logo-wrap">
                                <img src="${podcast.cover}" class="user-podcast-item__logo" alt="${podcast.title}">
                            </div>
                        </div>
                        <div class="col-xs-7 col-sm-9">
                            <div class="user-podcast-item__info">
                                <h3 class="user-podcast-item__title">
                                    ${podcast.title}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <p class="user-podcast-item__description">
                                ${podcast.description}
                            </p>
                            <a href="${podcast.link}" class="user-podcast-item__link">
                                <i class="icon-globe"></i>
                                ${podcast.link}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    CreateLastPodcast(lastPodcast, cover){
        var date = new Date(lastPodcast.published); 
        date = date.toLocaleString("ru", {day: '2-digit', month: '2-digit', year: '2-digit'});
        this.lastPodcast.append(`
            <div class="col-xs-12 col-sm-6 col-md-4">
                <div class="last-podcast-item">
                    <div class="row middle-xs">
                        <div class="col-xs-4 col-sm-3">
                            <div class="last-podcast-item__logo-wrap">
                                <img src="${cover}" class="last-podcast-item__logo" alt="${lastPodcast.title}">
                            </div>
                        </div>
                        <div class="col-xs-7 col-sm-9">
                            <h3 class="last-podcast-item__title">
                                ${lastPodcast.title}
                            </h3>
                            <p class="last-podcast-item__date">
                                ${date}
                            </p>
                        </div>
                    </div>
                    <div class="row last-podcast-item__player-wrap">
                        <div class="col-xs-12">
                            <audio class="js-player" controls>
                                    <source src="${lastPodcast.mp3}" type="audio/mp3" />
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
        `);
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