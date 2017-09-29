'use strict';

var app = app || {};

(function(module){
  let temp = $('#table-row-template').html();
  let render = Handlebars.compile(temp);
  $.get('/api/allpokemon', result => {
    app.allTheMons = result.rows.map(row => JSON.parse(row.data));
    $('#results').append(
			result.rows.map(row => render(JSON.parse(row.data)))
		);
  });
})(app)
