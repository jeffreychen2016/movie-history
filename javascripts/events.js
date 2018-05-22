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

module.exports = {
  myLinks,
};
