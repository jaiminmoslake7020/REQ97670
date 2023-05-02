const { DataTypes, Model, Deferrable } = require('sequelize');
const Staff = require('./Staff');
const { sequelize } = require('./db');
const PositionType = require('./PositionType');

class Position extends Model {}

Position.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reportingPositionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      // This is a reference to another model
      model: Position,

      // This is the column name of the referenced model
      key: 'id',

      // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
      deferrable: Deferrable.NOT
      // Options:
      // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
      // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
      // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
    }
  },
  staffId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      // This is a reference to another model
      model: Staff,

      // This is the column name of the referenced model
      key: 'id',

      // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
      deferrable: Deferrable.NOT
      // Options:
      // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
      // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
      // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
    }
  },
  positionTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      // This is a reference to another model
      model: PositionType,

      // This is the column name of the referenced model
      key: 'id',

      // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
      deferrable: Deferrable.NOT
      // Options:
      // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
      // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
      // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
    }
  }
}, {
  sequelize,
  modelName: 'Position'
});

PositionType.hasMany(Position, { as: 'positions', foreignKey: 'positionTypeId' });
Position.belongsTo(PositionType, { as: 'positionType', foreignKey: 'positionTypeId' });

Position.belongsTo(Staff, { as: 'staff', foreignKey: 'staffId' });
Staff.belongsTo(Staff, { as: 'position', foreignKey: 'staffId' });

Position.belongsTo(Position, { as: 'reportingPosition', foreignKey: 'reportingPositionId' });

module.exports = Position;
