import axios from 'axios';

export default class Show {
  constructor(id) {
    this.id = parseInt(id, 10);
  }

  async getShow() {
    try {
      const res = await axios(`http://api.tvmaze.com/shows/${this.id}?embed[]=episodes&embed[]=cast`);

      if (res.data._links.nextepisode) {
        const airdateInfo = await axios(res.data._links.nextepisode.href);
        this.airdateInfo = airdateInfo.data;
      }
      console.log(res)
      this.image = res.data.image;
      this.name = res.data.name;
      this.description = res.data.summary.replace(/(<([^>]+)>)/ig, ''); // Remove <p> tag
      this.rating = res.data.rating.average;
      this.network = res.data.network;
      this.runtime = res.data.runtime;
      this.genres = res.data.genres.toString().replace(/,/g, ', ');
      this.episodes = res.data._embedded.episodes;
      this.cast = res.data._embedded.cast;


    } catch (err) {
      console.log(err);
    }
  }
}