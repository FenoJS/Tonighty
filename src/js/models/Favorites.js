import axios from 'axios';

export default class Favorites {
  constructor() {
    this.favoriteShows = [];
    this.favoriteEpisodes = [];
  }

  isLiked(id, type) {
    if (type === 'show') {
      return this.favoriteShows.findIndex(e => e.id === id) !== -1;
    }
    if (type === 'episode') {
      return this.favoriteEpisodes.findIndex(e => e === id) !== -1;
    }
  }

  static async getAirdate(show) {
    try {
      if (show._links && show._links.nextepisode) {
        const airdate = await axios(show._links.nextepisode.href);
        show.airdateInfo = airdate.data;
        return show;
      }
      return show; // ///////////???????????????????????////
    } catch (err) {
      console.log(err);
    }
  }

  async addFavorite(item, type) {
    if (type === 'show') {
      this.favoriteShows.push(await Favorites.getAirdate(item));
    }
    if (type === 'episode') {
      if (Array.isArray(item)) {
        this.favoriteEpisodes.push(...item);
      } else {
        this.favoriteEpisodes.push(item);
      }
    }

    // Persist data in localStorage
    this.persistData(type);
  }

  async refreshShowsAirdate() {
    this.favoriteShows.map(async(i) => {
      if (i.airdateInfo && (new Date(i.airdateInfo.airstamp).getTime() < new Date().getTime())) {
        const showData = await axios(`https://api.tvmaze.com/shows/${i.id}`);
        const index = this.favoriteShows.indexOf(i);
        const updatedShowAirdate = await Favorites.getAirdate(showData.data);
        this.favoriteShows[index].airdateInfo = updatedShowAirdate.airdateInfo;
        this.persistData('show');
      }
    });
  }

  deleteFavorite(id, type) {
    if (type === 'show') {
      const index = this.favoriteShows.findIndex(el => el.id === id);
      this.favoriteShows.splice(index, 1);
    }
    if (type === 'episode') {
      if (Array.isArray(id)) {
        id.map((i) => {
          const index = this.favoriteEpisodes.indexOf(i);
          return this.favoriteEpisodes.splice(index, 1);
        });
      } else {
        const index = this.favoriteEpisodes.findIndex(el => el === id);
        this.favoriteEpisodes.splice(index, 1);
      }
    }

    // Persist data in localStorage
    this.persistData(type);
  }

  persistData(type) {
    if (type === 'show') {
      localStorage.setItem('favoriteShows', JSON.stringify(this.favoriteShows));
    }
    if (type === 'episode') {
      localStorage.setItem('favoriteEpisodes', JSON.stringify(this.favoriteEpisodes));
    }
  }


  readStorage() {
    const storageShows = JSON.parse(localStorage.getItem('favoriteShows'));
    const storageEpisodes = JSON.parse(localStorage.getItem('favoriteEpisodes'));

    // Restore likes from the localStorage
    if (storageShows) this.favoriteShows = storageShows;
    if (storageEpisodes) this.favoriteEpisodes = storageEpisodes;
  }
}