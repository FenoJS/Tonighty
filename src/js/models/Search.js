import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    try {
      const res = await axios(`http://api.tvmaze.com/search/shows?q=${this.query}`);
      // remodel respond from api
      this.result = res.data.map((item) => {
        const newArr = item.show;
        return newArr;
      });
    } catch (err) {
      console.log(err);
    }
  }
}