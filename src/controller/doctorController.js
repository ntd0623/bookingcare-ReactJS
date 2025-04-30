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
      message: "Error from serve !",
    });
  }
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  handleCreateInfoDoctor: handleCreateInfoDoctor,
  getDetailDoctor: getDetailDoctor,
};
