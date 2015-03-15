'use strict';
var Goat = require('../models/Goat');
var bodyparser = require('body-parser');

module.exports = function(app) {
  app.use(bodyparser.json());

  app.get('/goats', function(req, res) {
    Goat.find({}, function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not retrieve goats'});

      res.json(data);
    });
  });

  app.post('/goats', function(req, res) {
    var newGoat = new Goat(req.body); 
    newGoat.save(function(err, goat) {
      if (err) return res.status(500).send({'msg': 'could not save goat'});

      res.json(goat);
    });
  });

  app.put('/goats/:id', function(req, res) {
    var updatedGoat = req.body;
    delete updatedGoat._id;
    Goat.update({_id: req.params.id}, updatedGoat, function(err) {
      if (err) return res.status(500).send({'msg': 'could not update goat'});

      res.json(req.body);
    });
  });

  app.delete('/goats/:id', function(req, res) {
    Goat.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send({'msg': 'could not delete'});

      res.json({'msg': 'success!'});
    });
  });
};
