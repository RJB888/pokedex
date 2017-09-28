'use strict';

const EXPRESS = require('express');
const PG = require('pg');
const PARSER = require('body-parser');

const APP = EXPRESS();
const CON_STRING = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';
const PORT = process.env.PORT || 3000;
const CLIENT = new PG.Client(CON_STRING);
CLIENT.connect();

APP.use(PARSER.json());
APP.use(PARSER.urlencoded({ extended: true }));
APP.use(EXPRESS.static('./public'));

APP.get('*', function(request, response){
  response.sendFile('index.html', {root: './public'});
});

APP.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
