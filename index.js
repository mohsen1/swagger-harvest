module.exports = function HarvestSwagger(swagger) {

  swagger.paths = {};

  return function HarvestSwaggerMiddleware(req, res, next) {
    addPath(swagger, req.path);
    addOperation(swagger, req.path, req.method);

    next();
  };
};


function addPath(swagger, pathName) {
  if (swagger.paths[pathName] === undefined) {
    swagger.paths[pathName] = {};
  }
}

function addOperation(swagger, pathName, operationName) {
  if (swagger.paths[pathName][operationName] === undefined) {
    swagger.paths[pathName][operationName] = {};
  }
}