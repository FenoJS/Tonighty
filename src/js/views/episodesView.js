import { elements } from './base';

const renderEpisode = (episode) => {
  const el = document.querySelector('.show__episodes-box');
  const markup = `<div class="episode__name">${episode.name}</div>`

  el.insertAdjacentHTML('beforeend', markup);
}


export const renderEpisodes = (episodes) => {
  episodes.forEach(renderEpisode)
}