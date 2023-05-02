const PositionType = require('../models/PositionType');
const Staff = require('../models/Staff');
const Position = require('../models/Position');

const setupTables = async () => {
  await PositionType.sync();
  await Staff.sync();
  await Position.sync()
};

module.exports = {
  setupTables
};
