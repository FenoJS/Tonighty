import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.results.innerHTML = '';
};

export const toggleFavBtn = (e) => {
  e.target.classList.toggle("btn--fav-small2")

}

function rednerLikedBtn(id, storage) {
  if (storage) {
    return storage.findIndex(e => e.id === id) !== -1;
  }

}

export const renderShow = (show) => {
  const storage = JSON.parse(localStorage.getItem('favorites'));
  const { id } = show;



  // need to add placeholders for non-existing props
  const markup = `
    <div class="results-item">
      <img src="${show.image ? show.image.medium : ''}" alt="${show.name}" class="results-item__img">
      <h3 class="results-item__name">${show.name}</h3>
      <p class="results-item__network">${show.network ? show.network.name : ''}</p>
      <a href="#/show/${show.id}">
        <div class="results-item__back">
          <button class="btn btn--info">
            <svg class="results-item__icon">
              <use xlink:href="img/sprite.svg#icon-magnifying-glass"></use>
            </svg>
          </button>
          <button class="btn ${rednerLikedBtn(id, storage) ? 'btn--fav-small btn--fav-small2' : 'btn--fav-small'}">Add to favorites</button>
        </div>
      </a>
    </div>
  `;

  elements.results.insertAdjacentHTML('beforeend', markup);
};

export const renderResult = (shows, header, max = 100) => {
  elements.contentHeading.textContent = header;
  shows.forEach((show, i) => {
    if (i < max) {
      renderShow(show);
    }
  });
};