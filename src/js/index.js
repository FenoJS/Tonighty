import Search from './models/Search';
import Show from './models/Show';
import Popular from './models/Popular';
import Favorites from './models/Favorites';
import Schedule from './models/Schedule';
import * as searchView from './views/searchView';
import * as showView from './views/showView';
import * as upcomingView from './views/upcomingView';
import * as episodesView from './views/episodesView';


import { elements, renderMainTemplate } from './views/base';
import { getDateYYYYMMDD, toggleFavBtn } from './helpers';
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
    window.location.hash = '#search';

    // Prepare UI for results
    renderMainTemplate();
    searchView.clearInput();
    searchView.clearResults();
    // searchView.toggleFavBtn(state.favorites.favoriteShows)
    try {
      // Search for results
      await state.search.getResult();
      console.log(state);
      // Render results and header
      searchView.renderResult(state.search.result, `Results for ${state.search.query}`);
    } catch (err) {
      console.log(err);
    }
  }
};


// SHOW CONTROLLER

const controlShow = async() => {
  console.log(state);
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
      state.show.seasonsBarPostion = 0;
    } catch (err) {
      console.log(err);
    }
  }
};

// Toggle epsiodes and cast
elements.mainContent.addEventListener('click', (e) => {
  const castTab = e.target.closest('.show__tabs');
  const cast = document.querySelector('.show__cast');
  const episodes = document.querySelector('.show__episodes');
  const header = document.querySelector('.show__tabs-header');

  if (castTab && e.target.classList.contains('show__tabs--cast')) {
    header.innerText = '';
    header.innerText = `${state.show.name} cast`;
    episodes.classList.add('hidden');
    cast.classList.remove('hidden');
  }

  if (castTab && e.target.classList.contains('show__tabs--episodes')) {
    header.innerText = '';
    header.innerText = `${state.show.name} episodes`;
    cast.classList.add('hidden');
    episodes.classList.remove('hidden');
  }
});

// SHOULD CHANGE TO DATA ATRIBUTE
elements.mainContent.addEventListener('click', (e) => {
  const btn = e.target.closest('.show__season-item');

  if (btn) {
    const number = btn.innerText.replace('Season', '');
    console.log(number);
    episodesView.renderEpisodes(state.show.episodes, parseInt(number, 10));
  }
});

// SEASONS BAR SLIDER
elements.mainContent.addEventListener('click', (e) => {
  const btnPrev = e.target.closest('.btn__slider--prev');
  const btnNext = e.target.closest('.btn__slider--next');
  const moveBy = document.querySelector('.show__season-item').offsetWidth;
  const seasonsBar = document.querySelector('.show__season-list');
  const seasonsCount = seasonsBar.childNodes.length;

  if (btnPrev && state.show.seasonsBarPostion < 0) {
    state.show.seasonsBarPostion += moveBy;
    seasonsBar.style.transform = `translateX(${state.show.seasonsBarPostion}px)`;
  }
  if (btnNext && (((moveBy * seasonsCount) > seasonsBar.offsetWidth) && state.show.seasonsBarPostion > -Math.abs((moveBy * seasonsCount) - seasonsBar.offsetWidth))) {
    state.show.seasonsBarPostion -= moveBy;
    seasonsBar.style.transform = `translateX(${state.show.seasonsBarPostion}px)`;
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
      console.log('populars not in state');
      // Prepare UI for results
      searchView.clearResults();

      // Render popular shows
      searchView.renderResult(state.populars.populars, 'Most popular shows', 40);
    } catch (err) {
      console.log(err);
    }
  } else {
    // If populars has been already in state just render it
    searchView.clearResults();
    searchView.renderResult(state.populars.populars, 'Most popular shows', 40);
  }
};

// FAVORITES CONTROLLER
// function isLiked(id) {
//   console.log(id, 'isliked');
//   console.log(state.favorites.favoriteEpisodes.findIndex(e => e === id) !== -1)
//   return state.favorites.favoriteEpisodes.findIndex(e => e === id) !== -1;
// }

