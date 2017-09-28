'use strict';

var app = app || {};

(function(module){
  let homeController = {};

  homeController.index = function(){
    // send a get request to the pokemon api if and only if our database doesn't have information already
    $.get('/api/allPokemon')
      .then(function(result){
        if (result.rowCount === 0) {
          $.get('https://pokeapi.co/api/v2/pokemon/?limit=10', function(response){
            response.results.forEach(function(item){
              $.get(item.url)
                .then(function(response){
                  let wanted = {};
                  wanted.name = response.name;
                  wanted.id = response.id;
                  wanted.sprites = {
                    front: response.sprites.front_default,
                    back: response.sprites.back_default
                  }
                  wanted.types = response.types.map(type => type.type.name)
                  $.post('/api/new-pokemon', wanted)
                  .then(function(){console.log(`${response.name} inserted!`)})
                })
            })
          })
        }
      });
  }

  module.homeController = homeController;
})(app)
