'use strict';
var express = require('express');
var mongoose = require('mongoose');
var goatsRoutes = require('./routes/goats_routes');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/goatsapp_development');

var app = express();
app.use(express.static(__dirname + '/build'));

var router = express.Router();

goatsRoutes(router);

app.use('/api/v1', router);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
