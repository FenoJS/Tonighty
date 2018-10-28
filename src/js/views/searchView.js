import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.results.innerHTML = '';
};


function rednerLikedBtn(id, storage) {
  if (storage) {
    return storage.findIndex(e => e.id === id) !== -1;
  }

}

const renderShow = (show) => {
  const storage = JSON.parse(localStorage.getItem('favorites'));
  const { id } = show;

  const buttonText = rednerLikedBtn(id, storage) ? 'Remove' : 'Add to favorites';


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
      <button class="btn btn__fav ${rednerLikedBtn(id, storage) ? 'btn__fav--small btn__fav--small2' : 'btn__fav--small'}">${buttonText}</button>
    </div>
  `;

  elements.results.insertAdjacentHTML('beforeend', markup);
};

export const renderResult = (shows, header, max = 100) => {
  console.log('render results')
  elements.contentHeading.textContent = header;
  shows.forEach((show, i) => {
    if (i < max) {
      renderShow(show);
    }
  });
};