"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var homeController = require("../controller/homeController");
var userController = require("../controller/userController");
var doctorController = require("../controller/doctorController");
var patientCotroller = require("../controller/patientController");
var specialtyController = require("../controller/specialtyController");
var clinicController = require("../controller/clinicController");
var router = _express["default"].Router();
var initWebRoutes = function initWebRoutes(app) {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  // Api Login
  router.post("/api/login", userController.handleLogin);
  // Api Get all User
  router.get("/api/get-all-user", userController.handleGetAllUsers);
  // Create new user
  router.post("/api/create-new-user", userController.handleCreateUser);
  // Edit user
  router.put("/api/edit-user", userController.handleEditUser);
  // Delete user
  router["delete"]("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcodes", userController.getAllCodes);
  router.get("/api/get-top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctor", doctorController.getAllDoctor);
  router.post("/api/create-info-doctor", doctorController.handleCreateInfoDoctor);
  router.get("/api/get-detail-doctor", doctorController.getDetailDoctor);
  router.get("/api/get-content-markdown", doctorController.getContentMarkdownByDoctorID);
  router.put("/api/update-content-markdown", doctorController.updateContentMarkdown);
  router.post("/api/bulk-create-schedules", doctorController.createSchedules);
  router.get("/api/get-schedule-by-date", doctorController.getScheduleByDate);
  router.get("/api/get-doctor-info-by-id", doctorController.getDoctorInfoByID);
  router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDoctorByID);
  router.get("/api/get-patient-for-doctor", doctorController.getPatientForDoctor);
  router.post("/api/send-invoice-perscription", doctorController.sendInvoicePerscription);
  router.post("/api/create-info-patient", patientCotroller.createInfoPatient);
  router.post("/api/verify-booking-appointment", patientCotroller.verifyBookingPatient);
  router.post("/api/create-infor-specialty", specialtyController.createInforSpecialty);
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  router.get("/api/get-specialty-by-id", specialtyController.getSpecialtyByID);
  router.post("/api/create-info-clinic", clinicController.createInfoClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.get("/api/get-clinic-by-id", clinicController.getClinicByID);
  return app.use("/", router);
};
module.exports = initWebRoutes;