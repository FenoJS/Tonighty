import { elements } from './base';

export const renderUpcoming = (shows) => {
  shows.forEach(show => {
    const markup = `<div class="test">${show.airdate}</div>`
  });
}