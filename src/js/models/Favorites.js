export default class Favorites {
  constructor() {
    this.favorites = [];
  }

  isLiked(id) {
    console.log(id, 'isliked')
    return this.favorites.findIndex(e => e.id === id) !== -1;
  }

  addFavorite(show) {
    console.log(show, 'show');
    this.favorites.push(show);
  }

  deleteFavorite() {
    
  }
}