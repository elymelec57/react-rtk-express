'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employe.belongsTo(models.User,{
        foreignKey: 'id',
        target_key: 'userId'
      })
    }
  }
  Employe.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    job: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Employe',
  });
  return Employe;
};