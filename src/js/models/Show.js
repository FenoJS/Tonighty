import axios from 'axios';

export default class Show {
  constructor(id) {
    this.id = id;
  }

  async getShow() {
    try {
      console.log(this.id)
      const res = await axios(`http://api.tvmaze.com/shows/${this.id}?embed[]=episodes&embed[]=cast`);
      this.img = res.data.image.original;
      this.name = res.data.name;
      this.description = res.data.summary.replace(/(<([^>]+)>)/ig, ''); // Remove <p> tag
      this.rating = res.data.rating.average;
      this.runtime = res.data.runtime;
      this.genres = res.data.genres.toString().replace(/,/g, ', ');
    } catch (err) {
      console.log(err);
    }
  }
}