import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.results.innerHTML = '';
};


function renderLikedBtn(id, storage) {
  if (storage) {
    return storage.findIndex(e => e.id === id) !== -1;
  }
}

const renderShow = (show, storage) => {
  const { id } = show;
  const buttonText = renderLikedBtn(id, storage) ? 'Remove' : 'Add to favorites';


  // need to add placeholders for non-existing props
  const markup = `
    <div class="results-item">
      <a href="#/show/${show.id}" class="results-item__link">
        <img src="${show.image ? show.image.medium : ''}" alt="${show.name}" class="results-item__img">
        <div class="results-item__back">
        <button class="btn btn__info">
          <svg class="results-item__icon">
            <use xlink:href="img/sprite.svg#icon-magnifying-glass"></use>
          </svg>
        </button>
      </div>
      </a>
      <h3 class="results-item__name">${show.name}</h3>
      <p class="results-item__network">${show.network ? show.network.name : ''}</p>
      <button class="btn btn__fav ${renderLikedBtn(id, storage) ? 'btn__fav--small btn__fav--small2' : 'btn__fav--small'}" data-show-id=${show.id}>${buttonText}</button>
    </div>
  `;

  elements.results.insertAdjacentHTML('beforeend', markup);
};

export const renderResult = (shows, header, max = 100) => {
  const storage = JSON.parse(localStorage.getItem('favoriteShows'));
  console.log('render results');
  elements.contentHeading.textContent = header;
  shows.forEach((show, i) => {
    if (i < max) {
      renderShow(show, storage);
    }
  });
};

export const renderEmptyInfo = () => {
  const markup = `
    <div class="results-item__empty">
      <h2 class="heading-secondary--2">You Don't have any favorites TV Shows yet!</h2>
      <h3 class="heading-tertiary--2">Search for new TV Shows and add them into your Favorites</h3>
      <a href="#populars">populars</a>
    </div>
  `;

  elements.contentHeading.textContent = '';
  elements.results.insertAdjacentHTML('afterbegin', markup)
}