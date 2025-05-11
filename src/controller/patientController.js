const patientService = require("../services/patientService");
let createInfoPatient = async (req, res) => {
  try {
    let patient = await patientService.handleCreateInfoPatient(req.body);
    return res.status(200).json(patient);
  } catch (e) {
    console.log("Error: ", e);
    return res.status(200).json({
      errCode: 1,
      message: "Error from server !",
    });
  }
};
module.exports = {
  createInfoPatient: createInfoPatient,
};
