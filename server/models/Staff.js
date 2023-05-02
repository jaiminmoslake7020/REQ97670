const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./db');

class Staff extends Model {}

Staff.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize,
  modelName: 'Staff'
});

module.exports = Staff;
