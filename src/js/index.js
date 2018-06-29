import Search from './models/Search';
import * as searchView from './views/searchView';

import { elements } from './views/base';

// GLOBAL STATE

const state = {};

// SEARCH CONTROLLER

const controlSearch = async() => {
  // Get query from view
  const query = searchView.getInput();
  // Create new search Object
  if (query) {
    state.search = new Search(query);
    // Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    // Search for results
    try {
      await state.search.getResult();
      // Render results
      console.log(state.search.result)
      searchView.renderResult(state.search.result);
    } catch (err) {
      console.log(err);
    }
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});