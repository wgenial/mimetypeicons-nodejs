require('newrelic');
var express = require('express');
var routes = require('./routes');
var app = express();
var nodalytics = require('nodalytics');

app.use(nodalytics(process.env.GOOGLE_ANALYTICS_ID));

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static('public', { maxAge:2592000000 } ));
  return app.use(app.router);
});

app.configure('development', function() {
  return app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  return app.use(express.errorHandler());
});

app.get('/', routes.home);
app.get("/:icon", routes.icon);

routes.initialize();

app.routes.get[1].regexp = /^\/(?:(.+?))\/?$/i;

var port = process.env.PORT || 3000;
app.listen(port, function() {
  return console.log("Listening on " + port + "\nPress CTRL-C to stop server.");
});

exports = module.exports = app;