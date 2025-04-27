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
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
};
