import axios from "../axios";
const handleLoginAPI = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-user?type=${inputId}`);
};

const createNewUser = (data) => {
  console.log("Check data: ", data);
  return axios.post(`/api/create-new-user`, data);
};

const deleteUser = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const updateUser = (user) => {
  return axios.put("/api/edit-user", user);
};

const getAllCodeService = (data) => {
  return axios.get(`/api/allcodes?type=${data}`);
};

const getTopDoctorHome = (limit) => {
  return axios.get(`/api/get-top-doctor-home?limit=${limit}`);
};

const getAllDoctor = () => {
  return axios.get(`/api/get-all-doctor`);
};

const createDoctorInfo = (data) => {
  return axios.post(`/api/create-info-doctor`, data);
};

const getDetailInfoDoctor = (data) => {
  return axios.get(`/api/get-detail-doctor?id=${data}`);
};
const getContentMarkdownByDoctorId = (doctorId) => {
  return axios.get(`/api/get-content-markdown?id=${doctorId}`);
};

const updateContentMarkdown = (data) => {
  return axios.put("/api/update-content-markdown", data);
};
const createSchedules = (data) => {
  return axios.post(`/api/bulk-create-schedules`, data);
};

const getScheduleByDate = (doctorID, date) => {
  return axios.get(`api/get-schedule-by-date?id=${doctorID}`);
};

const getDoctorInfo = (doctorID) => {
  return axios.get(`api/get-doctor-info-by-id?id=${doctorID}`);
};

const getProfileDoctor = (doctorID) => {
  return axios.get(`api/get-profile-doctor-by-id?id=${doctorID}`);
};

const createPatientInfo = (data) => {
  return axios.post(`/api/create-info-patient`, data);
};

const veryfyBookingAppoitment = (data) => {
  return axios.post(`/api/verify-booking-appointment`, data);
};

const createInfoSpecialty = (data) => {
  return axios.post(`api/create-infor-specialty`, data);

}

const getAllSpecialty = () => {
  return axios.get(`api/get-all-specialty`);
}
export {
  handleLoginAPI,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
  getAllCodeService,
  getTopDoctorHome,
  getAllDoctor,
  createDoctorInfo,
  getDetailInfoDoctor,
  getContentMarkdownByDoctorId,
  updateContentMarkdown,
  createSchedules,
  getScheduleByDate,
  getDoctorInfo,
  getProfileDoctor,
  createPatientInfo,
  veryfyBookingAppoitment,
  createInfoSpecialty,
  getAllSpecialty
};
