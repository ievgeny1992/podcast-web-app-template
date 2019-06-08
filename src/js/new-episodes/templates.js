import moment, { locale } from 'moment';
locale('ru');

class Tamplate{
    constructor() {
        this.$notificationBlock = $('.js-notifications');
        this.notificationDelay = 5000;
    }

    createNewPodcast(newPodcast) {
        var date = new Date(newPodcast.published);
        date = date.toLocaleString("ru", { day: '2-digit', month: '2-digit', year: '2-digit' });

        var content = $.parseHTML(newPodcast.content);
        content = $(content).text();

        const $newPodcast = $(`
            <div class="col-xs-12 col-sm-6 col-md-4">
                <div class="new-episode-item" data-id="${newPodcast.id}">
                    <div class="new-episode-item__header">
                        <div class="user-podcast-item__logo-wrap">
                            <img src="${newPodcast.cover}" class="new-episode-item__logo" alt="${newPodcast.title}">
                        </div>
                        <div class="new-episode-item__info">
                            <h3 class="new-episode-item__title">
                                ${newPodcast.title}
                            </h3>
                            <p class="new-episode-item__date">
                                <i class="icon-calendar"></i>
                                ${date}
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <p class="new-episode-item__content">
                                ${content}
                            </p>
                            <audio class="js-player" data-id="${newPodcast.id}" data-time="${newPodcast.currentTime}" controls>
                                <source src="${newPodcast.mp3}" type="audio/mp3" />
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
        `);

        if (!newPodcast.listen_flag) {
            const $label = `
                <div class="new-episode-item__new-label wow animated rubberBand" data-wow-delay="0.4s"></div>
            `;

            this.createNotifications(newPodcast);

            $newPodcast.find('.new-episode-item').append($label);
        }

        return $newPodcast;
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
        const bubble = $('<div>').attr({ class: 'new-episode-item__play-bubble' });
        return bubble;
    }
}

export default Tamplate;