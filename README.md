# Swagger Harvest

Generate Swagger specs from your Express based app.


### Usage

Install `swagger-harvest` via npm and use it as an Express middleware.
The first argument (`swagger`) is the initial Swagger object that Swagger Harvest will extend



```js
var swagger = {
  info: {
    title: 'Test',
    version: '0.0.0'
  }
};

app.use(harvest(swagger));
```

### License

MIT