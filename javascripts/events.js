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

const initializer = () => {
  myLinks();
  pressEnter();
  saveMovieToWishlistEvent();
  deleteMovieFromFirebase();
  updateMovieEvent();
};

module.exports = {
  initializer,
};
