var express = require('express');
var router = express.Router();
const cors = require('cors');
router.use(cors());
const mongoose = require('mongoose');
const Todo = require('../models/todo')

// Anslutning till mongo db
const dbURI = 'mongodb+srv://dbUser:Rada192270@calendar-todo-app.cgmxw.mongodb.net/calendar-todo?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('uppkopplad mot databasen')) // Kan behöva lägga in listen på servern istället för console.log så att man inte gör anrop innan db laddas
  .catch((err) => console.log(err));


// Post router för nya todos
router.post('/add', (req, res, next) => {
  console.log(req.body);
  // Skapa en ny todo enligt modellen i mongoose
  const todo = new Todo({
    todo: req.body.todo,
    date: req.body.date
  })
  // Sparar todo till db
  todo.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: 'todo sparad'
    })
  })
})




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
