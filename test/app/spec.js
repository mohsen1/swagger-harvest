'use strict';

var request = require('supertest');
var expect = require('chai').expect;

var app = require('./').app;
var swagger = require('./').swagger;

describe('Basic Operation: GET /', function() {

  describe('Triggering the call', function(){
    it('respond with json', function(done){
      request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200, {name: 'Unnamed'}, done);
    });
  });

  describe('Generated Swagger', function() {
    it('should have / path', function() {
      expect(swagger.paths).not.to.be.undefined;
      expect(swagger.paths['/']).to.be.a.object;
    });

    it('should have GET operation in / path', function() {
      expect(swagger.paths['/'].get).not.to.be.undefined;
      expect(swagger.paths['/']).to.be.a.object;
    });
  });
});

describe('Query parameter', function() {
  describe('Basic', function(){

    describe('Triggering: GET /?name=Me', function(){
      it('respond with json', function(done){
        request(app)
          .get('/?name=Me')
          .expect('Content-Type', /json/)
          .expect(200, {name: 'Me'}, done);
      });
    });

    describe('Generated Swagger', function() {
      it('should have parameters array in GET /', function() {
        expect(swagger.paths['/'].get.parameters).not.to.be.undefined;
      });

      it('should have "name" parameter in GET /', function(){
        expect(swagger.paths['/'].get.parameters).to.include({
          name: 'name',
          in: 'query',
          type: 'string'
        });
      });
    });
  });
  describe('Repeated query param', function(){
    describe('Triggering: GET /?name=You', function(){
      it('respond with json', function(done){
        request(app)
          .get('/?name=You')
          .expect('Content-Type', /json/)
          .expect(200, {name: 'You'}, done);
      });
    });

    describe('Generated Swagger', function(){
      it('should have one query parameters', function(){
        var queryParams = swagger.paths['/'].get.parameters.filter(function(p) {
          return p.in === 'query';
        });
        expect(queryParams.length).to.equal(1);
      });
    });
  });

  describe('More query params', function(){
    describe('Triggering: GET /?id=10', function(){
      it('respond with json', function(){
        request(app)
          .get('/?name=Me&id=aabb')
          .expect('Content-Type', /json/)
          .expect(200, {name: 'Me', id: '10'});
      });
    });

    describe('Generated Swagger', function(){
      it('should add more query parameters', function(){
        expect(swagger.paths['/'].get.parameters).to.include({
          name: 'age',
          in: 'query',
          type: 'string'
        });
      });
    });
  });
});

xdescribe('Path Parameter: GET /foo/:id', function() {
  describe('Triggering the call', function(){
    it('respond with json', function(done){
      request(app)
        .get('/foo/1')
        .expect('Content-Type', /json/)
        .expect(200, {id: '1'}, done);
    });
  });

  describe('Generated Swagger', function() {
    it('should have /foo path', function() {
      expect(swagger.paths).not.to.be.undefined;
      expect(swagger.paths['/foo']).to.be.a.object;
    });

    it('should have GET operation in /foo path', function() {
      expect(swagger.paths['/foo'].get).not.to.be.undefined;
      expect(swagger.paths['/foo']).to.be.a.object;
    });
  });
});

xdescribe('logs swagger', function(){
  it('log', function(){
    console.log(JSON.stringify(swagger, null, 2));
  });
});