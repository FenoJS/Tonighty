import axios from 'axios';

export default class Popular {
  constructor(page) {
    this.page = page;
  }

  async getPopular() {
    try {
      const res = await axios(`http://api.tvmaze.com/shows`);
      console.log(res)
      this.populars = res.data;
    } catch (err) {
      console.log(err)
    }
  }
}
