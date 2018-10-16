import { elements, elementString } from './base';

const renderEpisode = (episode, season) => {
  if (episode.season === season) {
    const el = document.querySelector('.show__episodes-box');
    const markup =
    `<div class="episode">
      <div class="episode__img-box">
        <img src="${episode.image ? episode.image.medium : ''}" alt="" class="episode__img"/>
      </div>
      <div class="episode__details">
        <span class="episode__info">S0${episode.season}E0${episode.number} - ${episode.name}</span>
        <span class="episode__airdate">Airdate: ${episode.airdate} ${episode.airtime} - x days ago/in x days</span>
      </div>
      <div className="episode__buttons">
        <button class="btn btn__fav btn__fav--small">Watched</button>
      </div>
    </div>`
    el.insertAdjacentHTML('beforeend', markup);
  }
};


export const renderEpisodes = (episodes, season = 1) => {
  const el = document.querySelector(`.${elementString.episodesList}`);
  el.innerHTML = '';
  episodes.forEach(episode => renderEpisode(episode, season));
};