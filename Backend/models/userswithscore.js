'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersWithScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsersWithScore.init({
    name: DataTypes.STRING,
    score: DataTypes.INTEGER,
    emotion: DataTypes.STRING,
    created: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UsersWithScore',
  });
  return UsersWithScore;
};