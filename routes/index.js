var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// Connecting to my mongodb
const dbURI = 'mongodb+srv://dbUser:Rada192270@calendar-todo-app.cgmxw.mongodb.net/calendar-todo?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('uppkopplad mot databasen')) // Kan behöva lägga in listen på servern istället för console.log så att man inte gör anrop innan db laddas
  .catch((err) => console.log(err));




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
