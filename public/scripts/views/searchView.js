'use strict';

var app = app || {};

(function(module){
  let $searchbar = $('.searchbar');
  $searchbar.on('keyup', function(){
    let searchString = $searchbar.val().trim();
    // take the searchString value and compare it to the name value of each pokemon.
    let filteredIn = $('.anything').toArray().filter(function(row){
      return row.id.includes(searchString);
    });
    let filteredOut = $('.anything').toArray().filter(function(row){
      return !row.id.includes(searchString);
    });
    $(filteredIn).show();
    $(filteredIn).each((idx, item) => {
      $(item).next().show()
    });
    $(filteredOut).hide();
    $(filteredOut).each((idx, item) => {
      $(item).next().hide()
    });
  })
})(app)
