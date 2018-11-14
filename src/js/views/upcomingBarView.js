import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { elements, elementString } from './base';
import { formatEpisodeNum } from '../helpers';

dayjs.extend(relativeTime);

const renderShow = (show) => {
  if (show.airdateInfo) {
    const el = document.querySelector(`.${elementString.upcomingBarList}`);
    const markup = `<li class="upcoming-bar__item">
        <div class="upcoming-bar__info">
          ${show.name} S${formatEpisodeNum(show.airdateInfo.season)}E${formatEpisodeNum(show.airdateInfo.number)}
        </div>
        <div class="upcoming-bar__date">
          ${show.airdateInfo.airdate} ${dayjs().to(dayjs(show.airdateInfo.airstamp))}
        </div>
      </li>`;

    el.insertAdjacentHTML('beforeend', markup);
  }
};

export const clearUpcoming = () => {
  elements.upcomingBar.innerHTML = '';
};

export const renderUpcoming = (shows) => {
  const markup = `<h3 class="upcoming-bar__header" >upcoming shows: </h3>
                  <button class="btn btn__slider btn__slider-bar--prev"></button>
                    <ul class="${elementString.upcomingBarList} "></ul>
                  <button class="btn btn__slider btn__slider-bar--next"></button>`;
  elements.upcomingBar.insertAdjacentHTML('beforeend', markup);
  shows.forEach(renderShow);
};