const tmdb = require('./tmdb');

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

const initializer = () => {
  myLinks();
  pressEnter();
};

module.exports = {
  initializer,
};
