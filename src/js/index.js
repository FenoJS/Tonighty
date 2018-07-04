import Search from './models/Search';
import Show from './models/Show';
import Popular from './models/Popular';
import * as searchView from './views/searchView';
import * as showView from './views/showView';

import { elements } from './views/base';

// GLOBAL STATE

const state = {};

// SEARCH CONTROLLER

const controlSearch = async() => {
  // Get query from view
  const query = searchView.getInput();

  if (query) {
    // Create new Search Object
    state.search = new Search(query);

    // Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    try {
      // Search for results
      await state.search.getResult();

      // Render results and header
      searchView.renderResult(state.search.result, `Searching for ${state.search.query}`);
    } catch (err) {
      console.log(err);
    }
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});


// SHOW CONTROLLER

const controlShow = async() => {
  console.log(state)
  // Get show ID from url hash
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Create new show object
    state.show = new Show(id);

    try {
      // Prepare UI for results
      searchView.clearResults();

      // Get show data
      await state.show.getShow();

      // Render show view and header
      showView.renderShow(state.show, state.show.name);
    } catch (err) {
      console.log(err);
    }
  }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlShow));

// POPULAR CONTROLLER

const controlPopular = async() => {
  // Create new Popular object
  state.populars = new Popular();

  try {
    // Get data
    await state.populars.getPopular();

    // Prepare UI for results
    searchView.clearResults();

    // Render popular shoes
    searchView.renderResult(state.populars.populars, 'Most popular shows');
  } catch (err) {
    console.log(err);
  }
};

elements.popularLink.addEventListener('click', (e) => {
  e.preventDefault();
  controlPopular();
});

// const arr = Array.from(document.getElementsByTagName('a'));
// arr.forEach(e => e.addEventListener('click', (e => {
//   e.preventDefault()
//   window.history.pushState(null, '', 'populars')
// })));