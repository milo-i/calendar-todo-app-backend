const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
 id: {
  type: String,
  required: true
 },
 todo: {
  type: String,
  required: true
 },
 date: {
  type: String,
  required: true
 },
 completed: {
  type: Boolean,
  required: true
 }
});


const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;