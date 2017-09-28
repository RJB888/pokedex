'use strict';

var app = app || {};

(function(module){
  let homeController = {};

  homeController.index = function(){
    // send a get request to the pokemon api if and only if our database doesn't have information already
    $.get('/api/allPokemon')
      .then(function(result){
        if (result.rowCount === 0) {
          console.log('Talking to pokeapi');
          $.get('https://pokeapi.co/api/v2/pokemon/?limit=20', function(response){
            console.log(`Requesting each pokemon's info`);
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
                  console.log(wanted)
                  $.post('/api/new-pokemon', wanted)
                })
            })
          })
        }
      });
  }

  module.homeController = homeController;
})(app)
