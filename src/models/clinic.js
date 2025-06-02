"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clinics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Clinics.hasMany(models.Doctor_Info, {
        foreignKey: "clinicID",
        sourceKey: "id",
        as: "clinicData",
      });
    }
  }
  Clinics.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Clinics",
      freezeTableName: true,           // không để Sequelize tự đổi tên
      tableName: "clinics",
    }
  );
  return Clinics;
};
