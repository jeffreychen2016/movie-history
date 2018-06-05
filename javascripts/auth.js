// function extracting
// getAllMoviesEvent is the key of the object
// only bring in what is useful for this file
// example of bringing in multi functions {function1, function2} = require('./');
const {getAllMoviesEvent,} = require('./events');

// monitor state change
const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      // move it from log in event *******
      $('#myMoviesBtn,#searchBtn,#logoutBtn').removeClass('hide');
      $('#authBtn').addClass('hide');

      $('#myMovies').removeClass('hide');
      $('#authScreen').addClass('hide');
      $('#search').addClass('hide');
      getAllMoviesEvent();
    } else {
      // No user is signed in.
      // move it from log out event ------
      $('#logoutBtn,#myMoviesBtn,#searchBtn').addClass('hide');
      $('#authBtn').removeClass('hide');

      $('#authScreen').removeClass('hide');
      $('#myMovies').addClass('hide');
      $('#search').addClass('hide');
    };
  });
};

module.exports = {
  checkLoginStatus,
};
