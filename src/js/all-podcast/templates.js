class Tamplate{
    constructor() {
        this.podcastList = $('.js-podcast-list');
    }

    getPodcastList(podcast) {
        const $podcast = `
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
        `;

        return $podcast;
    }
}

module.exports = Tamplate;