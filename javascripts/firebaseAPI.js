let firebaseConfig = {};

// get databaseURL from API JSON file for posting data
const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
};

// newMoive.uid = uid; for functions that post and update database
// orderBy="uid"&equalTo="${uid}" to functions that retrive data from databse to narrow down the result

// POST
// newMovie: get the movie info that needs to add to the database
// then post the data to database
// then database return the unique key for data that are posted
const saveMoiveToWishlist = (newMoive) => {
  newMoive.uid = uid;

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
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
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

// DELETE
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

// UPDATE
const updateMovieToWatchedInDB = (updatedMovie,movieId) => {
  // add user id key to the updatedMovie object
  updatedMovie.uid = uid;

  return new Promise((resolve,reject) => {
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/movies/${movieId}.json`,
      data: JSON.stringify(updatedMovie),
    })
    // not acutally using the result that returns from DB
      .done((modifedMovie) => {
        resolve(modifedMovie);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

// Filter
// Query: where clause
const getWatchedMovies = () => {
  return new Promise((resolve,reject) => {
    const allMoviesArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allMoviesObj) => {
        if (allMoviesObj !== null) {
          Object.keys(allMoviesObj).forEach((fbKey) => {
            // filter for watched movies
            if (allMoviesObj[fbKey].isWatched) {
              allMoviesObj[fbKey].id = fbKey;
              allMoviesArray.push(allMoviesObj[fbKey]);
            };
          });
        };
        resolve(allMoviesArray);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const getWishlistMovies = () => {
  return new Promise((resolve,reject) => {
    const allMoviesArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allMoviesObj) => {
        if (allMoviesObj !== null) {
          Object.keys(allMoviesObj).forEach((fbKey) => {
            if (!allMoviesObj[fbKey].isWatched) {
              allMoviesObj[fbKey].id = fbKey;
              allMoviesArray.push(allMoviesObj[fbKey]);
            };
          });
        };
        resolve(allMoviesArray);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

/* Link data to user */
let uid = '';

const setUID = (newUID) => {
  uid = newUID;
};

module.exports = {
  saveMoiveToWishlist,
  setConfig,
  getAllMovies,
  deleteMovieFromDB,
  updateMovieToWatchedInDB,
  getWatchedMovies,
  getWishlistMovies,
  setUID,
};
