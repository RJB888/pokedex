'use strict';

var app = app || {};

(function(module){
  let temp = $('#table-row-template').html();
  let render = Handlebars.compile(temp);
  $.get('/api/allpokemon', result => {
    app.allTheMons = result.rows
                            .map(row => JSON.parse(row.data))
                            .sort(function(monster1, monster2){
                              return monster1.id - monster2.id;
                            });
    $('#results').append(
			app.allTheMons.map(oneCharacter => render(oneCharacter))
		);
  });
})(app)
