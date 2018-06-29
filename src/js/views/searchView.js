import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.results.innerHTML = '';
}

export const renderShow = (result) => {
  // need to add placeholders for non-existing props
  const markup = `
    <div class="results-item">
      <img src="${result.show.image ? result.show.image.medium : ''}" alt="result.show.name" class="results-item__img">
      <h3 class="results-item__name">${result.show.name}</h3>
      <p class="results-item__network">${result.show.network ? result.show.network.name : ''}</p>
    </div>
  `;

  elements.results.insertAdjacentHTML('beforeend', markup);
};

export const renderResult = (shows) => {
  shows.forEach(renderShow);
};