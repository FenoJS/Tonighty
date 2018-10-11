export const renderCast = (cast) => {
  const el = document.querySelector('.show__cast');
  const markup = `
    <div class="cast">${cast}</div>
  `
  el.insertAdjacentHTML('beforeend', markup);
}

export const renderCasts = (casts) => {
  casts.forEach(cast => renderCast(cast));
};