const tmdb = require('./tmdb');
const firebaseAPI = require('./firebaseAPI');
const {checkLoginStatus,} = require('./auth');

const apiKeys = () => {
  return new Promise((resolve,reject) => {
    $.ajax('../db/apiKeys.json')
      .done((data) => {
        resolve(data.apiKeys);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const retrieveKeys = () => {
  apiKeys()
    .then((results) => {
      tmdb.setKey(results.tmdb.apiKey);
      firebaseAPI.setConfig(results.firebase);
      // passing the object from API file to initialize the firebase
      firebase.initializeApp(results.firebase);
      // this function rely has to be called after firebase is intialized
      checkLoginStatus();
    })
    .catch((err) => {
      console.error('no keys:',err);
    });
};

module.exports = {
  retrieveKeys,
};
