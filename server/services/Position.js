const Position = require('./../models/Position');
const PositionType = require('./../models/PositionType');
const Staff = require('./../models/Staff');
const { addStaff, deleteStaff } = require('./Staff');
const { getPositionTypeByLevel, getPositionType } = require('./PositionType');

const getPosition = async (id) => {
  try {
    return await Position.findOne({
      where: {
        id
      },
      include: [{
        model: PositionType,
        as: 'positionType'
      }, {
        model: Staff,
        as: 'staff'
      }]
    });
  } catch (e) {
    console.log(e);
    return Promise.resolve({
      error: "Saving PositionType Failed."
    });
  }
}

const getPositionByType = async (positionTypeId) => {
  try {
    return await Position.findOne({
      where: {
        positionTypeId
      },
      order: [
        ['createdAt', 'ASC'],
      ],
    });
  } catch (e) {
    console.log(e);
    return Promise.resolve({
      error: "Saving PositionType Failed."
    });
  }
}

const getPositionByLevel = async (level) => {
  try {
    // getting position type level
    const p = await getPositionTypeByLevel(level);
    if (p && p.id) {
      const ptId = p.id;
      // console.log('getPositionByLevel p', p, level);
      // getting position by position_type_id
      return await getPositionByType(ptId);
    }
    return Promise.resolve(null);
  } catch (e) {
    console.log(e);
    return Promise.resolve({
      error: "Getting Single Position Failed."
    });
  }
}

const getPositionData = async (position) => {
  const { reportingPositionId, positionTypeId } = position;
  if ( !reportingPositionId ) {
    const currentPositionType = await getPositionType(positionTypeId);
    const { level } = currentPositionType;
    if (level > 0) {
      const reportingPosition = await getPositionByLevel(level - 1);
      if (reportingPosition && reportingPosition.id ) {
        console.log('reportingPosition.id', reportingPosition.id, position);
        position = {...position, reportingPositionId: reportingPosition.id } ;
        return Promise.resolve(position);
      } else {
        return Promise.resolve(position);
      }
    } else {
      return Promise.resolve(position);
    }
  } else {
    return Promise.resolve(position);
  }
}

const addPosition = async (position) => {
  position = await getPositionData(position);
  const model = new Position(position);
  try {
    const p = await model.save();
    return getPosition(p.id);
  } catch (e) {
    console.log(e);
    return Promise.resolve({
      error: "Saving PositionType Failed."
    });
  }
};

const getAllPositions = async () => {
  try {
    return await Position.findAll({
      include: [{
        model: PositionType,
        as: 'positionType'
      }, {
        model: Staff,
        as: 'staff'
      }],
      order: [
        ['positionType', 'level', 'ASC'],
      ],
    });
  } catch (e) {
    console.log(e);
    return Promise.resolve({
      error: "Saving PositionType Failed."
    });
  }
}

{/* User Story 3 */}
const removeEmployeePosition = async (positionId) => {
  const model = await Position.findByPk(positionId);
  if (model && model.staffId) {
    try {
      try {
        await deleteStaff(model.staffId);
      } catch (e) {
        console.log(e);
        return Promise.resolve({
          error: "Deleting staff Failed."
        });
      }
      model.staffId = null;
      const p = await model.save();
      return await getPosition(p.id);
    } catch (e) {
      console.log(e);
      return Promise.resolve({
        error: "Saving Position Failed with empty StaffId."
      });
    }
  } else {
    return Promise.resolve({
      error: "Empty staff Id or No Position.",
      statusCode: 404
    });
  }
};

{/* User Story 5 */}
const fillEmployeePosition = async (positionId, staff) => {
  const staffModel = await addStaff(staff);
  if (staffModel && staffModel.id) {
    const model = await Position.findByPk(positionId);
    if (model) {
      try {
        model.staffId = staffModel.id;
        await model.save();
        return await getPosition(positionId);
      } catch (e) {
        console.log(e);
        return Promise.resolve({
          error: "Saving PositionType Failed."
        });
      }
    } else {
      return Promise.resolve({
        error: "Saving PositionType Failed.",
        statusCode: 404
      });
    }
  } else {
    return Promise.resolve(staffModel);
  }
};

{/* User Story 4 */}
const addDescendantEmployeePosition = async (position, staff, id) => {
  const currentPosition = await getPosition(id);
  if (currentPosition && currentPosition.id) {
    let newEmployeeLevel = currentPosition.positionType.level + 1;
    const positionTypeWithNewLevel = await getPositionTypeByLevel(newEmployeeLevel);
    if (positionTypeWithNewLevel && positionTypeWithNewLevel.id) {
      const newPositionTypeId = positionTypeWithNewLevel.id;
      position = {...position, reportingPositionId:id, level: newEmployeeLevel, positionTypeId:newPositionTypeId};
      if (staff) {
        // when staff is given
        const staffModel = await addStaff(staff);
        if (staffModel && staffModel.id) {
          position = {...position, staffId: staffModel.id};
          try {
            return await addPosition(position);
          } catch (e) {
            console.log(e);
            return Promise.resolve({
              error: "Saving Position Failed."
            });
          }
        } else {
          return Promise.resolve(staffModel);
        }
      } else {
        // when staff is not given
        return await addPosition(position);
      }
    } else {
      return Promise.resolve({
        error: "Saving PositionType Failed.",
        statusCode: 404
      });
    }
  } else {
    return Promise.resolve(currentPosition);
  }
};


module.exports = {
  addPosition, addDescendantEmployeePosition,
  fillEmployeePosition, removeEmployeePosition,
  getAllPositions, getPosition, getPositionByLevel
};
