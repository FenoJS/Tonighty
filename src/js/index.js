import Search from './models/Search';
import Show from './models/Show';
import Popular from './models/Popular';
import Favorites from './models/Favorites';
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

    // Change URL
    window.location.hash = '#';

    // Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    //searchView.toggleFavBtn(state.favorites.favorites)
    try {
      // Search for results
      await state.search.getResult();
      console.log(state)
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
  const id = window.location.hash.replace('#/show/', '');

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

//['hashchange', 'load'].forEach(e => window.addEventListener(e, controlShow));

// POPULAR CONTROLLER

const controlPopular = async() => {
  // Create new Popular object
  state.populars = new Popular();

  try {
    // Get data
    await state.populars.getPopular();

    // Prepare UI for results
    searchView.clearResults();

    // Render popular shows
    searchView.renderResult(state.populars.populars, 'Most popular shows');
  } catch (err) {
    console.log(err);
  }
};

// elements.popularLink.addEventListener('click', (e) => {
//   e.preventDefault();
//   controlPopular();
// });


// FAVORITES CONTROLLER

const controlFavorites = (id) => {
  console.log(window.location.hash)

  if (id) {
    const parsedId = parseInt(id, 10);

    // Create new favorites object
    if (!state.favorites) state.favorites = new Favorites();

    // Check if show is already liked and depend of result add it or remove from Favorites
    if (!state.favorites.isLiked(parsedId)) {
      if ((state.search && window.location.hash === '')) {
        const showIndex = state.search.result.findIndex(e => e.id === parsedId);
        state.favorites.addFavorite(state.search.result[showIndex]);
      }
      if ((state.populars && window.location.hash === '#populars')) {
        const showIndex = state.populars.populars.findIndex(e => e.id === parsedId);
        state.favorites.addFavorite(state.populars.populars[showIndex]);
      }
    } else {
      state.favorites.deleteFavorite(parsedId);
    }
  }

  if (window.location.hash === '#favorites') {
    searchView.clearResults();
    searchView.renderResult(state.favorites.favorites, 'Your favorites shows:');
  }





}

elements.results.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');

  if (btn) {
    e.preventDefault();
    const id = btn.parentNode.parentNode.getAttribute('href').replace('#/show/', ''); // Need to add better selector
    searchView.toggleFavBtn(e);
    controlFavorites(id);
  }
});

window.addEventListener('load', () => {
  state.favorites = new Favorites();
  state.favorites.readStorage();
});


//
//window.addEventListener('load', controlShow);

['hashchange', 'load'].forEach(e => window.addEventListener(e, () => {
  const hash = window.location.hash;
  console.log(e)
  switch (hash) {
    case ('#populars'):
      controlPopular();
      console.log('populars hash');
      break;
    case ('#favorites'):
      controlFavorites();
      console.log('fav');
      break;
    default:
      controlShow();
  }
}));