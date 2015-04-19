var app = require('express')();
var harvest = require('../..');

var swagger = {
  info: {
    title: 'Test',
    version: '0.0.0'
  }
};

app.use(harvest(swagger));

app.get('/', function (req, res) {
  res.send({
    name: req.query.name || 'Unnamed',
    age: req.query.age
  });
});

app.get('/foo/:id', function(req, res) {
  res.send({id: req.params.id});
});

module.exports.app = app;
module.exports.swagger = swagger;