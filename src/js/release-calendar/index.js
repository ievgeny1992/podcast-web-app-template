const Tamplate = require('./templates.js');

class ReleaseCalendar{
    constructor(url){
        this.url = url;
        this.calendarBlock = $('.js-calendar');

        this.month = null;
        this.year = null;

        this.template = new Tamplate();
        this.initHandlers();
    }

    initHandlers(){
        const $body = $('body');
        $body.on('show-calendar', (self, targetDate) => {
            const $calendarHeader = this.template.getReleaseCalendarHeader();
            const $calendarWeekDays = this.template.getReleaseCalendarWeekDays();
            const $calendarSliderWrap = this.template.getReleaseCalendarWrap();

            this.calendarBlock.append($calendarHeader);
            this.calendarBlock.append($calendarWeekDays);
            this.calendarBlock.append($calendarSliderWrap);
            
            this.calendarSlider = $calendarSliderWrap;
            this.initSlider();

            this.craeteCalendarButtonHandler();
            this.getEpisodesForMonth(targetDate);
        });

        $body.on('show-new-slide', (self, targetDate) => {
            this.getEpisodesForMonth(targetDate);
        });
    }

    initSlider(){
        this.calendarSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            fade: true,
            cssEase: 'linear',
            adaptiveHeight: true,
            swipe: false
        });
    }

    getEpisodesForMonth(targetDate) {
        if( !targetDate ){
            targetDate = {};
            const now = new Date();
            targetDate.month = now.getMonth() + 1;
            targetDate.year = now.getFullYear();
        }
        var url = this.url + 'get_episode_in_month/' + targetDate.month + '&' + targetDate.year;
        
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.createReleaseCalendarBody(json, targetDate);
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
    }

    createReleaseCalendarBody(podcasts, targetDate){
        const calendar = this.template.getReleaseCalendarBody(podcasts, targetDate);

        this.calendarSlider.slick('slickAdd', calendar);
        this.calendarSlider.slick('slickNext');
    }

    craeteCalendarButtonHandler(){
        const now = new Date();
        this.month = now.getMonth() + 1;
        this.year = now.getFullYear();

        var slideIndex = 0;

        $('.js-create-calndar-prev').on('click', () => {
            slideIndex++;
            this.month--;

            if ( this.month == 0) {
                this.month = 12;
                this.year--;
            }

            $('body').trigger('show-new-slide', { month: this.month, year: this.year });
        });

        $('.js-create-calndar-next').on('click', () => {
            this.calendarSlider.slick('slickPrev');
            if (slideIndex !== 0) {
                this.calendarSlider.slick('slickRemove',slideIndex);
                slideIndex--;

                this.month++;
                if ( this.month == 13) {
                    this.month = 1;
                    this.year++;
                }

                this.template.setReleaseCalendarCurrentDate(this.month, this.year);
            }
        });
    }
}

module.exports = ReleaseCalendar;