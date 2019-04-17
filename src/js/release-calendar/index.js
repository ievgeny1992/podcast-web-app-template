const Tamplate = require('./templates.js');

class ReleaseCalendar{
    constructor(url){
        this.url = url;
        this.calendar = $('.js-calendar');

        this.month = null;
        this.year = null;

        this.initHandlers();
        this.initSlider();
    }

    initHandlers(){
        const $body = $('body');
        $body.on('show-calendar', (self, targetDate) => {
            this.getEpisodesForMonth(targetDate);
        });

        this.craeteCalendarButtonHandler();
    }

    initSlider(){
        this.calendar.slick({
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
        this.template = new Tamplate();
        
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.createReleaseCalendar(json, targetDate);
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
    }

    createReleaseCalendar(podcasts, targetDate){
        var calendar = this.template.getReleaseCalendar(podcasts, targetDate);
        this.calendar.slick('slickAdd', calendar);
        this.calendar.slick('slickNext');
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

            $('body').trigger('show-calendar', { month: this.month, year: this.year });
        });

        $('.js-create-calndar-next').on('click', () => {
            this.calendar.slick('slickPrev');
            if (slideIndex !== 0) {
                this.calendar.slick('slickRemove',slideIndex);
                slideIndex--;

                this.month++;
                if ( this.month == 13) {
                    this.month = 1;
                    this.year++;
                }
            }
        });
    }
}

module.exports = ReleaseCalendar;