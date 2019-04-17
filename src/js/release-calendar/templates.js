const moment = require('moment');
moment.locale('ru');

class Tamplate{
    constructor() {

    }

    getReleaseCalendar(podcasts, targetDate) {
        const now = new Date();

        if( !targetDate ){
            targetDate = {};
            targetDate.month = now.getMonth();
            targetDate.year = now.getFullYear();
            
            var date = new Date(now.getFullYear(), now.getMonth());
        } else {
            var date = new Date(targetDate.year, targetDate.month - 1);
        }
        
        // console.log('Текущее время: ' + now + ';   сгенертрованое время: ' + date);

        var calendar = `
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
            calendar += `
                <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                </div>
            `;
        }

        const currentMonth = date.getMonth();
        const currentDate = now.getDate();

        // const currentMonthName = moment().subtract(offset, 'month').format('MMMM');    
        // console.log(currentMonthName); 

        var count = 0;

        while (date.getMonth() == currentMonth) {
            var day = date.getDate();
            var episode = '';

            if (day.toString().length == 1) {
                day = '0' + day;
            }

            if (date.getDate() == currentDate & date.getMonth() == now.getMonth() & date.getFullYear() == now.getFullYear()) {
                day = `
                    <span class="calendar__date_current">${day}</span>
                `;
            }

            podcasts.forEach(podcast => {
                const publishedDate = new Date(podcast.published);

                if (publishedDate.getDate() == date.getDate()) {
                    episode += `
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

            if (episode == '') {
                calendar += `
                    <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                        <p class="calendar__date">
                            ${day}
                        </p>
                    </div>
                `;
            } else {
                calendar += `
                    <div class="col-md col-sm-12 col-xs-12 calendar__cell">
                        <p class="calendar__date">
                            ${day}
                        </p>
                        ${episode}
                    </div>
                `;
            }

            // вс, последний день - перевод строки
            if (this.getDay(date) % 7 == 6) {
                calendar += '</div><div class="row calendar__row">';
            }

            date.setDate(date.getDate() + 1);
        }

        // добить таблицу пустыми ячейками, если нужно
        if (this.getDay(date) != 0) {
            for (var i = this.getDay(date); i < 7; i++) {
                calendar += `
                    <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                    </div>
                `;
            }
        }

        // закрыть таблицу
        calendar += '</div>';

        calendar += `
            <div class="row end-xs">
                <div class="col-xs-6">
                    <p class="calendar__text">
                        <span class="calendar__text_highlight">${count}</span> ep. released
                    </p>
                </div>
            </div>
        `;
        var $calendarWrap = $('<div>');
        $calendarWrap.append(calendar);
        return $calendarWrap;
    }

    getDay(date) {
        var day = date.getDay();
        if (day == 0) day = 7;
        return day - 1;
    }
}

module.exports = Tamplate;