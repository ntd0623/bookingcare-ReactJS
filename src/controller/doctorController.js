const doctorService = require("../services/doctorService");
let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 10;
  }
  try {
    let doctor = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json({
      errCode: 0,
      data: doctor,
    });
  } catch (e) {
    console.log("Error: ", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from service",
    });
  }
};

let getAllDoctor = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctorService();
    return res.status(200).json({
      errCode: 0,
      data: doctors,
    });
  } catch (e) {
    console.log("Error: ", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from service",
    });
  }
};

let handleCreateInfoDoctor = async (req, res) => {
  try {
    let doctor = await doctorService.createInfoDoctor(req.body);
    return res.status(200).json(doctor);
  } catch (e) {
    console.log("Error: ", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from service",
    });
  }
};

let getDetailDoctor = async (req, res) => {
  try {
    let infoDoctor = await doctorService.getInfoDoctor(req.query.id);
    return res.status(200).json(infoDoctor);
  } catch (e) {
    console.log("Error: ", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server !",
    });
  }
};

let getContentMarkdownByDoctorID = async (req, res) => {
  try {
    let content = await doctorService.getContentMarkdown(req.query.id);
    return res.status(200).json(content);
  } catch (e) {
    console.log("Error: ", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server !",
    });
  }
};

let updateContentMarkdown = async (req, res) => {
  try {
    let content = await doctorService.handleUpdateContentMarkdown(req.body);
    return res.status(200).json(content);
  } catch (e) {
    console.log("Error: ", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server !",
    });
  }
};

let createSchedules = async (req, res) => {
  {
    try {
      let schedules = await doctorService.handleCreateSchedules(req.body);
      return res.status(200).json(schedules);
    } catch (e) {
      console.log("Error: ", e);
      return res.status(200).json({
        errCode: -1,
        message: "Error from server !",
      });
    }
  }
};

let getScheduleByDate = async (req, res) => {
  try {
    console.log("Check doctor ID: ", req.query.id);
    let schedule = await doctorService.handleGetScheduleByDate(req.query.id);
    return res.status(200).json(schedule);
  } catch (e) {
    console.log("Error: ", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server !",
    });
  }
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  handleCreateInfoDoctor: handleCreateInfoDoctor,
  getDetailDoctor: getDetailDoctor,
  getContentMarkdownByDoctorID: getContentMarkdownByDoctorID,
  updateContentMarkdown: updateContentMarkdown,
  createSchedules: createSchedules,
  getScheduleByDate: getScheduleByDate,
};
