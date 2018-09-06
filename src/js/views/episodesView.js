import { elements, elementString } from './base';

const renderEpisode = (episode, season) => {
  if (episode.season === season) {
    const el = document.querySelector('.show__episodes-box');
    const markup =
    `<div class="episode">
      S0${episode.season}E0${episode.number} - ${episode.name}
      Airdate: ${episode.airdate} ${episode.airtime}
    </div>`
    el.insertAdjacentHTML('beforeend', markup);
  }
};


export const renderEpisodes = (episodes, season = 1) => {
  const el = document.querySelector(`.${elementString.episodesList}`);
  el.innerHTML = '';
  episodes.forEach(episode => renderEpisode(episode, season));
};