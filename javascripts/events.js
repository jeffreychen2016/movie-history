/* eslint camelcase: 0 */

const tmdb = require('./tmdb');
const firebaseAPI = require('./firebaseAPI');
const dom = require('./dom');

const myLinks = (e) => {
  $(document).click((e) => {
    if (e.target.id === 'authBtn') {
      $('#authScreen').removeClass('hide');
      $('#myMovies').addClass('hide');
      $('#search').addClass('hide');
    } else if (e.target.id === 'myMoviesBtn') {
      $('#authScreen').addClass('hide');
      $('#myMovies').removeClass('hide');
      $('#search').addClass('hide');

      getAllMoviesEvent();

    } else if (e.target.id === 'searchBtn') {
      $('#authScreen').addClass('hide');
      $('#myMovies').addClass('hide');
      $('#search').removeClass('hide');
    };
  });
};

const pressEnter = () => {
  $(document).keypress((e) => {
    // if (e.key === 'Enter'  && $('#searchBar').hasClass('hide')) {
    if (e.key === 'Enter') {
      const searchWords = $('#searchBar').val().replace(' ','%20');
      tmdb.showResults(searchWords);
    };
  });
};

// get data from the card that being clicked
// then build the object that will be passed into saveMoiveToWishlist
// if successfully add the movie to database, then remove that movie
const saveMovieToWishlistEvent = () => {
  $(document).on('click', '.addMovieToWishlist', (e) => {
    const movieToAddCard = $(e.target).closest('.movie');
    const movieToAdd = {
      original_title: movieToAddCard.find('.movie-title').text(),
      overview: movieToAddCard.find('.movie-overview').text(),
      poster_path: movieToAddCard.find('img').data('poster'),
      rating: 0,
      isWatched: false,
    };

    firebaseAPI.saveMoiveToWishlist(movieToAdd)
      .then(() => {
        movieToAddCard.remove();
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

const getAllMoviesEvent = () => {
  firebaseAPI.getAllMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray,tmdb.getImageConfig(),'savedMovies',true);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getWatchedMoviesEvent = () => {
  firebaseAPI.getWatchedMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray,tmdb.getImageConfig(),'savedMovies',true);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getWishlistMoviesEvent = () => {
  firebaseAPI.getWishlistMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray,tmdb.getImageConfig(),'savedMovies',true);
    })
    .catch((err) => {
      console.error(err);
    });
};

// DELETE
const deleteMovieFromFirebase = () => {
  $(document).on('click','.deleteMovieFromColeectionEvent', (e) => {
    const movieToDeleteId = $(e.target).closest('.movie').data('firebaseId');
    firebaseAPI.deleteMovieFromDB(movieToDeleteId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

const updateMovieEvent = () => {
  $(document).on('click','.updateMovieToWatched',(e) => {
    const movieToUpdateCard = $(e.target).closest('.movie');
    const updatedMovie = {
      original_title: movieToUpdateCard.find('.movie-title').text(),
      overview: movieToUpdateCard.find('.movie-overview').text(),
      poster_path: movieToUpdateCard.find('img').data('poster'),
      rating: 0,
      isWatched: true,
    };

    const movieToUpdatedId = $(e.target).closest('.movie').data('firebaseId');
    firebaseAPI.updateMovieToWatchedInDB(updatedMovie,movieToUpdatedId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

const filterEvents = () => {
  $('#filterButtons').on('click',(e) => {
    const classList = e.target.classList;
    if (classList.contains('wishlist')) {
      // show only if isWatched: false
      getWishlistMoviesEvent();
    } else if (classList.contains('watched')) {
      // show only if isWatched: true
      getWatchedMoviesEvent();
    } else {
      // show everything
      getAllMoviesEvent();
    };
  });
};

const authEvents = () => {
  $('#signin-btn').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const pass = $('#inputPassword').val();
    // calling auth services of firebase
    // pass in email and password
    // firebase will return a promise
    firebase.auth().signInWithEmailAndPassword(email, pass)
      // not using returned user object
      // do not need .then here since it is managed by the auth state changing
      // in checkLoginStatus *******

      // .then((user) => {
      //   $('#authScreen').addClass('hide');
      //   $('#myMovies').removeClass('hide');
      //   $('#search').addClass('hide');
      //   getAllMoviesEvent();
      // })
      .catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        // ...
      });
  });

  // Registration
  // firebase will automatically log in after a new account is created
  // the changeState function is taking care of the .then()
  $('#register-btn').click(() => {
    const email = $('#registerEmail').val();
    const pass = $('#registerPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch((error) => {
      // Handle Errors here.
      // var errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
      // ...
    });
  });

  // switch to registration page
  $('#register-link').click((e) => {
    $('#login-form').addClass('hide');
    $('#registration-form').removeClass('hide');
  });

  // switch to log in page
  $('#signin-link').click((e) => {
    $('#login-form').removeClass('hide');
    $('#registration-form').addClass('hide');
  });

  // log out
  $('#logoutBtn').click((e) => {
    firebase.auth().signOut().then(() => {
    // Sign-out successful.
    // move this code to auth module -------

    }).catch((error) => {
      console.error(error);
    });
  });
};

const initializer = () => {
  myLinks();
  pressEnter();
  saveMovieToWishlistEvent();
  deleteMovieFromFirebase();
  updateMovieEvent();
  filterEvents();
  authEvents();
};

module.exports = {
  initializer,
  getAllMoviesEvent,
};
