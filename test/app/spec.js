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

describe('Query parameter: GET /?name=Me', function() {
  describe('Triggering the call', function(){
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

describe('logs swagger', function(){
  it('log', function(){
    console.log(JSON.stringify(swagger, null, 2));
  });
});