import Search from './models/Search';
import Show from './models/Show';
import Popular from './models/Popular';
import Favorites from './models/Favorites';
import Schedule from './models/Schedule';
import * as searchView from './views/searchView';
import * as showView from './views/showView';
import * as scheduleView from './views/scheduleView';
import * as upcomingBarView from './views/upcomingBarView';
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
  const btnPrev = e.target.closest('.btn__slider-show--prev');
  const btnNext = e.target.closest('.btn__slider-show--next');
  const seasonsBar = document.querySelector('.show__season-list');

  if (seasonsBar) {
    const moveBy = document.querySelector('.show__season-item').offsetWidth;
    const seasonsCount = seasonsBar.childNodes.length;

    if (btnPrev && state.show.seasonsBarPostion < 0) {
      state.show.seasonsBarPostion += moveBy;
      seasonsBar.style.transform = `translateX(${state.show.seasonsBarPostion}px)`;
    }
    if (btnNext && (((moveBy * seasonsCount) > seasonsBar.offsetWidth) && state.show.seasonsBarPostion > -Math.abs((moveBy * seasonsCount) - seasonsBar.offsetWidth))) {
      state.show.seasonsBarPostion -= moveBy;
      seasonsBar.style.transform = `translateX(${state.show.seasonsBarPostion}px)`;
    }
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
      if ((state.schedule && window.location.hash === '#schedule')) {
        const showIndex = state.schedule.schedule.findIndex(e => e.id === parsedId);
        console.log(showIndex)
        state.favorites.addFavorite(state.schedule.schedule[showIndex], type);
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
  console.log(e.target)
  if (btn) {
    e.preventDefault();
    const id = btn.dataset.showId;
    toggleFavBtn(e, 'btn__fav--small2');
    controlFavorites(id, 'show');
  }
});

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
  const btnWatch = e.target.closest('.btn__fav--watch-all', '.btn__fav--watch-all *');
  const btnUnwatch = e.target.closest('.btn__fav--unwatch-all', '.btn__fav--unwatch-all *');
  const allElements = document.querySelectorAll('[data-episode-id]');
  const allIDs = Array.from(allElements).map(i => parseInt(i.dataset.episodeId, 10));


  if (btnWatch) {
    e.preventDefault();
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].classList.add('btn__fav--watched2');
      allElements[i].innerText = 'Watched';
    }
    controlFavorites(allIDs, 'episode');
  }

  if (btnUnwatch) {
    e.preventDefault();
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].classList.remove('btn__fav--watched2');
      allElements[i].innerText = 'Unwatched';
    }
    controlFavorites(allIDs, 'episode', 'remove');
  }
});


window.addEventListener('load', () => {
  state.favorites = new Favorites();
  state.favorites.readStorage();
  state.favorites.refreshShowsAirdate();
});


// SCHEDULE CONTROLLER

const controlSchedule = async() => {
  const QueryDate = getDateYYYYMMDD();

  state.schedule = new Schedule();

  try {
    await state.schedule.getSchedule(QueryDate);
    const upcomingFav = state.favorites.favoriteShows;
    const upcomingSchedule = state.schedule.schedule;

    // Filter and remove duplicates before concat for perfromance http://jsben.ch/SnWS4
    const filteredAndMarged = upcomingFav.concat(upcomingSchedule.filter(i => upcomingFav.findIndex(e => e.id === i.id) === -1));
    const filteredWithAirdate = filteredAndMarged.filter(i => i.airdateInfo);

    const sortedByAirdate = filteredWithAirdate.sort((a, b) => {
      const aa = a.airdateInfo ? new Date(a.airdateInfo.airdate).getTime() : 1;
      const bb = b.airdateInfo ? new Date(b.airdateInfo.airdate).getTime() : 1;
      return aa - bb;
    });

    scheduleView.clearResults();
    scheduleView.renderResult(sortedByAirdate, 'Upcoming Shows:');
  } catch (err) {
    console.log(err);
  }
};
  // UPCOMING BAR CONTROLLER

const controlUpcomingBar = () => {
  upcomingBarView.clearUpcoming();

  const sortedByAirdate = state.favorites.favoriteShows.slice(0).sort((a, b) => {
    const aa = a.airdateInfo ? new Date(a.airdateInfo.airdate).getTime() : 0;
    const bb = b.airdateInfo ? new Date(b.airdateInfo.airdate).getTime() : 0;
    return aa - bb;
  });

  upcomingBarView.renderUpcoming(sortedByAirdate);

  // Upcoming bar infinite slider
  const UpcomingSlider = () => {
    const itemWidth = document.querySelector('.upcoming-bar__item').offsetWidth;
    const slider = document.querySelector('.upcoming-bar__list');
    const lastFourElements = Array.from(slider.childNodes).slice(-4)
    const sliderWidth = slider.offsetWidth;
    const itemsCount = slider.childNodes.length + 1;
    console.log(itemsCount)
    const direction = 1;
    let currentPosition = 1;

    slider.addEventListener('mouseover', () => {
      clearInterval(window.startSlider)
    })




    const moveSlider = (direction, itemWidth) => {
      const shouldResetCycle = !!(currentPosition === 0 || currentPosition === itemsCount);

      if (shouldResetCycle) {
        slider.style.transition = '';
        clearInterval(window.startSlider)
        currentPosition = (currentPosition === 0) ? itemsCount : 1;

        slider.style.transform = `translateX(${0}px)`;
        window.startSlider = setInterval(() => {
          moveSlider(direction, itemWidth);
        }, 30);
      }

      if (!shouldResetCycle) {
        clearInterval(window.startSlider)
        window.startSlider = setInterval(() => {
          moveSlider(direction, itemWidth);
        }, 3000);

        slider.style.transform = `translateX(${(currentPosition * -itemWidth)}px)`;
        slider.style.transition = '3s cubic-bezier(0.22, 0.21, 1, 1)';
        currentPosition += direction;
      }
    };

    if (itemsCount > 3) {
      const firstElement = slider.childNodes[0].cloneNode(true);
      const firstElement1 = slider.childNodes[1].cloneNode(true);
      const firstElement2 = slider.childNodes[2].cloneNode(true);
      const firstElement3 = slider.childNodes[3].cloneNode(true);
      slider.appendChild(firstElement);
      slider.appendChild(firstElement1)
      slider.appendChild(firstElement2)
      slider.appendChild(firstElement3)

      window.startSlider = setInterval(() => {
        moveSlider(direction, itemWidth);
      }, 100);
    }
    slider.addEventListener('mouseout', () => {
      window.startSlider = setInterval(() => {
        moveSlider(direction, itemWidth);
      }, 10);
    });
  };


  UpcomingSlider();
};


// ROUTER

['hashchange', 'load'].forEach(e => window.addEventListener(e, () => {
  console.log(state);
  const { hash } = window.location;
  const showRe = /^#\/show\/\w*/;
  window.scrollTo(0, 0);
  clearInterval(window.startSlider)


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
