"use strict";

var request = require('supertest');
var api = request('http://localhost:3000');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should;
var app = require('../server.js');
// var mongoose = require('mongoose');
// var Todo = mongoose.model('Todo');
var Todo = require('../app/models/todo.model');
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
});
