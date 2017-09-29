'use strict';

var app = app || {};

(function(module){
  let $searchbar = $('.searchbar');
  $searchbar.on('keypress', function(){
    console.log($searchbar.val());
  })
})(app)
