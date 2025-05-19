const { where } = require("sequelize");
const db = require("../models/index");
const { raw } = require("body-parser");
import _, { includes } from "lodash";
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

let checkRequiredFields = (dataInput) => {
  let requiredFields = [
    "id",
    "contentMarkdown",
    "contentHTML",
    "priceID",
    "provinceID",
    "paymentID",
    "nameClinic",
    "addressClinic",
    "doctorID",
    "specialtyID"
  ];
  for (let field of requiredFields) {
    if (!dataInput[field] || dataInput[field] === "") {
      return {
        isValid: false,
        missing: field
      }
    }
  }
  return { isValid: true }
}

let createInfoDoctor = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Check dataInput creaate: ", dataInput);
      let isValid = checkRequiredFields(dataInput)
      if (!isValid.isValid) {
        resolve({
          errCode: 1,
          message: `Missing ${isValid.missing}!`,
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
        let infoDoctor = await db.Doctor_Info.findOne({
          where: { doctorID: dataInput.doctorID },
        });
        if (!infoDoctor) {
          await db.Doctor_Info.create({
            doctorID: dataInput.doctorID,
            priceID: dataInput.priceID,
            provinceID: dataInput.provinceID,
            paymentID: dataInput.paymentID,
            addressClinic: dataInput.addressClinic,
            nameClinic: dataInput.nameClinic,
            specialtyID: dataInput.specialtyID,
            note: dataInput.note,
          });
        } else {
          await db.Doctor_Info.update(
            {
              priceID: dataInput.priceID,
              provinceID: dataInput.provinceID,
              paymentID: dataInput.paymentID,
              addressClinic: dataInput.addressClinic,
              nameClinic: dataInput.nameClinic,
              specialtyID: dataInput.specialtyID,
              note: dataInput.note,
            },
            {
              where: { doctorID: dataInput.doctorID },
            }
          );
        }
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
              attributes: ["id", "contentHTML", "contentMarkdown", "description"],
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
            {
              model: db.Doctor_Info,
              attributes: {
                exclude: ["id", "doctorID", "count", "updatedAt", "createdAt"],
              },
              include: [
                {
                  model: db.Allcodes,
                  as: "priceData",
                  attributes: ["key", "value_VI", "value_EN"],
                },
                {
                  model: db.Allcodes,
                  as: "paymentData",
                  attributes: ["key", "value_VI", "value_EN"],
                },
                {
                  model: db.Allcodes,
                  as: "provinceData",
                  attributes: ["key", "value_VI", "value_EN"],
                },
              ],
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
      console.log("Check dataInput Update: ", dataInput);

      let isValid = checkRequiredFields(dataInput)
      if (!isValid.isValid) {
        resolve({
          errCode: 1,
          message: `Missing ${isValid.missing}!`,
        });
      } else {
        let content = await db.Markdown.findOne({
          where: [{ id: dataInput.id },
          { doctorID: dataInput.doctorID }
          ]
        });
        if (content) {
          await db.Markdown.update(
            {
              contentHTML: dataInput.contentHTML,
              contentMarkdown: dataInput.contentMarkdown,
              description: dataInput.description,
              doctorID: dataInput.doctorID,
              specialtyID: dataInput.specialtyID,
            },
            {
              where: { id: dataInput.id },
            }
          );
        }
        let infoDoctor = await db.Doctor_Info.findOne({
          where: { doctorID: dataInput.doctorID },
        });
        if (!infoDoctor) {
          await db.Doctor_Info.create({
            doctorID: dataInput.doctorID,
            priceID: dataInput.priceID,
            provinceID: dataInput.provinceID,
            paymentID: dataInput.paymentID,
            specialtyID: dataInput.specialtyID,
            addressClinic: dataInput.addressClinic,
            nameClinic: dataInput.nameClinic,
            note: dataInput.note,
          });
        } else {
          await db.Doctor_Info.update(
            {
              priceID: dataInput.priceID,
              provinceID: dataInput.provinceID,
              paymentID: dataInput.paymentID,
              addressClinic: dataInput.addressClinic,
              specialtyID: dataInput.specialtyID,
              nameClinic: dataInput.nameClinic,
              note: dataInput.note,
            },
            {
              where: { doctorID: dataInput.doctorID },
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

let handleCreateSchedules = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        reject({
          errCode: 2,
          message: "schedules is not exists !",
        });
      } else {
        let existingTime = await db.Schedule.findAll({
          where: { doctorID: data[0].doctorID, date: data[0].date },
          attributes: ["maxNumber", "date", "timeType", "doctorID"],
          raw: true,
        });
        if (existingTime && existingTime.length > 0) {
          existingTime = existingTime.map((item) => {
            item.date = new Date(item.date).getTime();
            return item;
          });
        }
        let toCreate = _.differenceWith(data, existingTime, (a, b) => {
          return a.timeType === b.timeType && a.date === b.date;
        });
        let schedules = await db.Schedule.bulkCreate(toCreate);
        if (schedules) {
          console.log("Check schedules: ", schedules);
          resolve({
            errCode: 0,
            message: "Create schedule is success",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetScheduleByDate = (doctorID) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorID) {
        reject({
          errCode: -2,
          message: "Missing parameter !",
        });
      } else {
        let schedule = await db.Schedule.findAll({
          where: { doctorID: doctorID },
          include: [
            {
              model: db.Allcodes,
              as: "timeTypeData",
              attributes: ["value_VI", "value_EN"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (schedule && schedule.length > 0) {
          console.log("Check schedules: ", schedule);
          resolve({
            errCode: 0,
            data: schedule,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetDoctorInfo = (doctorID) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorID) {
        reject({
          errCode: -1,
          message: "Missing parameter !",
        });
      }
      let doctorInfo = await db.Doctor_Info.findOne({
        where: { doctorID: doctorID },
        attributes: [
          "priceID",
          "provinceID",
          "paymentID",
          "addressClinic",
          "nameClinic",
          "note",
        ],
        include: [
          {
            model: db.Allcodes,
            as: "priceData",
            attributes: ["key", "value_VI", "value_EN"],
          },
          {
            model: db.Allcodes,
            as: "paymentData",
            attributes: ["key", "value_VI", "value_EN"],
          },
          {
            model: db.Allcodes,
            as: "provinceData",
            attributes: ["key", "value_VI", "value_EN"],
          },
        ],
      });
      resolve({
        errCode: 0,
        data: doctorInfo,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetProfileDoctor = (doctorID) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorID) {
        reject({
          errCode: 2,
          message: "ID doctor is not exists !",
        });
      } else {
        let info = await db.User.findOne({
          where: { id: doctorID },
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
            {
              model: db.Doctor_Info,
              attributes: {
                exclude: ["id", "doctorID", "count", "updatedAt", "createdAt"],
              },
              include: [
                {
                  model: db.Allcodes,
                  as: "priceData",
                  attributes: ["key", "value_VI", "value_EN"],
                },
                {
                  model: db.Allcodes,
                  as: "paymentData",
                  attributes: ["key", "value_VI", "value_EN"],
                },
                {
                  model: db.Allcodes,
                  as: "provinceData",
                  attributes: ["key", "value_VI", "value_EN"],
                },
              ],
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
  handleCreateSchedules: handleCreateSchedules,
  handleGetScheduleByDate: handleGetScheduleByDate,
  handleGetDoctorInfo: handleGetDoctorInfo,
  handleGetProfileDoctor: handleGetProfileDoctor,
};
