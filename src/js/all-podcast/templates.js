class Tamplate{
    constructor() {
        this.podcastList = $('.js-podcast-list');
    }

    getPodcast(podcast) {
        const $wrap = $('<div>').attr({ class: 'col-xs-12 col-sm-6 col-md-4 user-podcast-item__wrap' });
        const $item = $('<div>').attr({ class: 'user-podcast-item' });

        const $progressBar = this.getProgressBar(podcast.listened, podcast.total);

        const $itemInner = `
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

                    ${$progressBar.html()}

                    <a href="${podcast.link}" class="user-podcast-item__link">
                        <i class="icon-globe"></i>
                        ${podcast.link}
                    </a>
                </div>
            </div>
        `;

        $item.append($itemInner);
        const $podcast = $wrap.append($item);

        return $podcast;
    }

    getProgressBar(listened, total){
        const totalPercent = Math.round( listened * 100 / total );

        const $item = $('<div>').attr({ class: 'user-podcast-item-progress' });
        const $itemInner = `
            <div class="row">
                <div class="col-xs-6">
                    <p class="user-podcast-item-progress__text">${listened} / ${total}</p>
                </div>
                <div class="col-xs-6">
                    <p class="user-podcast-item-progress__text user-podcast-item-progress__percent">${totalPercent}%</p>
                </div>
                <div class="col-xs-12">
                    <div class="user-podcast-item-progress__bar">
                        <div class="user-podcast-item-progress__bar_load" style="width: ${totalPercent}%"></div>
                    </div>
                </div>
            </div>
        `;

        $item.append($itemInner);
        const $progressBar = $('<div>').append($item);
        
        return $progressBar;
    }
}

module.exports = Tamplate;