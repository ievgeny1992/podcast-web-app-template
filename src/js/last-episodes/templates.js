const moment = require('moment');
moment.locale('ru');

class Tamplate{
    constructor() {
        this.$notificationBlock = $('.js-notifications');
        this.notificationDelay = 5000;
    }

    createLastPodcast(lastPodcast) {
        var date = new Date(lastPodcast.published);
        date = date.toLocaleString("ru", { day: '2-digit', month: '2-digit', year: '2-digit' });

        var content = $.parseHTML(lastPodcast.content);
        content = $(content).text();

        const $lastPodcast = $(`
            <div class="col-xs-12 col-sm-6 col-md-4">
                <div class="last-podcast-item" data-id="${lastPodcast.id}">
                    <div class="last-podcast-item__header">
                        <div class="user-podcast-item__logo-wrap">
                            <img src="${lastPodcast.cover}" class="last-podcast-item__logo" alt="${lastPodcast.title}">
                        </div>
                        <div class="last-podcast-item__info">
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

        if (!lastPodcast.listen_flag) {
            const $label = `
                <div class="last-podcast-item__new-label wow animated rubberBand" data-wow-delay="0.4s"></div>
            `;

            this.createNotifications(lastPodcast);

            $lastPodcast.find('.last-podcast-item').append($label);
        }

        return $lastPodcast;
    }

    createNotifications(podcast) {
        const publishedDate = new Date(podcast.published);
        const date = moment(publishedDate, "YYYYMMDD").fromNow();

        const notification = $(`
            <div class="notification animated slideInRight">
                <div class="notification__marker"></div>
                <img src="${podcast.cover}" class="notification__logo" alt="${podcast.title}">
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
        this.showNotifications(notification);
    }

    showNotifications(item) {
        setTimeout(() => {
            this.$notificationBlock.append(item);
            item.delay(4500).fadeOut(500);
        }, this.notificationDelay);
        this.notificationDelay += 7000;
    }

    getPlayBubble(){
        const bubble = $('<div>').attr({ class: 'last-podcast-item__play-bubble' });
        return bubble;
    }
}

module.exports = Tamplate;