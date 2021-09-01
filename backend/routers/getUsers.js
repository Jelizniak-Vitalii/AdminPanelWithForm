const routerGetUsers = require('express').Router();

const Users = require('../models/users');

routerGetUsers.get('/getUsers', (req, res) => {

  Users.find((err,response) => {
    res.send(response)
  })

})

module.exports = routerGetUsers;
