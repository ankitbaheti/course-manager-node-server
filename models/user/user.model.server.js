var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials, {username: 1, type: 1});
}

function findUserByUsername(user) {
    return userModel.findOne(user, {username: 1});
}

function update(id, newUser) {
  return userModel.updateOne(id, newUser)
}

function findUserById(userId) {
  return userModel.findOne(userId);
}

function createUser(user) {
  return userModel.create(user);
}

function findAllUsers() {
  return userModel.find();
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    update: update
};

module.exports = api;