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
            exclude: ["password"],
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
        if (info && info.image) {
          info.image = new Buffer(info.image, "base64").toString("binary");
        }
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

let getContentMarkdown = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        reject({
          errCode: 2,
          message: "doctor is not exists !",
        });
      } else {
        let content = await db.Markdown.findOne({
          where: { doctorID: doctorId },
        });
        resolve({
          errCode: 0,
          data: content,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleUpdateContentMarkdown = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dataInput.id) {
        reject({
          errCode: -2,
          message: "id is not exists !",
        });
      } else {
        let content = db.Markdown.findOne({
          where: { id: dataInput.id },
        });
        if (content) {
          await db.Markdown.update(
            {
              contentHTML: dataInput.contentHTML,
              contentMarkdown: dataInput.contentMarkdown,
              description: dataInput.description,
              doctorID: dataInput.doctorID,
            },
            {
              where: { id: dataInput.id },
            }
          );
        }
        resolve({
          errCode: 0,
          message: "update content markdown is success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctorService: getAllDoctorService,
  createInfoDoctor: createInfoDoctor,
  getInfoDoctor: getInfoDoctor,
  getContentMarkdown: getContentMarkdown,
  handleUpdateContentMarkdown: handleUpdateContentMarkdown,
};
