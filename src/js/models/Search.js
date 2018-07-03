import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    try {
      const res = await axios(`https://www.episodate.com/api/search?q=${this.query}`);
      this.result = res.data.tv_shows;
    } catch (err) {
      console.log(err);
    }
  }
}