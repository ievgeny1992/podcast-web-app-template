import Chart, { defaults } from 'chart.js';
import moment, { locale } from 'moment';

class PodcastChart{
    constructor(url){
        this.url = url;
        locale('ru');
        this.initHandlers();
    }

    initHandlers(){
        const $body = $('body');
        
        $body.on('show-chart', (self) => {
            this.setChartDefaults();
            this.createChart();
        });
    }

    createChart(){
        var ctx = document.getElementById('js-chart').getContext("2d");

        const widthBlock = $('#js-chart').parent().width();

        this.gradientStroke = ctx.createLinearGradient(0, 0, widthBlock, 0);
        this.gradientStroke.addColorStop(0, '#fd643b');
        this.gradientStroke.addColorStop(1, '#fe1453');

        this.podcastChart = new Chart(ctx, this.getChartConfig());
        this.setChartData();
    }

    getChartConfig(){
        const config = {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Количество эпизодов',
                    datasets: [{ data: [] }],
                    borderColor: this.gradientStroke,
                    pointBorderColor: this.gradientStroke,
                    pointBackgroundColor: this.gradientStroke,
                    pointHoverBackgroundColor: this.gradientStroke,
                    pointHoverBorderColor: this.gradientStroke,
                    fill: false,
                    pointRadius: 3,
                    pointHoverRadius: 7,
                    pointHitRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'x-axis',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            color: '#282b35'
                        },
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            color: '#282b35'
                        },
                        stacked: true
                    }]
                }
            }
        };

        return config;
    }

    createChartLabels(month, year){
        var currentDate =  new Date(year, month - 1);
        var monthName = moment(currentDate).format('MMMM YYYY');

        this.podcastChart.data.labels.push(monthName);
    }

    setChartData(){
        var date = new Date();
        var month = date.getMonth() + 2;
        var year = date.getFullYear() - 1;

        for (var i = 0; i < 12; i++) {
            var currentDate =  new Date(year, month);
            this.createChartLabels(currentDate.getMonth(), currentDate.getFullYear());

            var currentMonth = currentDate.getMonth();
            var currentYear = currentDate.getFullYear();

            if ( currentMonth === 0 ){
                currentMonth = 12;
                currentYear--;
            }

            var url = this.url + 'get_count_episode_in_month/' + currentMonth + '&' + currentYear;
            this.getChartData(i, url);
    
            month++;
        }
    }

    getChartData(index, url){
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                const count = json.total;
                this.podcastChart.data.datasets[0].data[index] = count;
                this.podcastChart.update();
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
    }

    setChartDefaults(){
        defaults.global.defaultFontFamily = 'Basis Grotesque Pro Light';
        defaults.global.defaultFontColor = '#6b7282';
        defaults.global.defaultFontSize = 14;
    }
}

export default PodcastChart;