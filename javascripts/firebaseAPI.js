let firebaseConfig = {};

// get databaseURL from API JSON file for posting data
const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
};

// POST
// newMovie: get the movie info that needs to add to the database
// then post the data to database
// then database return the unique key for data that are posted
const saveMoiveToWishlist = (newMoive) => {
  return new Promise((resolve,reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/movies.json`,
      data: JSON.stringify(newMoive),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

// GET
// get key from firebase database
// push the keys to an array
const getAllMovies = () => {
  return new Promise((resolve,reject) => {
    const allMoviesArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json`,
    })
      .done((allMoviesObj) => {
        if (allMoviesObj !== null) {
          Object.keys(allMoviesObj).forEach((fbKey) => {
            allMoviesObj[fbKey].id = fbKey;
            allMoviesArray.push(allMoviesObj[fbKey]);
          });
        };
        resolve(allMoviesArray);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const deleteMovieFromDB = (movieId) => {
  return new Promise((resolve,reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/movies/${movieId}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail((err) => {
        reject(err);
      });
  });
};

module.exports = {
  saveMoiveToWishlist,
  setConfig,
  getAllMovies,
  deleteMovieFromDB,
};
