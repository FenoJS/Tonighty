import Search from './models/Search';
import Show from './models/Show';
import Popular from './models/Popular';
import Favorites from './models/Favorites';
import Schedule from './models/Schedule';
import * as searchView from './views/searchView';
import * as showView from './views/showView';
import * as upcomingView from './views/upcomingView';
import * as episodesView from './views/episodesView';

import { elements, elementString } from './views/base';
import { getDateYYYYMMDD } from './helpers';

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

//Toggle epsiodes nad cast
elements.results.addEventListener('click', (e) => {
  const castTab = e.target.closest('.show__tabs');
  const cast = document.querySelector('.show__cast')
  const episodes = document.querySelector('.show__episodes')

  if (castTab && e.target.className === 'show__tab-cast') {
    episodes.classList.add('hidden')
    cast.classList.remove('hidden')

  }
  if (castTab && e.target.className === 'show__tab-episodes') {
    cast.classList.add('hidden')
    episodes.classList.remove('hidden')
  }

})

// SHOULD CHANGE TO DATA ATRIBUTE
elements.results.addEventListener('click', (e) => {
  const btn = e.target.closest('.show__season-item');

  if (btn) {
    const number = btn.innerText.replace('Season', '');
    console.log(number);
    episodesView.renderEpisodes(state.show.episodes, parseInt(number, 10));
  }
});

// POPULAR CONTROLLER

const controlPopular = async() => {
  // Fetch populars only if hasn't been already fetched
  if (!state.populars) {

    // Create new Popular object
    state.populars = new Popular();

    try {
      // Get data
      await state.populars.getPopular();

      // Prepare UI for results
      searchView.clearResults();

      // Render popular shows
      searchView.renderResult(state.populars.populars, 'Most popular shows', 40);
    } catch (err) {
      console.log(err);
    }
  }

  // If populars has been already in state just render it
  searchView.clearResults();
  searchView.renderResult(state.populars.populars, 'Most popular shows', 40);
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
      if ((state.show && window.location.hash === `#/show/${id}`)) {
        state.favorites.addFavorite(state.show);
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
  const btn = e.target.closest('.btn--fav-small', 'btn--fav-small *');

  if (btn) {
    e.preventDefault();
    const id = btn.parentNode.parentNode.getAttribute('href').replace('#/show/', ''); // Need to add better selector
    searchView.toggleFavBtn(e);
    controlFavorites(id);
  }
});

elements.results.addEventListener('click', (e) => {
  const btn = document.querySelector('.btn--fav-big');

  if (btn && (e.target === btn)) {
    e.preventDefault();
    const id = window.location.hash.replace('#/show/', '');
    btn.classList.toggle('btn--fav-big2');
    controlFavorites(id);
  }
});

window.addEventListener('load', () => {
  state.favorites = new Favorites();
  state.favorites.readStorage();
});


// SCHEDULE CONTROLLER

const controlSchedule = async() => {
  const QueryDate = getDateYYYYMMDD();

  state.schedule = new Schedule();

  try {
    await state.schedule.getSchedule(QueryDate);
    searchView.clearResults();
    searchView.renderResult(state.schedule.schedule, 'Upcoming Shows:');
    console.log(state.schedule.schedule)
  } catch (err) {
    console.log(err)
  }




}



// UPCOMING BAR CONTROLLER

const controlUpcomingBar = () => {
  upcomingView.clearUpcoming();
  upcomingView.renderUpcoming(state.favorites.favorites)
}



// ROUTER

['hashchange', 'load'].forEach(e => window.addEventListener(e, () => {
  const { hash } = window.location;
  console.log(state)
  window.scrollTo(0,0);

  controlUpcomingBar();

  switch (hash) {
    case ('#populars'):
      controlPopular();
      break;
    case ('#favorites'):
      controlFavorites();
      break;
    case ('#schedule'):
      controlSchedule();
      break;
    default:
      controlShow();
  }
}));

