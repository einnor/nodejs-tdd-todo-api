"use strict";

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

// import our todo model for unit testing
var Todo = mongoose.model('Todo', 'TodoSchema');

describe('Todo Unit testing', function() {

  describe('/GET todos', function() {

    // test will pass if we get all todos
    it('should fetch all todos', function(done) {
      var TodoMock = sinon.mock(Todo);
      var expectedResult = {status: true, todo: []};
      TodoMock.expects('find').yields(null, expectedResult);

      Todo.find(function(err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });

    // test will pass if we failt to get a todo
    it('should return an error', function(done) {
      var TodoMock = sinon.mock(Todo);
      var expectedResult = {status: false, error: 'Something went wrong'};
      TodoMock.expects('find').yields(expectedResult, null);

      Todo.find(function(err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });

  describe('/POST a new todo', function() {

    // test will pass if the todod is saved
    it('should create a new post', function(done) {
      var TodoMock = sinon.mock(new Todo({todo: 'Save new todo from mock'}));
      var todo = TodoMock.object;
      var expectedResult = {status: true};
      TodoMock.expects('save').yields(null, expectedResult);

      todo.save(function(err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });

    it('should return an error if todo not saved', function(done) {
      var TodoMock = sinon.mock(new Todo({todo: 'Save new todo from mock'}));
      var todo = TodoMock.object;
      var expectedResult = {status: false};
      TodoMock.expects('save').yields(expectedResult, null);

      todo.save(function(err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });

  describe('/PUT update a todo by id', function() {

    // test will pass if the todo is updated
    it('should update a todo by id', function(done) {
      var TodoMock = sinon.mock(new Todo({completed: true}));
      var todo = TodoMock.object;
      var expectedResult = {status: true};
      TodoMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult);

      todo.save({_id: 12345}, function(err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });

    // test will pass if the todo is not updated
    it('should return an error if update fails', function(done) {
      var TodoMock = sinon.mock(new Todo({completed: true}));
      var todo = TodoMock.object;
      var expectedResult = {status: false};
      TodoMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null);

      todo.save({_id: 12345}, function(err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });

  describe('/DELETE remove a todo by id', function() {

    // it will pass if the todo is deleted
    it('should delete a todo by id', function(done) {
      var TodoMock = sinon.mock(Todo);
      var expectedResult = {status: true};
      TodoMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);

      Todo.remove({_id: 12345}, function(err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });

    // it will pass if the todo is not deleted
    it('should return an error if todo is not deleted', function(done) {
      var TodoMock = sinon.mock(Todo);
      var expectedResult = {status: false};
      TodoMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);

      Todo.remove({_id: 12345}, function(err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });
});
