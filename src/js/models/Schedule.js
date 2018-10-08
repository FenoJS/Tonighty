import axios from 'axios';

export default class Schedule {
  constructor() {
    this.schedule = []
  }

  async getSchedule(date) {
    try {
      const res = await axios(`http://api.tvmaze.com/schedule?country=US&date=${date}`)
      console.log(res.data)
      this.schedule = res.data.map(item => item.id )
    } catch (err){
      console.log(err)
    }
  }
}