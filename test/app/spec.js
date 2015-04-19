var request = require('supertest');
var expect = require('chai').expect;

var app = require('./').app;
var swagger = require('./').swagger;

describe('GET /', function(){
  it('respond with json', function(done){
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, done);
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