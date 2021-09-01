const routerCreateNewUsers = require('express').Router();

const Users = require('../models/users');

routerCreateNewUsers.post('/createNewUsers', (req, res) => {
  const data = req.body;

  const newUser = new Users(data);

  Users.findOne({userName: data.userName}, (error, user) =>{
    if(user) {
     return res.status(400).send({ response: 'User name already exist' }) }
      newUser.save(function (err, user) {
        if(err) {
         return res.status(404).send(err);
        }
         res.send({ response: 'User is created' })
      })
  })
})

module.exports = routerCreateNewUsers;
