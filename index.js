module.exports = function HarvestSwagger(swagger) {

  swagger.paths = {};

  swagger.info = swagger.info || {};
  swagger.info.version = swagger.info.version || '0.0.0';
  swagger.info.title = swagger.info.title || 'Untitled';

  return function HarvestSwaggerMiddleware(req, res, next) {
    addOperation(swagger, req);

    next();
  };
};


function addPath(swagger, pathName) {
  if (swagger.paths[pathName] === undefined) {
    swagger.paths[pathName] = {};
  }
}

function addOperation(swagger, req) {
  var pathName = req.path;

  for (var param in req.params) {
    pathName = pathName.replace(param, '');
  }

  addPath(swagger, pathName);

  var operationName = req.method.toLowerCase();

  if (swagger.paths[pathName][operationName] === undefined) {
    swagger.paths[pathName][operationName] = {};
  }

  for (var query in req.query) {
    addQueryParam(swagger.paths[pathName][operationName], query);
  }
}

function addQueryParam(operation, queryName) {
  operation.parameters = operation.parameters || [];

  operation.parameters.push({
    name: queryName,
    type: 'string',
    in: 'query'
  });
}