var express = require('express');
var router = express.Router();
var { addPositionType, getAllPositionTypes } = require('../services/PositionType');

router.post('/', function(req, res, next) {
  if (req.body && req.body.title) {
     addPositionType(req.body).then((d) => {
       if (d.error) {
         res.status(500);
         res.json(d);
       } else {
         res.status(200);
         res.json(d);
       }
     });
  } else {
    res.status(505);
    res.json({error:'Empty Body'});
  }
});

router.get('/', function(req, res, next) {
  getAllPositionTypes().then((d) => {
    if (d.error) {
      res.status(505);
      res.json(d);
    } else {
      res.status(200);
      res.json(d);
    }
  });
});

module.exports = router;
