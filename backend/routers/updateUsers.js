const routerUpdateUsers = require('express').Router();

const Users = require('../models/users');

routerUpdateUsers.post('/updateUsers', (req, res) => {
  const { userName, firstName, lastName, selectStatus, password, email, id } = req.body;
  Users.findOne({userName}, (error, user) =>{
    if(user && id !== user.id) {
     return res.status(400).send({ response: 'User name already exist' }) }
      Users.findOneAndUpdate({userName},
        { $set: { userName, firstName, lastName, selectStatus, password, email } },
  {new: true}, function(err, result) {
          if(err) {
            return  res.status(404).send({ response: 'Server error' });
          }
          res.send({ response: 'User is update' })
        })
  })
})

module.exports = routerUpdateUsers;
