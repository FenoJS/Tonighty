export const renderCast = (cast) => {
  const el = document.querySelector('.show__cast-box');
  const markup = `
    <div class="cast">${cast}</div>
  `
  el.insertAdjacentHTML('beforeend', markup);
}