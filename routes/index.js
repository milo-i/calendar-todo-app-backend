var express = require('express');
var router = express.Router();
const cors = require('cors');
const corsOptions = {
  origin: 'https://react-calendar2021.herokuapp.com/.herokuapp.com',
  optionsSuccessStatus: 200
}
router.use(cors(corsOptions));
const mongoose = require('mongoose');
const Todo = require('../models/todo')

// Anslutning till mongo db
const dbURI = 'mongodb+srv://dbUser:Rada192270@calendar-todo-app.cgmxw.mongodb.net/calendar-todo?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('uppkopplad mot databasen'))
  .catch((err) => console.log(err, 'ERROR'));


// Post router för nya todos
router.post('/add', (req, res, next) => {
  // Skapa en ny todo enligt modellen i mongoose
  const todo = new Todo({
    id: req.body.id,
    todo: req.body.inputText,
    date: req.body.date,
    completed: false
  })

  // Sparar todo till db
  todo.save().then((result) => {
    console.log(result, 'RESULT');
    res.status(201).json({
      message: 'todo sparad'
    })
  })
})

// Get router för att hämta todos
router.get('/todos', (req, res, next) => {

  Todo.find({}, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      res.status(200).json(data);
    }
  })
})

router.put('/completed', function (req, res, next) {

  Todo.findOne({ id: req.body.id })
    .exec()
    .then(todo => {

      if (todo.completed != req.body.completed) {
        todo.completed = req.body.completed

        todo.save();
        res.status(200).json({
          message: 'todo uppdaterad'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json('error');
    })
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
