"use strict";
const { hashUserPassWord } = require("../services/userService");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashPassword = await hashUserPassWord("123456");
    return queryInterface.bulkInsert("users", [
      {
        email: "admin@gmail.com",
        password: hashPassword,
        firstName: "DoHocIT",
        lastName: "Thanhh Đô",
        address: "Bình Định",
        gender: "F",
        phoneNumber: "0981321319",
        image: "",
        roleID: "R1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
