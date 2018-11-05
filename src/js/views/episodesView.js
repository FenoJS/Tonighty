import { elementString } from './base';
import { formatEpisodeNum } from '../helpers';

const renderEpisode = (episode, season) => {
  if (episode.season === season) {
    console.log(episode.id)
    const el = document.querySelector('.show__episodes-box');
    const markup = `<div class="episode">
      <div class="episode__img-box">
        <img src="${episode.image ? episode.image.medium : ''}" alt="" class="episode__img"/>
      </div>
      <div class="episode__details">
        <span class="episode__info">S${formatEpisodeNum(episode.season)}E${formatEpisodeNum(episode.number)} - ${episode.name}</span>
        <span class="episode__airdate">Airdate: ${episode.airdate} ${episode.airtime} - x days ago/in x days</span>
      </div>
      <div class="episode__buttons">
        <button class="btn btn__fav btn__fav--watched" data-episode-id="${episode.id}">Unwatched</button>
      </div>
    </div>`;
    el.insertAdjacentHTML('beforeend', markup);
  }
};


export const renderEpisodes = (episodes, season) => {
  const el = document.querySelector(`.${elementString.episodesList}`);
  el.innerHTML = `<button class="btn btn__fav btn__fav--watch-all">Watch all</button>
                  <button class="btn btn__fav btn__fav--unwatch-all">Uwatch all</button>`;
  episodes.forEach(episode => renderEpisode(episode, season));
};