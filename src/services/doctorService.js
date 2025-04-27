const db = require("../models/index");
let getTopDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.User.findAll({
        limit: limit,
        where: { roleID: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcodes,
            as: "roleData",
            attributes: ["value_VI", "value_EN"],
          },
          {
            model: db.Allcodes,
            as: "positionData",
            attributes: ["value_VI", "value_EN"],
          },
          {
            model: db.Allcodes,
            as: "genderData",
            attributes: ["value_VI", "value_EN"],
          },
        ],
      });
      resolve(doctor);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
};
