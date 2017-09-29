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
    $('.anything').on('click', function(){
      let idVal = $(this).find('.id span').text();
      let theMon = app.allTheMons.filter(function(item){
        return parseInt(idVal) === item.id;
      })[0]
      $('.sprites img').eq(0).attr('src', theMon.sprites.front);
      $('.sprites img').eq(1).attr('src', theMon.sprites.back);
      $('#mon-id').text(`id: ${theMon.id}`);
      $('#mon-name').text(`name: ${theMon.name}`);
      $('#mon-type').text(`types: ${theMon.types}`);
    })
  });
})(app)
