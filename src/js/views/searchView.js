import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.results.innerHTML = '';
};

export const renderShow = (show) => {
  // need to add placeholders for non-existing props
  const markup = `
    <div class="results-item">
      <img src="${show.image.medium ? show.image.medium : ''}" alt="${show.name}" class="results-item__img">
      <h3 class="results-item__name">${show.name}</h3>
      <p class="results-item__network">${show.network.name ? show.network.name : ''}</p>
      <div class="results-item__back">
        <a href="#${show.id}" class="btn btn--info">More info</a>
        <button class="btn btn--fav">Add to favorites</button>
      </div>
    </div>
  `;

  elements.results.insertAdjacentHTML('beforeend', markup);
};

export const renderResult = (shows, header) => {
  elements.contentHeading.textContent = header;
  shows.forEach(renderShow);
};