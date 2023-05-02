var express = require('express');
const { updateStaff } = require('../services/Staff')
var router = express.Router();

/* GET home page. */
{/* User Story 2 */}
router.put('/:id', function(req, res, next) {
  const { params, body } = req;
  const { id } = params;
  if (id && body && body.firstName && body.lastName) {
    updateStaff(id, body).then((d) => {
      if (d.error) {
        res.status(505);
        res.json(d);
      } else {
        res.status(200);
        res.json(d);
      }
    });
  } else {
    res.status(505);
    res.json({error:'Empty Id'});
  }
});


module.exports = router;
