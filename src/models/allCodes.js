"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Liên kết tới User
      Allcodes.hasMany(models.User, {
        foreignKey: "positionID",
        sourceKey: "key",
        as: "userPosition",
      });
      Allcodes.hasMany(models.User, {
        foreignKey: "gender",
        sourceKey: "key",
        as: "userGender",
      });
      Allcodes.hasMany(models.User, {
        foreignKey: "roleID",
        sourceKey: "key",
        as: "userRole",
      });
      Allcodes.hasMany(models.Schedule, {
        foreignKey: "timeType",
        sourceKey: "key",
        as: "timeTypeData",
      });
    }
  }
  Allcodes.init(
    {
      key: DataTypes.STRING,
      type: DataTypes.STRING,
      value_EN: DataTypes.STRING,
      value_VI: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcodes",
    }
  );
  return Allcodes;
};
