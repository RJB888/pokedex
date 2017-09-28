'use strict';

const EXPRESS = require('express');
const PG = require('pg');
const PARSER = require('body-parser');
const PROXY = require('express-request-proxy');
const HTTP = require('http');

const APP = EXPRESS();
const CON_STRING = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';
const PORT = process.env.PORT || 3000;
const CLIENT = new PG.Client(CON_STRING);
CLIENT.connect();

APP.use(PARSER.json());
APP.use(PARSER.urlencoded({ extended: true }));
APP.use(EXPRESS.static('./public'));

APP.post('/api/new-pokemon', (request, response) => {
  console.log(request.body)
  CLIENT.query(`
    INSERT INTO pokemon
    (data)
    VALUES
    ($1);
  `, [request.body], function(err){
    if (err) console.error(err);
  })
})

APP.get('/api/allPokemon', (request, response) => {
  CLIENT
    .query(`SELECT * FROM pokemon`)
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
`);
