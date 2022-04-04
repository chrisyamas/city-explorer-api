const axios = require('axios');
const handleErrors=require('./errors');

async function movie(req,res) {
  try {
    let loc = req.query.loc;
    let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${loc}&total_results=5`);
    let films = await axios.get(url);
    let filmsArray = [];

    films.data.results.forEach(flick => {
      let film = new Film(flick);
      filmsArray.push(film);
    });
    res.send(filmsArray);
  } catch(error) {
    handleErrors(error);
  }
}

class Film{
  constructor(value) {
    this.image_url=value.image_url;
    this.title=value.title;
    this.overview=value.overview;
    this.popularity=value.popularity;
    this.released_on.value.released_on;
  }
}

module.exports=movie;
