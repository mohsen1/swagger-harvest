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
  res.send({me: 1});
});

module.exports.app = app;
module.exports.swagger = swagger;