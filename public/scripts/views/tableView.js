'use strict';

let temp = $('#table-row-template').html()
let render = Handlebars.compile(temp);
$.get('/api/allpokemon', result => {
	$('#results').append(result.rows.map(row => render(JSON.parse(row.data))))
})
