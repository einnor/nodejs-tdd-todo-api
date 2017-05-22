var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// defining schema for our todo API
var TodoSchema = Schema({
  todo: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});

// export our model
var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
