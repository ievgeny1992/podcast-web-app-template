const $ = require("jquery");

class Tamplate{

    constructor(){
        this.podcastList = $('.js-podcast-list');
        this.lastPodcast = $('.js-last-podcast');
        this.$notificationBlock = $('.notifications');

        this.notificationDelay = 2000;
    }

    createPodcastList(podcast){
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

    createLastPodcast(lastPodcast, cover){
        var date = new Date(lastPodcast.published); 
        date = date.toLocaleString("ru", {day: '2-digit', month: '2-digit', year: '2-digit'});

        var content = $.parseHTML(lastPodcast.content);
        content = $(content).text();

        const $lastPodcast = $(`
            <div class="col-xs-12 col-sm-6 col-md-4">
                <div class="last-podcast-item" data-id="${lastPodcast.id}">
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
                                <i class="icon-calendar"></i>
                                ${date}
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <p class="last-podcast-item__content">
                                ${content}
                            </p>
                            <audio class="js-player" controls>
                                <source src="${lastPodcast.mp3}" type="audio/mp3" />
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
        `);

        if( !lastPodcast.listen_flag ){
            const $label = `
                <div class="last-podcast-item__new-label wow animated rubberBand" data-wow-delay="0.4s">
                    New
                </div>
            `;

            this.createNotifications(lastPodcast, cover);

            $lastPodcast.find('.last-podcast-item').append($label);
            this.lastPodcast.prepend($lastPodcast);
        } else{
            this.lastPodcast.append($lastPodcast);
        }
    }

    createNotifications(podcast, cover){
        var date = new Date(podcast.published); 
        date = date.toLocaleString("ru", {day: '2-digit', month: '2-digit', year: '2-digit'});

        const notification = $(`
            <div class="notification animated slideInRight">
                <div class="notification__marker wow animated rubberBand" data-wow-delay="0.8s"></div>
                <img src="${cover}" class="notification__logo" alt="${podcast.title}">
                <div class="notification__content">
                    <p class="notification__text">
                        ${podcast.title}
                    </p>
                    <p class="notification__date">
                        <i class="icon-calendar"></i>
                        ${date}
                    </p>
                </div>
            </div>      
        `);
        this.$notificationBlock.append(notification);
        this.showNotifications(notification);
    }

    showNotifications(item){
        setTimeout(() => {
            item.css('display', 'flex').delay(3500).fadeOut(500);
        }, this.notificationDelay);
        this.notificationDelay += 5000;
    }
}

module.exports = Tamplate;