'use strict';

var mongoose = require('mongoose');

var goatSchema = new mongoose.Schema({
	goatSays: String,
	goatName: String
});

module.exports = mongoose.model('Goat', goatSchema);