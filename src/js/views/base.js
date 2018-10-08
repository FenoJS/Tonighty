export const elements = {
  searchForm: document.querySelector('.search-bar'),
  searchInput: document.querySelector('.search-bar__input'),
  results: document.querySelector('.results'),
  contentHeading: document.querySelector('.content__heading'),
  popularLink: document.querySelector('[data-url="populars"]'),
  upcomingBar: document.querySelector('.upcoming-bar'),
  upcomingBarList: document.querySelector('.upcoming-bar__list'),
  seasonsList: document.querySelector('.show__season-list'),
};

export const elementString = {
  upcomingBarList: 'upcoming-bar__list',
  episodesList: 'show__episodes-box',
}

export const renderLoader = (parent) => {
  const loader = `
    <div class="${elementStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};