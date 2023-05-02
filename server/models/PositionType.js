const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./db');

class PositionType extends Model {}

PositionType.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.NUMBER,
    allowNull: false,
    unique: true
  },
}, {
  sequelize,
  modelName: 'PositionType'
});

module.exports = PositionType;
