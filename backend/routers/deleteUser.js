const routerDeleteUsers = require('express').Router();

const Users = require('../models/users');

routerDeleteUsers.post('/deleteUsers', (req, res) => {
  const { id } = req.body;

  Users.deleteOne({ _id: id }).exec((err, { deletedCount }) => {
    if(err) return res.status(500).send({ response: 'Server error' })
    if(deletedCount == 0) return res.status(400).send({ response: 'User not deleted'})
    res.send({ response: 'User is delete' })
  })
})

module.exports = routerDeleteUsers;
