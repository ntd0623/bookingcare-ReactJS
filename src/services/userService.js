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
export { handleLoginAPI, getAllUsers, createNewUser, deleteUser, updateUser };
