/* eslint camelcase: 0 */

const dom = require('./dom');

let tmdbKey = '';

const setKey = (key) => {
  tmdbKey = key;
};

const searchTMDB = (txt) => {
  return new Promise((resolve,reject) => {
    $.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&query=${txt}&page=1&include_adult=false`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

// const singleMovie = {
//   adult: false,
//   backdrop_path: '/c2Ax8Rox5g6CneChwy1gmu4UbSb.jpg',
//   genre_ids: [28, 12, 878, 14,],
//   id: 140607,
//   original_language: 'en',
//   original_title: 'Star Wars: The Force Awakens',
//   overview: 'Thirty years after defeating the Galactic Empire, Han Solo and his allies face a new threat from the evil Kylo Ren and his army of Stormtroopers.',
//   popularity: 49.408373,
//   poster_path: '/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg',
//   release_date: '2015-12-15',
//   title: 'Star Wars: The Force Awakens',
//   video: false,
//   vote_average: 7.5,
//   vote_count: 7965,
// };

const showResults = (searchText) => {
  // dom.domString([singleMovie,singleMovie,singleMovie,singleMovie,]);
  searchTMDB(searchText)
    .then((result) => {
      dom.domString(result.results);
    })
    .catch((err) => {
      console.error('search error',err);
    });
};

module.exports = {
  showResults,
  setKey,
};
