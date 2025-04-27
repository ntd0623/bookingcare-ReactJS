import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getTopDoctorHome,
} from "../../services/userService";
import { act } from "react";
import { toast } from "react-hot-toast";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

// Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let response = await getAllCodeService("GENDER");
      if (response && response.errCode === 0) {
        dispatch(fetchGenderSuccess(response.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error: ", e);
    }
  };
};
export const fetchGenderSuccess = (gender) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: gender,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      let response = await getAllCodeService("POSITION");
      if (response && response.errCode === 0) {
        dispatch(fetchPositionSuccess(response.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchGenderStart error: ", e);
    }
  };
};
export const fetchPositionSuccess = (position) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: position,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      let response = await getAllCodeService("ROLE");
      if (response && response.errCode === 0) {
        dispatch(fetchRoleSuccess(response.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error: ", e);
    }
  };
};
export const fetchRoleSuccess = (role) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: role,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const handleCreateNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await createNewUser(data);
      if (response && response.errCode === 0) {
        toast.success("Tạo người dùng thành công!");
        dispatch(createNewUserSuccess(response.data));
        dispatch(fetchAllUserStart());
      } else {
        dispatch(createNewUserFailed());
      }
    } catch (e) {
      dispatch(createNewUserFailed());
      console.log("create new user error: ", e);
    }
  };
};

export const createNewUserSuccess = () => ({
  type: actionTypes.CREATE_NEW_USER_SUCCESS,
});

export const createNewUserFailed = () => ({
  type: actionTypes.CREATE_NEW_USER_FAILED,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllUsers("ALL");
      let doctor = await getTopDoctorHome(5);
      console.log("check doctor home: ", doctor);
      if (response && response.errCode === 0) {
        dispatch(fetchAllUserSuccess(response.users.reverse()));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchAllUserStart error: ", e);
      toast.error("Có lỗi xảy ra khi tạo người dùng!");
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const handleDeleteUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await deleteUser(data);
      if (response && response.errCode === 0) {
        toast.success("Xóa người dùng thành công!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Xóa người dùng thất bại !");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Lỗi server !");

      dispatch(deleteUserFailed());
      console.log("delete new user error: ", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const handleUpdateUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await updateUser(data);
      if (response && response.errCode === 0) {
        toast.success("Cập nhập người dùng thành công!");
        dispatch(updateUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Cập nhập người dùng thất bại !");
        dispatch(updateUserFailed());
      }
    } catch (e) {
      dispatch(updateUserFailed());
      toast.error("Lỗi Server !");
      console.log("create new user error: ", e);
    }
  };
};

export const updateUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});

export const updateUserFailed = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});

export const getTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getTopDoctorHome("10");
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        dispatch(getTopDoctorSuccess(response.data));
      } else {
        dispatch(getTopDoctorFailed());
      }
    } catch (e) {
      dispatch(getTopDoctorFailed());
      console.log("get top doctor: ", e);
    }
  };
};

export const getTopDoctorSuccess = (data) => ({
  type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
  data,
});

export const getTopDoctorFailed = () => ({
  type: actionTypes.GET_TOP_DOCTOR_FAILED,
});
