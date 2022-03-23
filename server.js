'use strict';

// REQUIRE
// In our servers, we have to use 'require' instead of import. Here we will list the requirements for server.
const express = require('express');
require('dotenv').config();

let weatherData = require('./data/weather.json');

// We must include cors if we want to share resources over the web
const cors = require('cors');

// USE
// Once we have required something, we have to use it. This is where we assign the required field a variable. React does this in one step with "import". express takes 2 steps: 'require' and 'use'.
const app = express();
app.use(cors());


// define PORT and validate that my .env file is working
const PORT = process.env.PORT || 3002;
// if server is running on 3002, then something is wrong with .env file or how the values are being imported from it

// ROUTES
// We will write our endpoints here
// app.get() correlates to axios.get

app.get('/weather', (req, res) => {
  try {
    let location = req.query.location;
    let weatherLocat = weatherData.find(city => city.city_name === location);

    let forecastArray = [];

    weatherLocat.data.forEach(date => {
      let weatherForecast = new Forecast(date);
      forecastArray.push(weatherForecast);
    });

    res.send(forecastArray);

  } catch(error) {
    res.send(error.message);
  }
});

app.get('*', (req, res) => {
  res.send('What you are looking for doesn\'t exist.');
});


// ERROR HANDLING
// handle errors
app.use((error, req, res,) => {
  res.status(500).send(error.message);
});

// CLASSES
class Forecast {
  constructor(forecastObject) {
    this.date = forecastObject.valid_date;
    this.description = forecastObject.weather.description;
  }
}

// LISTEN
// start the server
// listen is an Express method that takes in a port value and a callback function
app.listen(PORT, () =>
  console.log(`listening on port ${PORT}`));
