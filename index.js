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

  Object.keys(req.query).forEach(function(queryName) {
    addQueryParam(swagger.paths[pathName][operationName], queryName);
  });
}

function addQueryParam(operation, queryName) {
  operation.parameters = operation.parameters || [];

  var exists = operation.parameters.some(function(param){
    return param.name === queryName;
  });

  if (!exists){
    operation.parameters.push({
      name: queryName,
      type: 'string',
      in: 'query'
    });
  }
}