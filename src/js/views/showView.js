import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { elements } from './base';
import { renderEpisodes } from './episodesView';
import { renderCasts } from './castView';

dayjs.extend(relativeTime);

function renderLikedBtn(id, storage) {
  if (storage) {
    return storage.findIndex(e => e.id === id) !== -1;
  }
}

function renderSeasonsCount(episodes) {
  const el = document.querySelector('.show__season-list');
  const seasonNumber = episodes.reduce((a, b) => {
    return a.season > b.season ? a.season : b.season;
  });

  for (let i = 0; i < seasonNumber; i++) {
    const markup = `<li class="show__season-item"><span>Season${i + 1}</span></li>`;
    el.insertAdjacentHTML('afterbegin', markup);
  }
}


export const renderShow = (show, header) => {
  const storage = JSON.parse(localStorage.getItem('favoriteShows'));
  const { id } = show;
  const relativeAirdate = show.airdateInfo ? dayjs().to(dayjs(show.airdateInfo.airstamp)) : 'No info';
  const buttonText = renderLikedBtn(id, storage) ? 'Remove' : 'Add to favorites';

  const markup = `
  <div class="show">
    <div class="show__details-box">
      <div class="show__img-box">
      <picture>
      <source media="(max-width: 600px)"
        srcset="${show.image.medium.replace('http', 'https')}"/>
        <img src="${show.image.original.replace('http', 'https')}" alt="#" class="show__img">
    </picture>
      </div>
      <div class="show__details">
        <div class="show__details-top">
          <span class="show__rating">Rating: ${show.rating}/10</span>
          <button class="btn btn__fav ${renderLikedBtn(parseInt(id, 10), storage) ? 'btn__fav--big btn__fav--big2' : 'btn__fav--big'}">${buttonText}</button>
        </div>
        <div class="show__details-mid">
          <h3 class="show__desc-heading heading-tertiary">Description: </h3>
          <p class="show__description">${show.description}</p>
        </div>
        <div class="show__info">
          <span class="show__runtime">Runtime: ${show.runtime} min</span>
          <span class="show__genres">Genres: ${show.genres}</span>
          <span class="show__airdate">Next airdate: ${relativeAirdate}</span>
        </div>
      </div>
    </div>
  </div>
    <div class="show__tabs">
    <button class="show__tabs--episodes btn btn__tab btn__tab--active">Episodes</button>
    <button class="show__tabs--cast btn btn__tab">Cast</button>
    <h3 class="show__tabs-header heading-tertiary">${show.name} episodes</h3>
    </div>
    <div class="show__episodes">
      <div class="show__season-box">
        <button class="btn btn__slider btn__slider-show--prev"></button>
        <ul class="show__season-list"></ul>
        <button class="btn btn__slider btn__slider-show--next"></button>
      </div>
      <div class="show__episodes-box">
      </div>
    </div>


    <div class="show__cast hidden">
      <div class="show__cast-box"></div>
    </div>
  `;

  elements.contentHeading.textContent = `${header}`
  elements.results.insertAdjacentHTML('afterbegin', markup);

  const lastSeason = show.episodes[show.episodes.length - 1].season;

  renderSeasonsCount(show.episodes);
  renderEpisodes(show.episodes, lastSeason);
  renderCasts(show.cast);
};