import { elements, elementString } from './base';

const renderShow = (show) => {
  if (show.airdateInfo) {
    const el = document.querySelector(`.${elementString.upcomingBarList}`)
    const markup =
      `<li class="upcoming-bar__item">
        ${show.name}
        S0${show.airdateInfo.season}E0${show.airdateInfo.number}
        ${show.airdateInfo.airdate}
        ${show.airdateInfo.airtime}
      </li>`;

    el.insertAdjacentHTML('beforeend', markup);
  }
}

export const clearUpcoming = () => {
    elements.upcomingBar.innerHTML = '';

}

export const renderUpcoming = (shows) => {
  console.log('test')
  const markup = `<h3 class="upcoming-bar__header" >upcoming TV series: </h3>
                  <ul class="${elementString.upcomingBarList} "></ul>`;
  elements.upcomingBar.insertAdjacentHTML('beforeend', markup);
  shows.forEach(renderShow);
};