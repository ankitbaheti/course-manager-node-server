module.exports = function (app) {
  app.get('/api/user', findAllUsers);
  app.get('/api/user/:userId', findUserById);
  app.post('/api/user', createUser);
  app.get('/api/profile', profile);
  app.post('/api/logout', logout);
  app.post('/api/login', login);
  app.put('/api/update', update);

  var userModel = require('../models/user/user.model.server');

  function login(req, res) {
    var credentials = req.body;
    userModel
      .findUserByCredentials(credentials)
      .then(function(user) {
        if(user === null){
          res.status(500).send();
        }
        else{
            req.session['currentUser'] = user;
            res.json(user);
        }
      })
  }

  function update(req, res) {
      var newUser = req.body;
      userModel.update({_id: req.session['currentUser']._id}, newUser)
          .then(function (user) {
              res.json(user);
          })
  }

  function logout(req, res) {
    req.session.destroy();
    res.send(200);
  }

  function findUserById(req, res) {
    var id = req.params['userId'];
    userModel.findUserById({_id: id})
      .then(function (user) {
        res.json(user);
      })
  }

  function profile(req, res) {
      if(req.session['currentUser'] === undefined)
          res.send(500);
      else{
          var id = req.session['currentUser']._id;
          userModel.findUserById({_id: id})
              .then(function (user) {
                  res.json(user);
              })
      }
  }

  function createUser(req, res) {
    var user = req.body;
      var username = {
      username: user.username
      }
    userModel.findUserByUsername(username)
        .then(function (user1) {
            if(user1 === null){
                userModel.createUser(user)
                    .then(function (user) {
                        req.session['currentUser'] = user;
                        res.send(user);
                    })
            }
            else {
                res.status(500).send();
            }
        })

  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }
}
