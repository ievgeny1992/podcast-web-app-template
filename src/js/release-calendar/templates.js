const moment = require('moment');

class Tamplate{
    constructor() {
        moment.locale('ru');

        this.currentDate = null;
    }

    getReleaseCalendarWrap(){
        const $calendarWrap = $('<div>').attr({ class: 'calendar-body__wrap js-calendar-slider' });
        return $calendarWrap;
    }

    getReleaseCalendarHeader(){
        const $row = $('<div>').attr({ class: 'row middle-xs' });
        const buttons = `
            <div class="col-xs-6">
                <button data-month="1" data-year="0" class="calendar__button js-create-calndar-prev">
                    <i class="icon-left-open"></i>
                </button>
                <button data-month="1" data-year="0" class="calendar__button js-create-calndar-next">
                    <i class="icon-right-open"></i>
                </button>
            </div>
        `;

        const $currentDateWrap = $('<div>').attr({ class: 'col-xs-6' });
        this.currentDate = this.getReleaseCalendarCurrentDate();

        $currentDateWrap.append(this.currentDate);

        $row.append(buttons);
        $row.append($currentDateWrap);

        return $row;
    }

    getReleaseCalendarCurrentDate(){
        const currentDate = $('<p>').attr({ class: 'js-current-date calendar__current-date' });
        return currentDate;
    }

    setReleaseCalendarCurrentDate(month, year){
        const date = new Date(year, month - 1);
        const monthName = moment(date).format('MMMM');     
        this.currentDate.text(monthName + ' ' + year);
    }

    getReleaseCalendarWeekDays(){
        const weekDaysName = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
        const $calendarRow = $('<div>').attr({ class: 'row calendar__row calendar__days' });

        weekDaysName.forEach(day => {
            const $calendarDate = $('<p>').attr({ class: 'calendar__date' }).text(day);
            const $calendarCell = $('<div>').attr({ class: 'col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_days calendar__cell_empty' });

            $calendarCell.append($calendarDate);
            $calendarRow.append($calendarCell);
        });
        
        return $calendarRow;
    }

    getReleaseCalendarBody(podcasts, targetDate) {
        const now = new Date();

        if( !targetDate ){
            targetDate = {};
            targetDate.month = now.getMonth();
            targetDate.year = now.getFullYear();
            
            var date = new Date(now.getFullYear(), now.getMonth());
        } else {
            var date = new Date(targetDate.year, targetDate.month - 1);
        }

        var calendar = `<div class="row calendar__row">`;

        for (var i = 0; i < this.getDay(date); i++) {
            calendar += `
                <div class="col-md col-sm-12 col-xs-12 calendar__cell calendar__cell_empty">
                </div>
            `;
        }

        const currentMonth = date.getMonth();
        const currentDate = now.getDate();

        this.setReleaseCalendarCurrentDate( targetDate.month, targetDate.year );

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
                                <p class="calendar-item__title" title="${podcast.title}">
                                    ${podcast.title}
                                </p>  
                            </div>
                        </div>
                    `;
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
        
        const count = podcasts.length;
        calendar += `
            <div class="row end-xs">
                <div class="col-xs-6">
                    <p class="calendar__text">
                        <span class="calendar__text_highlight">${count}</span> эп. вышло
                    </p>
                </div>
            </div>
        `;

        const $calendarSlide = $('<div>');
        $calendarSlide.append(calendar);

        return $calendarSlide;
    }

    getDay(date) {
        var day = date.getDay();
        if (day == 0) day = 7;
        return day - 1;
    }
}

module.exports = Tamplate;