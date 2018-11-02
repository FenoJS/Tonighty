import axios from 'axios';

export default class Schedule {
  constructor() {
    this.schedule = [];
  }

  async getSchedule(date) {
    try {
      const res = await axios(`http://api.tvmaze.com/schedule?country=US&date=${date}`);
      console.log(res.data);
      // Get only TV Series and Get rid of talk-shows(90% of api respond)
      res.data.map((item) => {
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