import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { elements } from './base';

dayjs.extend(relativeTime);

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
    <div class="schedule-item">
      <div class="schedule-item__img-box">
        <a href="#/show/${show.id}" class="schedule-item__link">
        <img src="${show.image ? show.image.medium.replace('http', 'https') : ''}" alt="${show.name}" class="schedule-item__img">
        <div class="schedule-item__back">
        <button class="btn btn__info">
          <svg class="schedule-item__icon">
            <use xlink:href="img/sprite.svg#icon-magnifying-glass"></use>
          </svg>
        </button>
        </div>
        </a>
      </div>
      <div class="schedule-item__details-box">
        <h3 class="schedule-item__name">${show.name}</h3>
        <p class="schedule-item__episode-name">${show.airdateInfo.name}</p>
        <p class="schedule-item__airdate">Airdate ${show.airdateInfo.airdate}</p>
        <p class="schedule-item__relative">${dayjs().to(dayjs(show.airdateInfo.airstamp))}</p>
        <button class="btn btn__fav ${renderLikedBtn(id, storage) ? 'btn__fav--small btn__fav--small2' : 'btn__fav--small'}" data-show-id=${show.id}>${buttonText}</button>
      </div>
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