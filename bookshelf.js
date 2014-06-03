var Bookshelf = require('bookshelf');
var config = require('./config.json');
var db = Bookshelf.initialize({
  client: 'pg',
  connection: 'postgres://localhost/node-orm-roundup'
});
var Users = db.Model.extend({
  tableName: 'users'
});

function create() {
  return new Users({
    email: 'test@example.com'
  }).save();
}

function update(user) {
  return user.save({
    email: 'test2@example.com'
  });
}

function show() {
  return Users.collection().fetchOne();
}

function error(errorMessage) {
  console.error(errorMessage);
}

function print(result) {
  console.log(result);
}

db.knex
  .raw(config.setupString)
  .then(create, error)
  .then(update, error)
  .then(show, error)
  .then(print, error)
  .then(process.exit);
