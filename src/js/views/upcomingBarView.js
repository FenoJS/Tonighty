import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { elements, elementString } from './base';
import { formatEpisodeNum } from '../helpers';

dayjs.extend(relativeTime);

const renderShow = (show) => {
  console.log('redner upcomong item', show)
  const el = document.querySelector(`.${elementString.upcomingBarList}`);
  if (show.airdateInfo) {
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
  if (show.status !== 'Running') {
    const markup = `<li class="upcoming-bar__item">
      <div class="upcoming-bar__info">
        ${show.name}
      </div>
      <div class="upcoming-bar__date">
        ${show.status}
      </div>
    </li>`;

    el.insertAdjacentHTML('beforeend', markup);
  }

  if ((show.status === 'Running') && !show.airdateInfo) {
    const markup = `<li class="upcoming-bar__item">
    <div class="upcoming-bar__info">
      ${show.name}
    </div>
    <div class="upcoming-bar__date">
      Waiting for info
    </div>
  </li>`;

    el.insertAdjacentHTML('beforeend', markup);
  }
};

export const clearUpcoming = () => {
  elements.upcomingBar.innerHTML = '';
};

export const renderUpcoming = (shows) => {

  if (!shows.length > 0) {
    const markupEmpty = '<span class="upcoming-bar__empty">Add TV shows to favorites to see countdown</span>';
    elements.upcomingBar.insertAdjacentHTML('beforeend', markupEmpty);
  } else {
    const markup = `<h3 class="upcoming-bar__header" >upcoming shows: </h3>
                    <ul class="${elementString.upcomingBarList} "></ul>`;
    elements.upcomingBar.insertAdjacentHTML('beforeend', markup);
    shows.forEach(renderShow);
  }
};