const PositionType = require('./../models/PositionType');
const Position = require('../models/Position')
const Staff = require('../models/Staff')

const maxAllowedLevel = 4;

const addPositionType = async (
  positionType
) => {
  const { level } = positionType;
  let levelExists = [];
  levelExists = await PositionType.findAll({
    where: { "level": level }
  });
  if (level > maxAllowedLevel) {
    return Promise.resolve({
      error: "Max allowed level is "+maxAllowedLevel
    });
  }
  if (levelExists.length === 0) {
    const model = new PositionType(positionType);
    try {
      return await model.save();
    } catch (e) {
      console.log(e, positionType);
      return Promise.resolve({
        error: "Saving PositionType Failed."
      });
    }
  } else {
    return Promise.resolve({
      error: "Director already exists."
    });
  }
}

const getAllPositionTypes = async () => {
  try {
    return await PositionType.findAll();
  } catch (e) {
    console.log(e);
    return Promise.resolve({
      error: "Getting findAll PositionType Failed."
    });
  }
}

const getPositionType = async (id) => {
  try {
    return await PositionType.findByPk(id);
  } catch (e) {
    console.log(e);
    return Promise.resolve({
      error: "Getting Single PositionType Failed."
    });
  }
}

const getPositionTypeByLevelV2 = async (level) => {
  try {
    const pt = await PositionType.findOne({
      where : {
        level
      },
      include: [{
        model: Position,
        as: 'positions'
      }],
      order: [
        ['createdAt', 'ASC'],
      ],
    });
    console.log('pt', pt);
    if (pt && pt.id) {
      const ptId = pt.id;
      const p = await Position.findOne({
        where : {
          positionTypeId: ptId
        },
        include: [{
          model: PositionType,
          as: 'positionType'
        }, {
          model: Staff,
          as: 'staff'
        }],
        order: [
          ['createdAt', 'ASC'],
        ],
      });
      console.log('p', p);
    }
    return Promise.resolve(null);
  } catch (e) {
    console.log(e);
    return Promise.resolve({
      error: "Getting Single getPositionTypeByLevel Failed."
    });
  }
}

const getPositionTypeByLevel = async (level) => {
  try {
    return await PositionType.findOne({
      where : {
        level: level
      }
    });
  } catch (e) {
    console.log(e);
    return Promise.resolve({
      error: "Getting Single getPositionTypeByLevel Failed."
    });
  }
}

module.exports = {
  addPositionType, getAllPositionTypes,
  maxAllowedLevel, getPositionTypeByLevel, getPositionType,
  getPositionTypeByLevelV2,
};