const controlFavorites = (id, type, action) => {
  const parsedId = parseInt(id, 10);
  console.log(window.location.hash);
  console.log(id)

  // Create new favorites object
  if (!state.favorites) state.favorites = new Favorites();

  if (id && type === 'show') {
    // Check if show is already liked and depend of result add it or remove from Favorites
    if (!state.favorites.isLiked(parsedId, type)) {
      if ((state.search && window.location.hash === '#search')) {
        const showIndex = state.search.result.findIndex(e => e.id === parsedId);
        state.favorites.addFavorite(state.search.result[showIndex], type);
      }
      if ((state.populars && window.location.hash === '#populars')) {
        const showIndex = state.populars.populars.findIndex(e => e.id === parsedId);
        state.favorites.addFavorite(state.populars.populars[showIndex], type);
      }
      if ((state.show && window.location.hash === `#/show/${id}`)) {
        state.favorites.addFavorite(state.show, type);
      }
    } else {
      state.favorites.deleteFavorite(parsedId, type);
    }
  }

  if (id && type === 'episode') {
    if (!Array.isArray(id)) {
      if (!state.favorites.isLiked(parsedId, type)) {
        state.favorites.addFavorite(parsedId, type);
      } else {
        state.favorites.deleteFavorite(parsedId, type);
      }
    }

    if (Array.isArray(id)) {
      const filteredIDs = id.filter(i => !state.favorites.isLiked(i, type));
      state.favorites.addFavorite(filteredIDs, type)
    }
    if (action === 'remove') {
      state.favorites.deleteFavorite(id, type);
    }

  }

  if (window.location.hash === '#favorites') {
    searchView.clearResults();
    searchView.renderResult(state.favorites.favoriteShows, 'Your favorites shows:');
  }


};
elements.mainContent.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn__fav--small', 'btn__fav--small *');

  if (btn) {
    e.preventDefault();
    const id = btn.parentNode.querySelector('.results-item__link').getAttribute('href').replace('#/show/', '');
    toggleFavBtn(e, 'btn__fav--small2');
    controlFavorites(id, 'show');
  }
});
// need to think about better logic because of doubled class inisde fav buttons
elements.mainContent.addEventListener('click', (e) => {
  const btn = document.querySelector('.btn__fav--big');

  if (btn && (e.target === btn)) {
    e.preventDefault();
    const id = window.location.hash.replace('#/show/', '');
    toggleFavBtn(e, 'btn__fav--big2');
    controlFavorites(id, 'show');
  }
});

elements.mainContent.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn__fav--watched', '.btn__fav--watched *');

  if (btn) {
    e.preventDefault();
    const id = e.target.dataset.episodeId;
    toggleFavBtn(e, 'btn__fav--watched2');
    controlFavorites(id, 'episode');
  }
});


elements.mainContent.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn__fav--watch-all', '.btn__fav--watch-all *');

  if (btn) {
    const allElements = document.querySelectorAll('[data-episode-id]');
    e.preventDefault();
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].classList.add('btn__fav--watched2');
      allElements[i].innerText = 'Watched';
    }
    const allIDs = Array.from(allElements).map(i => parseInt(i.dataset.episodeId, 10));
    controlFavorites(allIDs, 'episode');
  }
})

elements.mainContent.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn__fav--unwatch-all', '.btn__fav--unwatch-all *');

  if (btn) {
    const allElements = document.querySelectorAll('[data-episode-id]');
    e.preventDefault();
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].classList.remove('btn__fav--watched2');
      allElements[i].innerText = 'Unwatched';
    }
    const allIDs = Array.from(allElements).map(i => parseInt(i.dataset.episodeId, 10));
    controlFavorites(allIDs, 'episode', 'remove');
    //state.favorites.favoriteEpisodes = state.favorites.favoriteEpisodes.filter(i => allIDs.indexOf(i) === -1);

  }
})


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
    console.log(state.schedule.schedule);
    searchView.clearResults();
    searchView.renderResult(state.schedule.schedule, 'Upcoming Shows:');
  } catch (err) {
    console.log(err);
  }
};
  // UPCOMING BAR CONTROLLER

const controlUpcomingBar = () => {
  upcomingView.clearUpcoming();

  const sortedByAirdate = state.favorites.favoriteShows.sort((a, b) => {
    const aa = a.airdateInfo ? new Date(a.airdateInfo.airdate).getTime() : 0;
    const bb = b.airdateInfo ? new Date(b.airdateInfo.airdate).getTime() : 0;
    return aa - bb;
  });

  upcomingView.renderUpcoming(sortedByAirdate);
};


// ROUTER

['hashchange', 'load'].forEach(e => window.addEventListener(e, () => {
  console.log(state);
  const { hash } = window.location;
  const showRe = /^#\/show\/\w*/;
  window.scrollTo(0, 0);


  if (hash !== '') {
    renderMainTemplate();
    controlUpcomingBar();
  }
  elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    controlSearch();
  });

  switch (true) {
    case (hash === '#populars'):
      controlPopular();
      break;
    case (hash === '#favorites'):
      controlFavorites();
      break;
    case (hash === '#schedule'):
      controlSchedule();
      break;
    case (showRe.test(hash)):
      controlShow();
      break;
  }
}));
