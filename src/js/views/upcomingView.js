import { elements } from './base';

export const renderUpcoming = (shows) => {
  shows.forEach(show => {
    if (show.airdateInfo) {
      const markup = `<div class="test">${show.airdateInfo.airdate}</div>`
      elements.upcomingBar.insertAdjacentHTML('beforeend', markup);
    }
  });
}