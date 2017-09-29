const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  port = 3000,
  app = express(),
  massive = require('massive'),
  conncetionString = 'postgres://SheaClose@localhost/SheaClose';
//				, session = require("express-session")

// app.use(session(serverConfig.session) );
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));
massive(conncetionString).then(db => {
  app.set('db', db);
});

app.get('/api/products', (req, res) => {
  req.app
    .get('db')
    .getProducts()
    .then(products => res.json(products));
});

app.listen(port, function() {
  console.log('Server listening on port', port);
});
