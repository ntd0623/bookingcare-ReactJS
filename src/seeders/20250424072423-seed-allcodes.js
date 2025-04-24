"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "allcodes",
      [
        // ROLE
        {
          type: "ROLE",
          key: "R1",
          value_EN: "Admin",
          value_VI: "Quản trị viên",
        },
        { type: "ROLE", key: "R2", value_EN: "Doctor", value_VI: "Bác sĩ" },
        { type: "ROLE", key: "R3", value_EN: "Patient", value_VI: "Bệnh nhân" },

        // STATUS
        {
          type: "STATUS",
          key: "S1",
          value_EN: "New",
          value_VI: "Lịch hẹn mới",
        },
        {
          type: "STATUS",
          key: "S2",
          value_EN: "Confirmed",
          value_VI: "Đã xác nhận",
        },
        {
          type: "STATUS",
          key: "S3",
          value_EN: "Done",
          value_VI: "Đã khám xong",
        },
        { type: "STATUS", key: "S4", value_EN: "Cancel", value_VI: "Đã hủy" },

        // TIME
        {
          type: "TIME",
          key: "T1",
          value_EN: "8:00 AM - 9:00 AM",
          value_VI: "8:00 - 9:00",
        },
        {
          type: "TIME",
          key: "T2",
          value_EN: "9:00 AM - 10:00 AM",
          value_VI: "9:00 - 10:00",
        },
        {
          type: "TIME",
          key: "T3",
          value_EN: "10:00 AM - 11:00 AM",
          value_VI: "10:00 - 11:00",
        },
        {
          type: "TIME",
          key: "T4",
          value_EN: "11:00 AM - 0:00 PM",
          value_VI: "11:00 - 12:00",
        },
        {
          type: "TIME",
          key: "T5",
          value_EN: "1:00 PM - 2:00 PM",
          value_VI: "13:00 - 14:00",
        },
        {
          type: "TIME",
          key: "T6",
          value_EN: "2:00 PM - 3:00 PM",
          value_VI: "14:00 - 15:00",
        },
        {
          type: "TIME",
          key: "T7",
          value_EN: "3:00 PM - 4:00 PM",
          value_VI: "15:00 - 16:00",
        },
        {
          type: "TIME",
          key: "T8",
          value_EN: "4:00 PM - 5:00 PM",
          value_VI: "16:00 - 17:00",
        },

        // POSITION
        { type: "POSITION", key: "P0", value_EN: "None", value_VI: "Bác sĩ" },
        {
          type: "POSITION",
          key: "P1",
          value_EN: "Master",
          value_VI: "Thạc sĩ",
        },
        {
          type: "POSITION",
          key: "P2",
          value_EN: "Doctor",
          value_VI: "Tiến sĩ",
        },
        {
          type: "POSITION",
          key: "P3",
          value_EN: "Associate Professor",
          value_VI: "Phó giáo sư",
        },
        {
          type: "POSITION",
          key: "P4",
          value_EN: "Professor",
          value_VI: "Giáo sư",
        },

        // GENDER
        { type: "GENDER", key: "M", value_EN: "Male", value_VI: "Nam" },
        { type: "GENDER", key: "F", value_EN: "Female", value_VI: "Nữ" },
        { type: "GENDER", key: "O", value_EN: "Other", value_VI: "Khác" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("allcodes", null, {});
  },
};
