import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.results.innerHTML = '';
}

export const renderShow = (show) => {
  // need to add placeholders for non-existing props
  const markup = `
    <div class="results-item">
      <img src="${show.image ? show.image.medium : ''}" alt="${show.name}" class="results-item__img">
      <h3 class="results-item__name">${show.name}</h3>
      <p class="results-item__network">${show.network ? show.network.name : ''}</p>
    </div>
  `;

  elements.results.insertAdjacentHTML('beforeend', markup);
};

export const renderResult = (shows) => {
  shows.forEach(renderShow);
};