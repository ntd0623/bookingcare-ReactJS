import express from "express";
const homeController = require("../controller/homeController");
const userController = require("../controller/userController");
const doctorController = require("../controller/doctorController");
let router = express.Router();
let initWebRoutes = (app) => {
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
  router.delete("/api/delete-user", userController.handleDeleteUser);

  router.get("/api/allcodes", userController.getAllCodes);

  router.get("/api/get-top-doctor-home", doctorController.getTopDoctorHome);

  router.get("/api/get-all-doctor", doctorController.getAllDoctor);

  router.post(
    "/api/create-info-doctor",
    doctorController.handleCreateInfoDoctor
  );

  return app.use("/", router);
};
module.exports = initWebRoutes;
