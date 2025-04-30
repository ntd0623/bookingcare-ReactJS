import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getTopDoctorHome,
  getAllDoctor,
  createDoctorInfo,
  getDetailInfoDoctor,
  getContentMarkdownByDoctorId,
  updateContentMarkdown,
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

export const getAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllDoctor();
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        dispatch(getAllDoctosSuccess(response.data));
      } else {
        dispatch(getAllDoctorsFailed());
      }
    } catch (e) {
      dispatch(getAllDoctorsFailed());
      console.log("get all doctor: ", e);
    }
  };
};

export const getAllDoctosSuccess = (data) => ({
  type: actionTypes.GET_ALL_DOCTORS_SUCCESS,
  data,
});

export const getAllDoctorsFailed = () => ({
  type: actionTypes.GET_TOP_DOCTOR_FAILED,
});

export const createInfoDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await createDoctorInfo(data);
      if (response && response.errCode === 0) {
        toast.success("Tạo thông tin bác sĩ thành công!");
        dispatch(createInfoDoctorSuccess());
      } else {
        dispatch(createInfoDoctorFailed());
      }
    } catch (e) {
      dispatch(createInfoDoctorFailed());
      console.log("create doctor info: ", e);
    }
  };
};

export const createInfoDoctorSuccess = () => ({
  type: actionTypes.CREATE_DOCTOR_INFO_SUCCESS,
});

export const createInfoDoctorFailed = () => ({
  type: actionTypes.CREATE_DOCTOR_INFO_FAILED,
});

export const getDetailInfoDoctorById = (id) => {
  return async (dispatch, getState) => {
    try {
      let response = await getDetailInfoDoctor(id);
      if (response && response.errCode === 0) {
        dispatch(getDetailInfoDoctorSuccess(response.data));
      } else {
        dispatch(getDetailInfoDoctorFailed());
      }
    } catch (e) {
      dispatch(getDetailInfoDoctorFailed());
      console.log("get doctor info: ", e);
    }
  };
};
export const getDetailInfoDoctorSuccess = (doctor) => ({
  type: actionTypes.GET_DETAIL_INFO_DOCTOR_SUCCESS,
  data: doctor,
});

export const getDetailInfoDoctorFailed = () => ({
  type: actionTypes.GET_DETAIL_INFO_DOCTOR_FAILED,
});

export const getContentMarkdown = (id) => {
  return async (dispatch, getState) => {
    try {
      let response = await getContentMarkdownByDoctorId(id);
      if (response && response.errCode === 0) {
        dispatch(getContentMarkdownSuccess(response.data));
        return response;
      } else {
        dispatch(getContentMarkdownFailed());
      }
    } catch (e) {
      dispatch(getContentMarkdownFailed());
      console.log("get doctor info: ", e);
    }
  };
};

export const getContentMarkdownSuccess = (data) => ({
  type: actionTypes.GET_CONTENT_MARKDOWN_SUCCESS,
  data: data,
});

export const getContentMarkdownFailed = () => ({
  type: actionTypes.GET_CONTENT_MARKDOWN_FAILED,
});

export const handleUpdateContentMarkdown = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await updateContentMarkdown(data);
      if (response && response.errCode === 0) {
        toast.success("Cập nhập thông tin bác sĩ thành công ");
        dispatch(updateContentMarkdownSuccess());
        return response;
      } else {
        dispatch(updateContentMarkdownFailed());
      }
    } catch (e) {
      dispatch(updateContentMarkdownFailed());
      console.log("get doctor info: ", e);
    }
  };
};

export const updateContentMarkdownSuccess = () => ({
  type: actionTypes.UPDATE_CONTENT_MARKDOWN_SUCCESS,
});

export const updateContentMarkdownFailed = () => ({
  type: actionTypes.UPDATE_CONTENT_MARKDOWN_FAILED,
});
