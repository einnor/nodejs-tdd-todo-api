var express = require('express');
var router = express.Router();

var TodoController = require('../controllers/todo.controller');

// Get all todos
router.get('/todos', TodoController.GetTodo);
router.get('/todos/:id', TodoController.GetOneTodo);
router.post('/todos', TodoController.PostTodo);
router.put('/todos/:id', TodoController.UpdateTodo);
router.delete('/todos/:id', TodoController.DeleteTodo);

module.exports = router;
