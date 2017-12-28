const express = require('express');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 8080;
const maxAge = process.env.NODE_ENV == 'production' ? 2592000000 : 0; // default is 30 days

app.use(express.static('public', { maxAge: maxAge }));

app.get('/', routes.home);
app.get("/:icon", routes.icon);

routes.init();

app.listen(port, () => console.log("Listening on " + port + "\nPress CTRL-C to stop server."));

module.exports = app;