const { where } = require("sequelize");
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

let getAllDoctorService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleID: "R2" },
        attributes: {
          exclude: ["password", "image"],
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
      resolve(doctors);
    } catch (e) {
      reject(e);
    }
  });
};

let createInfoDoctor = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dataInput.contentHTML || !dataInput.contentMarkdown) {
        resolve({
          errCode: 1,
          message: "Missing parameter !",
        });
      } else {
        await db.Markdown.create({
          contentHTML: dataInput.contentHTML,
          contentMarkdown: dataInput.contentMarkdown,
          description: dataInput.description,
          doctorID: dataInput.doctorID,
          specialtyID: dataInput.specialtyID,
          clinicID: dataInput.clinicID,
        });
        resolve({
          errCode: 0,
          message: "Create info doctor success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getInfoDoctor = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        reject({
          errCode: 2,
          message: "ID doctor is not exists !",
        });
      } else {
        let info = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password", "image"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["contentHTML", "contentMarkdown", "description"],
            },
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
        resolve({
          errCode: 0,
          data: info,
        });
      }
    } catch (e) {
      reject({
        errCode: 1,
        message: "get detail doctor failed !",
      });
    }
  });
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctorService: getAllDoctorService,
  createInfoDoctor: createInfoDoctor,
  getInfoDoctor: getInfoDoctor,
};
