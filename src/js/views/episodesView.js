import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { elementString } from './base';
import { formatEpisodeNum } from '../helpers';

dayjs.extend(relativeTime);

function renderLikedBtn(id, storage) {
  if (storage) {
    return storage.findIndex(e => e === id) !== -1;
  }
}

const renderEpisode = (episode, season, storage) => {
  if (episode.season === season) {
    const relativeAirdate = episode.airstamp ? dayjs().to(dayjs(episode.airstamp)) : '';
    const { id } = episode;
    const buttonText = renderLikedBtn(id, storage) ? 'Watched' : 'Unwatched';
    const el = document.querySelector('.show__episodes-box');

    const markup = `<div class="episode">
      <div class="episode__img-box">
      <picture>
        <source media="(max-width: 600px)"
          sizes="1px"
          srcset="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7 1w"/>
        <img src="${episode.image ? episode.image.medium.replace('http', 'https') : ''}" alt="" class="episode__img"/>
      </picture>
      </div>
      <div class="episode__details">
        <span class="episode__info">S${formatEpisodeNum(episode.season)}E${formatEpisodeNum(episode.number)} - ${episode.name}</span>
        <span class="episode__airdate">Airdate: ${episode.airdate} ${episode.airtime} - ${relativeAirdate}</span>
      </div>
      <div class="episode__buttons">
        <button class="btn btn__fav ${renderLikedBtn(id, storage) ? 'btn__fav--watched btn__fav--watched2' : 'btn__fav--watched'}" data-episode-id="${episode.id}">${buttonText}</button>
      </div>
    </div>`;
    el.insertAdjacentHTML('beforeend', markup);
  }
};


export const renderEpisodes = (episodes, season) => {
  const storage = JSON.parse(localStorage.getItem('favoriteEpisodes'));

  const el = document.querySelector(`.${elementString.episodesList}`);
  el.innerHTML = `<button class="btn btn__fav btn__fav--watch-all">Watch all</button>
                  <button class="btn btn__fav btn__fav--unwatch-all">Uwatch all</button>`;
  episodes.forEach(episode => renderEpisode(episode, season, storage));
};