var express = require('express');
const { addPosition,
  getAllPositions, getPosition,
  fillEmployeePosition, removeEmployeePosition,
  addDescendantEmployeePosition
} = require('../services/Position')
var router = express.Router();

router.post('/', function(req, res, next) {
  if (req.body && req.body.title) {
    addPosition(req.body).then((d) => {
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

{/* User Story 5 */}
router.post('/fill/:id', function(req, res, next) {
  const { body, params } = req;
  const { id } = params;
  if (id && body && body.firstName && body.lastName) {
    fillEmployeePosition(id, body).then((d) => {
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

{/* User Story 3 */}
router.post('/remove-employee/:id', function(req, res, next) {
  const { params } = req;
  const { id } = params;
  if (id) {
    removeEmployeePosition(id).then((d) => {
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

{/* User Story 1 */}
router.get('/', function(req, res, next) {
  getAllPositions().then((d) => {
    if (d.error) {
      res.status(505);
      res.json(d);
    } else {
      res.status(200);
      res.json(d);
    }
  });
});

router.get('/:id', function(req, res, next) {
  const { params } = req;
  const { id } = params;
  if (id) {
    getPosition(id).then((d) => {
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

{/* User Story 4 */}
router.post('/add-descendant/:id', function(req, res, next) {
  const { body, params } = req;
  const { id } = params;
  const { staff, position } = body;
  console.log('add-descendant', staff, position );
  if (id && position) {
    addDescendantEmployeePosition(position, staff, id).then((d) => {
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
