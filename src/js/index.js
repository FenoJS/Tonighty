import Search from './models/Search';
import * as searchView from './views/searchView';

import { elements } from './views/base';

// GLOBAL STATE

const state = {};

// SEARCH CONTROLLER

const controlSearch = async() => {
  // Get query from view
  const query = searchView.getInput();
  // Create new Search Object
  if (query) {
    state.search = new Search(query);
    // Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    try {
      // Search for results
      await state.search.getResult();
      // Render results
      console.log(state.search.result)
      elements.contentHeading.textContent = `Searching for "${state.search.query}"`
      searchView.renderResult(state.search.result);
    } catch (err) {
      console.log(err);
    }
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  console.log(state)
  e.preventDefault();
  controlSearch();
});