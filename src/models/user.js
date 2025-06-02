"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Liên kết tới bảng Allcodes
      User.belongsTo(models.Allcodes, {
        foreignKey: "positionID",
        targetKey: "key",
        as: "positionData",
      });
      User.belongsTo(models.Allcodes, {
        foreignKey: "gender",
        targetKey: "key",
        as: "genderData",
      });
      User.belongsTo(models.Allcodes, {
        foreignKey: "roleID",
        targetKey: "key",
        as: "roleData",
      });
      User.hasOne(models.Markdown, {
        foreignKey: "doctorID"
      })
      User.hasOne(models.Doctor_Info, {
        foreignKey: "doctorID"
      });
      User.hasMany(models.Schedule, {
        foreignKey: "doctorID",
        sourceKey: "id",
        as: "doctorData",
      });
      User.hasMany(models.Bookings, {
        foreignKey: "patientID",
        sourceKey: "id",
        as: "patientData",
      });
      
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      image: DataTypes.STRING,
      roleID: DataTypes.STRING,
      positionID: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
      tableName: "users",
    }
  );

  return User;
};
