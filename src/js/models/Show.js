import axios from 'axios';

export default class Show {
  constructor(id) {
    this.id = id;
  }

  async getShow() {
    try {
      console.log(this.id)
      const res = await axios(`https://www.episodate.com/api/show-details?q=${this.id}`);
      console.log(res)
      this.img = res.data.tvShow.image_path;
      this.name = res.data.tvShow.name;
      this.description = res.data.tvShow.description;
      this.rating = res.data.tvShow.rating;
      this.runtime = res.data.tvShow.runtime;
      this.genres = res.data.tvShow.genres;
    } catch (err) {
      console.log(err);
    }
  }
}