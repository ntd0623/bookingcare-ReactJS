const userService = require("../services/userService");

// Handle Login
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

// Handle get AllUser
let handleGetAllUsers = async (req, res) => {
  let id = req.query.type; // All, Single
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing parameter",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  console.log("Users: ", users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users: users,
  });
};

let handleCreateUser = async (req, res) => {
  let user = await userService.createNewUser(req.body);
  return res.status(200).json(user);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameter !",
    });
  }
  let user = await userService.deleteUser(req.body.id);
  return res.status(200).json(user);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUser(data);
  return res.status(200).json(message);
};

let getAllCodes = async (req, res) => {
  let data = await userService.getAllCodeService(req.query.type);
  return res.status(200).json(data);
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateUser: handleCreateUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCodes: getAllCodes,
};
