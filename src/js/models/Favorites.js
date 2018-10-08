import axios from 'axios';

export default class Favorites {
  constructor() {
    this.favorites = [];
  }

  isLiked(id) {
    console.log(id, 'isliked')
    return this.favorites.findIndex(e => e.id === id) !== -1;
  }

  static async getAirdate(show) {
    try {
      if (show._links && show._links.nextepisode) {
        const airdate = await axios(show._links.nextepisode.href)
        show.airdateInfo = airdate.data;
        return show;
      }
      return show; // ///////////???????????????????????////
    } catch (err) {
      console.log(err)
    }
  }

  async addFavorite(show) {
    console.log(show, 'show');
    this.favorites.push(await Favorites.getAirdate(show));

    // Persist data in localStorage
    this.persistData();
  }

  deleteFavorite(id) {
    const index = this.favorites.findIndex(el => el.id === id);
    this.favorites.splice(index, 1);

    // Persist data in localStorage
    this.persistData();
  }

  persistData() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('favorites'));

    // Restore likes from the localStorage
    if (storage) this.favorites = storage;
  }
}