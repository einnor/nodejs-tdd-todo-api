"use strict";

var request = require('supertest');
var api = request('http://localhost:3000');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should;
var app = require('../server.js');
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo', 'TodoSchema');
var agent = request.agent(app);

describe('Todo CRUD integration testing', function() {
  describe('/GET fetch all todos', function() {

    it('should return a 200 response', function (done) {
			api.get('/api/todos')
         .set('Accept', 'application/json')
			   .expect(200, done);
		});

    it('should return todo as an array', function(done) {
      api.get('/api/todos')
         .set('Accept', 'application/json')
         .end(function(err, res) {
           expect(res.body.todo).to.be.a('array');
           done();
         });
    });

    it('should return status as true', function(done) {
      api.get('/api/todos')
         .set('Accept', 'application/json')
         .end(function(err, res) {
           expect(res.body.status).to.be.true;
           done();
         });
    });
  });

  describe('/GET/:id fetch a todo by id', function() {

    var response = {};

    before(function(done) {
      var newTodo = {todo: 'Todo from hooks'};
      api.post('/api/todos')
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(newTodo)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
           response = res.body;
            done();
          });
    });

    it('should return a 200 response', function (done) {
			api.get('/api/todos/' + response.todo._id)
         .set('Accept', 'application/json')
			   .expect(200, done);
		});

    it('should return an object with keys and values', function(done) {
      api.get('/api/todos/' + response.todo._id)
         .set('Accept', 'application/json')
         .end(function(err, res) {
           expect(res.body).to.have.property('status');
           expect(res.body.status).to.not.equal(null);
           expect(res.body.todo).to.be.a('object');
           expect(res.body.todo).to.have.property('todo');
           expect(res.body.todo.todo).to.not.equal(null);
           expect(res.body.todo).to.have.property('completed');
           expect(res.body.todo.completed).to.not.equal(null);
           done();
         });
    });

    it('should return status as true', function(done) {
      api.get('/api/todos/' + response.todo._id)
         .set('Accept', 'application/json')
         .end(function(err, res) {
           expect(res.body.status).to.be.true;
           done();
         });
    });
  });

  describe('/POST save a new todo', function() {

    it('should be able to save a new todo', function(done) {
      var newTodo = {todo: 'New Todo'};
      api.post('/api/todos')
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(newTodo)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
            expect(res.body.status).to.be.true;
            done();
          });
    });
  });

  describe('/PUT/:id update a todo', function() {

    var response = {};

    before(function(done) {
      var newTodo = {todo: 'Todo from hooks'};
      api.post('/api/todos')
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(newTodo)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
           response = res.body;
            done();
          });
    });

    it('should be able to update a todo using id', function(done) {
      var updatedTodo = {completed: true};
      api.put('/api/todos/' + response.todo._id)
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(updatedTodo)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
           expect(res.body.status).to.be.true;
           expect(res.body.todo.completed).to.be.true;
           done();
         });
    });
  });

  describe('/DELETE/:id delete a todo', function() {

    var response = {};

    before(function(done) {
      var newTodo = {todo: 'Todo from hooks'};
      api.post('/api/todos')
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(newTodo)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
           response = res.body;
            done();
          });
    });

    it('should be able to delete a todo', function(done) {
      api.delete('/api/todos/' + response.todo._id)
         .expect(200)
         .end(function(err, res) {
           expect(res.body.status).to.be.true;
           done();
         });
    });
  });
});
