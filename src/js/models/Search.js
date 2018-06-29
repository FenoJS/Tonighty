import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    try {
      const res = await axios(`http://api.tvmaze.com/search/shows?q=${this.query}`);
      this.result = res.data;
    } catch (err) {
      console.log(err);
    }
  }
}