import Search from './models/Search';
import Show from './models/Show';
import * as searchView from './views/searchView';
import * as showView from './views/showView';

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
      // Render results and header
      console.log(state.search.result)
      searchView.renderResult(state.search.result, state.search.query);
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


// SHOW CONTROLLER

const controlShow = async() => {
  // Get show ID from url hash
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Create new show object

    state.show = new Show(id);
    console.log(state)
    try {
      // Get show data

      await state.show.getShow();
      // Render show view

      showView.renderShow(state.show)      
    } catch (err) {
      console.log(err)
    }


  }

}

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlShow))
