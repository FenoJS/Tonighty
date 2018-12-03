import axios from 'axios';

export default class Schedule {
  constructor() {
    this.schedule = [];
  }

  async getSchedule(date) {
    try {
      const res = await axios(`https://api.tvmaze.com/schedule?country=US&date=${date}`);
      console.log(res.data);

      res.data.map((item) => {
        // Get only TV Series without talk-shows etc.(90% of api respond)
        if (item.show.type === 'Scripted') {
          item.show.airdateInfo = {
            airdate: item.airdate,
            airstamp: item.airstamp,
            airtime: item.airtime,
            id: item.id,
            image: item.image,
            name: item.name,
            number: item.number,
            runtime: item.runtime,
            season: item.season,
          };
          return this.schedule.push(item.show);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}