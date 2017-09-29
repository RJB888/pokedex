'use strict';

let temp = $('#table-row-template').html()
let render = Handlebars.compile(temp);
<<<<<<< HEAD
$.get('/api/allpokemon', result => {
=======
$.get('/api/allPokemon', result => {
>>>>>>> front-list
	$('#results').append(result.rows.map(row => render(JSON.parse(row.data))))
})
