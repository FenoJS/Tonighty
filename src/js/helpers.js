export const getDateYYYYMMDD = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const mm = month < 10 ? '0' + month : month;
  const dd = day < 10 ? '0' + day : day;

  return `${year}-${mm}-${dd}`;
}


export const toggleFavBtn = (e, toggleSelector) => {
  console.log(e.target)
  e.target.classList.toggle(toggleSelector)

  if(e.target.innerText === 'Remove') {
    e.target.innerText = 'Add to favorites'
  } else {
    e.target.innerText = 'Remove'
  }

}

export const formatEpisodeNum = (num) => {
  if (num < 10) {
    return `0${num}`
  } else {
    return `${num}`
  }
}