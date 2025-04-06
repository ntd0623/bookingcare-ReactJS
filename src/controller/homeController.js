import db from "../models/index";
import CRUDServiec from "../services/CRUDServiec";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log("-------------------------------------");
    console.log(data);
    console.log("-------------------------------------");
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDServiec.createNewUser(req.body);
  console.log(message);
  return res.send("Post CRUD");
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  console.log(req.query.id);
  if (userId) {
    let userData = await CRUDServiec.getUserInfoById(userId);
    if (userData) {
      return res.render("editCrud.ejs", {
        data: userData,
      });
    }
  } else {
    return res.send("Users not found ");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUser = await CRUDServiec.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUser,
  });
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDServiec.getAllUser();
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDServiec.deleteUserById(id);
    return res.send("delete user success");
  } else {
    res.send("Not found user");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
