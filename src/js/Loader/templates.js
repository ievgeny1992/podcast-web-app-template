const $ = require("jquery");
const moment = require('moment');
moment.locale('ru');

class Tamplate{

    constructor(){
        this.podcastList = $('.js-podcast-list');
        this.lastPodcast = $('.js-last-podcast');
        this.calendar = $('.js-calendar');
        this.$notificationBlock = $('.js-notifications');

        this.notificationDelay = 2000;
    }

    createPodcastList(podcast){
        this.podcastList.append(`
            <div class="col-xs-12 col-sm-6 col-md-4 user-podcast-item__wrap">
                <div class="user-podcast-item">
                    <button type="button" class="user-podcast-item__close">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path></svg>
                    </button>
                    <div class="user-podcast-item__header">
                        <div class="user-podcast-item__logo-wrap">
                            <img src="${podcast.cover}" class="user-podcast-item__logo" alt="${podcast.title}">
                        </div>
                        <div class="user-podcast-item__info">
                            <h3 class="user-podcast-item__title">
                                ${podcast.title}
                            </h3>
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

    createLastPodcast(lastPodcast){
        var date = new Date(lastPodcast.published); 
        date = date.toLocaleString("ru", {day: '2-digit', month: '2-digit', year: '2-digit'});

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

        if( !lastPodcast.listen_flag ){
            const $label = `
                <div class="last-podcast-item__new-label wow animated rubberBand" data-wow-delay="0.4s">
                    New
                </div>
            `;

            this.createNotifications(lastPodcast);

            $lastPodcast.find('.last-podcast-item').append($label);
            this.lastPodcast.prepend($lastPodcast);
        } else {
            this.lastPodcast.append($lastPodcast);
        }
    }

    createNotifications(podcast){
        const publishedDate = new Date(podcast.published);
        const date = moment(publishedDate, "YYYYMMDD").fromNow();

        const notification = $(`
            <div class="notification animated slideInRight">
                <div class="notification__marker wow animated rubberBand" data-wow-delay="0.8s"></div>
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
        this.$notificationBlock.append(notification);
        this.showNotifications(notification);
    }

    showNotifications(item){
        setTimeout(() => {
            item.css('display', 'flex').delay(3500).fadeOut(500);

        }, this.notificationDelay);
        this.notificationDelay += 5000;
    }

    createReleaseCalendar(podcasts){
        var now = new Date();
        var date = new Date(now.getFullYear(), now.getMonth());

        var calender = `
            <div class="row calendar__row">
                <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                    <p class="calendar__date">
                        MO
                    </p>
                </div>
                <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                    <p class="calendar__date">
                        TU
                    </p>
                </div>
                <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                    <p class="calendar__date">
                        WE
                    </p>
                </div>
                <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                    <p class="calendar__date">
                        TH
                    </p>
                </div>
                <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                    <p class="calendar__date">
                        FR
                    </p>
                </div>
                <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                    <p class="calendar__date">
                        SA
                    </p>
                </div>
                <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                    <p class="calendar__date">
                        SU
                    </p>
                </div>
            </div>
            <div class="row calendar__row">
        `;

        for (var i = 0; i < this.getDay(date); i++) {
            calender += `
                <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                </div>
            `;
        }

        const currentMonth = now.getMonth();
        const currentDate = now.getDate();

        var count = 0; 

        while (date.getMonth() == currentMonth) {
            var day = date.getDate();
            var episode = '';

            if (day.toString().length == 1) {
                day = '0' + day;
            }

            if (date.getDate() == currentDate){
                day = `
                    <span class="calendar__date_current">${day}</span>
                `;
            }
            
            podcasts.forEach(podcast => {
                const publishedDate = new Date(podcast.published);
            
                if ( publishedDate.getDate() == date.getDate() ){
                    episode +=`
                        <div class="calendar-item">
                            <div class="calendar-item__logo-wrap">
                                <img src="${podcast.cover}" class="calendar-item__logo" alt="${podcast.title}">
                            </div>
                            <div class="calendar-item__content">
                                <p class="calendar-item__title">
                                    ${podcast.title}
                                </p>  
                            </div>
                        </div>
                    `;
                    count++;
                }
            });

            if ( episode == '' ) {
                calender += `
                    <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                        <p class="calendar__date">
                            ${day}
                        </p>
                        ${episode}
                    </div>
                `;
            } else {
                calender += `
                    <div class="col-md col-sm-12 col-xs-12 calendar__cell">
                        <p class="calendar__date">
                            ${day}
                        </p>
                        ${episode}
                    </div>
                `;
            }

            if (this.getDay(date) % 7 == 6) { // вс, последний день - перевод строки
                calender += '</div><div class="row calendar__row">';
            }
    
            date.setDate(date.getDate() + 1);
        }

        // добить таблицу пустыми ячейками, если нужно
        if (this.getDay(date) != 0) {
            for (var i = this.getDay(date); i < 7; i++) {
                calender += `
                    <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                    </div>
                `;
            }
        }

        // закрыть таблицу
        calender += '</div>';

        calender += `
            <div class="row end-xs">
                <div class="col-xs-12">
                    <p class="calendar__text">
                        <span class="calendar__text_highlight">${count}</span> ep. released
                    </p>
                </div>
            </div>
        `;

        this.calendar.append(calender);
    }

    getDay(date) {
        var day = date.getDay();
        if (day == 0) day = 7;
        return day - 1;
    }
}

module.exports = Tamplate;