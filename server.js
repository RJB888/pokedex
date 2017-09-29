'use strict';

const EXPRESS = require('express');
const PG = require('pg');
const PARSER = require('body-parser');
const PROXY = require('express-request-proxy');
const HTTP = require('http');
const REQUEST_LIB = require('request');

const APP = EXPRESS();
const CON_STRING = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';
const PORT = process.env.PORT || 3000;
const CLIENT = new PG.Client(CON_STRING);
CLIENT.connect();

APP.use(PARSER.json());
APP.use(PARSER.urlencoded({ extended: true }));
APP.use(EXPRESS.static('./public'));

APP.post('/api/new-pokémon', (request, response) => {
  console.log(request.body)
  CLIENT.query(`
    INSERT INTO pokémon
    (data)
    VALUES
    ($1);
  `, [request.body], function(err){
    if (err) console.error(err);
  })
})

APP.get('/api/allPokemon', (request, response) => {
  CLIENT
    .query(`SELECT * FROM pokémon`)
    .then(function(result) {
      response.send(result);
    })
    .catch(console.error);
})

APP.get('*', function(request, response){
  response.sendFile('index.html', {root: './public'});
});

APP.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
  console.log(`Current connected to this database: ${CON_STRING}`)
});

CLIENT.query(`
  CREATE TABLE IF NOT EXISTS pokemon (
    id SERIAL PRIMARY KEY,
    data VARCHAR(500)
  );
`).then(() => {
  CLIENT.query(`SELECT * FROM pokemon;`).then((result) => {
    if (!result.rowCount) {
      for (let i = 1; i < 152; i++) {
        REQUEST_LIB(`https://pokeapi.co/api/v2/pokemon/${ i }`, function(err, response, body){
          console.log(`Processing response for pokemon with ID ${ i }`);
          if (!body.includes('504: Gateway time-out')) {
            body = JSON.parse(body);
            let wanted = {};
            wanted.name = body.name;
            wanted.id = body.id;
            wanted.sprites = {
              front: body.sprites.front_default,
              back: body.sprites.back_default
            }
            wanted.types = body.types.map(type => type.type.name)
            CLIENT.query(`INSERT INTO pokemon (data) VALUES ($1)`, [wanted]);
          }
        })
      }
    }
  });
}
);
