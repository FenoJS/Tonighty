import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    try {
      const res = await axios(`http://api.tvmaze.com/search/shows?q=${this.query}`);
      this.result = res.data.map(item => item.show);
    } catch (err) {
      console.log(err);
    }
  }
}