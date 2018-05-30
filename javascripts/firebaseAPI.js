let firebaseConfig = {};

const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
};

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

module.exports = {
  saveMoiveToWishlist,
  setConfig,
};
