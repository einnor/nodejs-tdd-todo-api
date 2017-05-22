var Todo = require('../models/todo.model');

var TodoCtrl = {
    // Get all todos from the Database
    GetTodo: function(req, res){
        Todo.find({}, function(err, todos){
          if(err) {
            res.json({status: false, error: "Something went wrong"});
            return;
          }
          res.json({status: true, todo: todos});
        });
    },

    // Post a todo into Database
    PostTodo: function(req, res){
        var todo = new Todo(req.body);
        todo.save(function(err, todo){
          if(err) {
            res.json({status: false, error: "Something went wrong"});
            return;
          }
          res.json({status: true, message: "Todo Saved!!", todo: todo});
        });
    }
}

module.exports = TodoCtrl;
