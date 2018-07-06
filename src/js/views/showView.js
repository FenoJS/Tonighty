import { elements } from './base';

export const renderShow = (show, header) => {
  const markup = `
  <div class="show">
    <div class="show__details-box">
      <div class="show__img-box">
        <img src="${show.img}" alt="#" class="show__img">
      </div>
      <div class="show__details">
        <div class="show__details-top">
          <span class="show__rating">Rating: ${show.rating}/10</span>
          <button class="btn btn--fav">Add to favorites</button>
        </div>
        <div class="show__details-mid">
          <h3 class="show__desc-heading heading-tertiary">Description: </h3>
          <p class="show__description">${show.description}</p>
        </div>
        <div class="show__info">
          <span class="show__runtime">Runtime: ${show.runtime} min</span>
          <span class="show__genres">Genres: ${show.genres}</span>
          <span className="show__airdate">Next airdate: ${show.airdate}</span>
        </div>
      </div>
    </div>
    <div class="show__episodes-box"></div>
    <div class="show__crew-box"></div>
  </div>
  `;

  elements.contentHeading.textContent = `${header}`
  elements.results.insertAdjacentHTML('afterbegin', markup);
};