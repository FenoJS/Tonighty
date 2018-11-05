export const getDateYYYYMMDD = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const mm = month < 10 ? `0${month}` : month;
  const dd = day < 10 ? `0${day}` : day;

  return `${year}-${mm}-${dd}`;
};


export const toggleFavBtn = (e, toggleClass) => {
  e.target.classList.toggle(toggleClass);

  switch (true) {
    case (e.target.innerText === 'Remove'):
      e.target.innerText = 'Add to favorites';
      break;
    case (e.target.innerText === 'Add to favorites'):
      e.target.innerText = 'Remove';
      break;
    case (e.target.innerText === 'Unwatched'):
      e.target.innerText = 'Watched';
      break;
    case (e.target.innerText === 'Watched'):
      e.target.innerText = 'Unwatched';
      break;
  };
};

export const formatEpisodeNum = (num) => {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
};
