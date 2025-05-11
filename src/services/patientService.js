const db = require("../models/index");
let handleCreateInfoPatient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorID || !data.timeType) {
        reject({
          errCode: -1,
          message: "Missing parameter !",
        });
      }
      let user = await db.User.findOrCreate({
        where: { email: data.email },
        defaults: {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
          roleID: "R3",
        },
      });
      if (user) {
        await db.Bookings.findOrCreate({
          where: {
            patientID: user[0].id,
            date: data.date,
            timeType: data.timeType,
          },
          defaults: {
            statusID: "",
            doctorID: data.doctorID,
            // date: data.date,
            // timeType: data.timeType,
            reason: data.reason,
          },
        });
      }
      resolve({
        errCode: 0,
        message: "Create user success !",
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleCreateInfoPatient: handleCreateInfoPatient,
};
