var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://localhost/node-orm-roundup');
sequelize.options.logging = false;
var config = require('./config.json');
var Users = sequelize.define('users', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  email: Sequelize.STRING,
});

function create() {
  return Users.create({
    email: 'test@example.com'
  });
}

function update() {
  return Users.update({
    email: 'test2@example.com'
  });
}

function show() {
  return Users.findAll();
}

function error(errorMessage) {
  console.error(errorMessage);
}

function print(result) {
  console.log(result);
}

sequelize
  .query(config.setupString)
  .then(create, error)
  .then(update, error)
  .then(show, error)
  .then(print, error)
  .then(process.exit);
