"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookings.belongsTo(models.User, {
        foreignKey: "patientID",
        targetKey: "id",
        as: "patientData",
      });
      Bookings.belongsTo(models.Allcodes, {
        foreignKey: "timeType",
        targetKey: "key",
        as: "timetypeData",
      });
      Bookings.belongsTo(models.Doctor_Info, {
        foreignKey: "doctorID",
        targetKey: "doctorID",
        as: "priceData",
      });
    }
  }
  Bookings.init(
    {
      statusID: DataTypes.STRING,
      doctorID: DataTypes.INTEGER,
      patientID: DataTypes.INTEGER,
      date: DataTypes.DATE,
      timeType: DataTypes.STRING,
      reason: DataTypes.STRING,
      access_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bookings",
    }
  );
  return Bookings;
};
