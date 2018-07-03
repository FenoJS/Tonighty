import { elements } from './base';

export const renderShow = (show) => {
  const markup = `
  <div class="show">
    <div class="show__details-box">
      <img src="${show.img}" alt="#" class="show__img">
      <div class="show__details">
        <p class="show__description">${show.description}</p>
        <div class="show__info">
          <span class="show__rating">${show.rating}</span>
          <span class="show__runtime">${show.runtime}</span>
          <span class="show__genres">${show.genre}</span>
        </div>
      </div>
    </div>
    <div class="show__episodes-box"></div>
    <div class="show__crew-box"></div>
  </div>
  `;

  elements.results.insertAdjacentHTML('afterbegin', markup);
};