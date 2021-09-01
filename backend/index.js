const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require ('mongoose');

const db = 'mongodb://localhost:27017/testServer';


const routerGetUsers = require('./routers/getUsers');
const routerUpdateUsers = require('./routers/updateUsers');
const routerDeleteUsers = require('./routers/deleteUser');
const routerCreateNewUsers = require('./routers/createNewUsers');

mongoose.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}, () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use('', routerGetUsers);
  app.use('', routerUpdateUsers);
  app.use('', routerDeleteUsers);
  app.use('', routerCreateNewUsers);
  

  app.listen(4000, (req, res) => {
    console.log('Сервер запущен');
  })
})