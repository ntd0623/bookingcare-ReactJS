"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("doctor_info", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doctorID: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      priceID: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      provinceID: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      paymentID: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      addressClinic: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nameClinic: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
      count: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("doctor_info");
  },
};
