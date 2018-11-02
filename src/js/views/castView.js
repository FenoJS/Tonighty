import CastEmptyPhoto from '../../images/cast-placeholder.jpg';

export const renderCast = (cast) => {
  const el = document.querySelector('.show__cast-box');
  const markup = `
    <div class="cast">
      <img src="${cast.character.image ? cast.character.image.medium : CastEmptyPhoto}" alt="" class="cast__img"/>
      <div class="cast__info">
        <span class="cast__character">${cast.character.name}</span>
        <span class="cast__actor">(${cast.person.name})</span>
      </div>
    </div>
  `;
  el.insertAdjacentHTML('beforeend', markup);
};

export const renderCasts = (casts) => {
  casts.forEach(cast => renderCast(cast));
};