var Knex = require('knex');
var config = require('./config.json');
var db = Knex.initialize({
  client: 'pg',
  connection: 'postgres://localhost/node-orm-roundup'
});

function create() {
  return db('users').insert({
    'email': 'test@example.com'
  });
}

function update() {
  return db('users').update({
    'email': 'test2@example.com'
  });
}

function show() {
  return db('users').select();
}

function error(errorMessage) {
  console.error(errorMessage);
}

function print(result) {
  console.log(result);
}

db
  .raw(config.setupString)
  .then(create, error)
  .then(update, error)
  .then(show, error)
  .then(print, error)
  .then(process.exit);
