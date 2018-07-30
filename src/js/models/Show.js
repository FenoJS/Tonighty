import axios from 'axios';

export default class Show {
  constructor(id) {
    this.id = id;
  }

  async getShow() {
    try {
      const res = await axios(`http://api.tvmaze.com/shows/${this.id}?embed[]=episodes&embed[]=cast`);

      if (res.data._links.nextepisode) {
        const airdateInfo = await axios(res.data._links.nextepisode.href);
        this.airdate = airdateInfo.data.airdate;
      }
      console.log(res)
      this.img = res.data.image.original;
      this.name = res.data.name;
      this.description = res.data.summary.replace(/(<([^>]+)>)/ig, ''); // Remove <p> tag
      this.rating = res.data.rating.average;
      this.runtime = res.data.runtime;
      this.genres = res.data.genres.toString().replace(/,/g, ', ');
      this.episodes = res.data._embedded.episodes;
      this.episodes = res.data._embedded.cast;

    } catch (err) {
      console.log(err);
    }
  }
}