const axios = require('axios');
const handleErrors=require('./errors');

async function weather (req, res) {
  try {
    let loc = req.query.loc;
    let url = (`https://api.weatherbit.io/v2.0/forecast/daily?city=${loc}&country=US&key=${process.env.WEATHER_API_KEY}`);
    let locForecast = await axios.get(url);
    let forecastArray = [];

    locForecast.data.data.forEach(day => {
      let weather = new Forecast(day);
      forecastArray.push(weather);
    });
    res.send(forecastArray);
  } catch(error) {
    handleErrors(error);
  }
}

class Forecast {
  constructor(value) {
    this.date = value.valid_date;
    this.description = value.description;
  }
}

module.exports = weather;
