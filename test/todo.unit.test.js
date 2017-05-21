"use strict";

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

// import our todo model for unit testing
var Todo = require('../app/models/todo.model');

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
});
