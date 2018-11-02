export const getDateYYYYMMDD = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const mm = month < 10 ? `0${month}` : month;
  const dd = day < 10 ? `0${day}` : day;

  return `${year}-${mm}-${dd}`;
};


export const toggleFavBtn = (e, toggleSelector) => {
  console.log(e.target);
  e.target.classList.toggle(toggleSelector);

  if (e.target.innerText === 'Remove') {
    e.target.innerText = 'Add to favorites';
  } else {
    e.target.innerText = 'Remove';
  }
};

export const formatEpisodeNum = (num) => {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
};

export const seasonsBarSlider = (e) => {
  const btnPrev = e.target.closest('.btn__slider--prev');
  const btnNext = e.target.closest('.btn__slider--next');
  const moveBy = document.querySelector('.show__season-item').offsetWidth;
  const seasonsBar = document.querySelector('.show__season-list');

  if (btnPrev) {
    state.show.seasonsBarPostion += moveBy;
    seasonsBar.style.transform = `translateX(${state.show.seasonsBarPostion}px)`;
  }
  if (btnNext) {
    state.show.seasonsBarPostion -= moveBy;
    seasonsBar.style.transform = `translateX(${state.show.seasonsBarPostion}px)`;
  }
}