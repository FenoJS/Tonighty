export let elements = {
  mainContent: document.querySelector('.content'),
  results: document.querySelector('.results'),
  headerBox: document.querySelector('.header__box'),
  searchForm: document.querySelector('.search-bar'),
  searchInput: document.querySelector('.search-bar__input'),
  popularLink: document.querySelector('[data-url="populars"]'),

};

export const elementString = {
  upcomingBarList: 'upcoming-bar__list',
  episodesList: 'show__episodes-box',
};

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

export const renderMainTemplate = () => {
  if (!elements.upcomingBar) {
    const markupForm = `
        <form class="search-bar search-bar--top" action="#">
          <input type="text" class="search-bar__input search-bar__input--top" placeholder="Search series">
          <button class="btn search-bar__btn">
            <svg class="search-bar__icon">
              <use xlink:href="img/sprite.svg#icon-magnifying-glass"></use>
            </svg>
          </button>
        </form>
      `;
    const markupMain = `
        <div class="wrapper">
          <div class="upcoming-bar"></div>
          <h2 class="content__heading heading-tertiary">HEADER PLACEHOLDER</h2>
          <div class="results">
            <div class="results__pagination"></div>
          </div>
        </div>
      `;
    elements.mainContent.innerHTML = '';
    // elements.searchForm.remove();
    elements.headerBox.insertAdjacentHTML('afterend', markupForm);
    elements.mainContent.insertAdjacentHTML('afterbegin', markupMain);
    console.log('render template');
    elements = {
      headerBox: document.querySelector('.header__box'),
      results: document.querySelector('.results'),
      searchForm: document.querySelector('.search-bar'),
      searchInput: document.querySelector('.search-bar__input'),
      contentHeading: document.querySelector('.content__heading'),
      upcomingBar: document.querySelector('.upcoming-bar'),
      upcomingBarList: document.querySelector('.upcoming-bar__list'),
      seasonsList: document.querySelector('.show__season-list'),
      mainContent: document.querySelector('.content'),
    };
  } else {
    console.log('return');
    return;
  }
};