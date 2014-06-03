var config = require('./config');
var Schema = require('jugglingdb').Schema;
var schema = new Schema('postgres', {
  database: 'node-orm-roundup',
  host: 'localhost'
});
var Users = schema.define('users', {
  id: String,
  email: String
});

function create() {
  Users.create({
    email: 'test@example.com'
  }, update);
}

function update(err, user) {
  user.email = 'test2@example.com';
  user.save(show); // Throws 'Error: id is not a number' is current version
}

function show(err, user) {
  Users.all(print);
}

function error(errorMessage) {
  console.error(errorMessage);
}

function print(err, result) {
  console.log(result);
  process.exit();
}

schema.adapter
  .query(config.setupString, create);
