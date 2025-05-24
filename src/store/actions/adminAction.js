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
  createSchedules,
  getScheduleByDate,
  getDoctorInfo,
  createInfoSpecialty,
  getAllSpecialty,
  createInfoClinic,
  getAllClinic

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
        return response.data;
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
        toast.error("Lỗi Cập Nhập Bác Sĩ !");
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

export const getScheduleTimes = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllCodeService("TIME");
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        dispatch(getScheduleTimesSuccess(response.data));
      } else {
        dispatch(getScheduleTimesFailed());
      }
    } catch (e) {
      dispatch(getScheduleTimesFailed());
      console.log("get schedule times: ", e);
    }
  };
};

export const getScheduleTimesSuccess = (data) => ({
  type: actionTypes.GET_SCHEDULE_TIMES_SUCCESS,
  data,
});

export const getScheduleTimesFailed = () => ({
  type: actionTypes.GET_SCHEDULE_TIMES_FAILED,
});

export const handleCreateSchedules = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await createSchedules(data);
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        toast.success("Add schedule is success");
        dispatch(handleCreateSchedulesSuccess());
      } else {
        dispatch(handleCreateSchedulesFailed());
      }
    } catch (e) {
      dispatch(handleCreateSchedulesFailed());
      console.log("get schedule times: ", e);
    }
  };
};

export const handleCreateSchedulesSuccess = () => ({
  type: actionTypes.CREATE_SCHEDULES_SUCCESS,
});

export const handleCreateSchedulesFailed = () => ({
  type: actionTypes.CREATE_SCHEDULES_FAILED,
});

export const handleGetScheduleByDate = (doctorID) => {
  return async (dispatch, getState) => {
    try {
      let response = await getScheduleByDate(doctorID);
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        dispatch(hanleGetScheduleByDateSuccess(response.data));
        return response.data;
      } else {
        dispatch(hanleGetScheduleByDateFailed());
      }
    } catch (e) {
      dispatch(hanleGetScheduleByDateFailed());
      console.log("get schedules: ", e);
    }
  };
};

export const hanleGetScheduleByDateSuccess = (data) => ({
  type: actionTypes.GET_SCHEDULE_BY_DATE_SUCCESS,
  data: data,
});

export const hanleGetScheduleByDateFailed = () => ({
  type: actionTypes.GET_SCHEDULE_BY_DATE_FAILED,
});

export const getPriceMedicalExamination = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllCodeService("PRICE");
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        dispatch(getPriceMedicalExaminationSuccess(response.data));
      } else {
        dispatch(getPriceMedicalExaminationFailed());
      }
    } catch (e) {
      dispatch(getPriceMedicalExaminationFailed());
      console.log("get medical examination: ", e);
    }
  };
};

export const getPriceMedicalExaminationSuccess = (prices) => ({
  type: actionTypes.GET_PRICE_MEDICAL_EXAMINATION_SUCCESS,
  data: prices,
});

export const getPriceMedicalExaminationFailed = () => ({
  type: actionTypes.GET_PRICE_MEDICAL_EXAMINATION_FAILED,
});

export const getPaymentMedthod = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllCodeService("PAYMENT");
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        dispatch(getPaymentMedthodSuccess(response.data));
      } else {
        dispatch(getPaymentMedthodFailed());
      }
    } catch (e) {
      dispatch(getPaymentMedthodFailed());
      console.log("get payment medthod: ", e);
    }
  };
};

export const getPaymentMedthodSuccess = (data) => ({
  type: actionTypes.GET_PAYMENT_METHOD_SUCCESS,
  data: data,
});

export const getPaymentMedthodFailed = () => ({
  type: actionTypes.GET_PAYMENT_METHOD_FAILED,
});

export const getProvince = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllCodeService("PROVINCE");
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        dispatch(getProvinceSuccess(response.data));
      } else {
        dispatch(getProvinceFailed());
      }
    } catch (e) {
      dispatch(getPaymentMedthodFailed());
      console.log("get province: ", e);
    }
  };
};

export const getProvinceSuccess = (data) => ({
  type: actionTypes.GET_PROVINCE_SUCCESS,
  data,
});

export const getProvinceFailed = () => ({
  type: actionTypes.GET_PROVINCE_FAILED,
});

export const getDoctorInfoByID = (doctorID) => {
  return async (dispatch, getState) => {
    try {
      let response = await getDoctorInfo(doctorID);
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        dispatch(getDoctorInfoByIDSuccess(response.data));
      } else {
        dispatch(getProvinceFailed());
      }
    } catch (e) {
      dispatch(getDoctorInfoByIDFailed());
      console.log("get doctor-info by id: ", e);
    }
  };
};

export const getDoctorInfoByIDSuccess = (data) => ({
  type: actionTypes.GET_DOCTOR_INFO_SUCCESS,
  data: data,
});

export const getDoctorInfoByIDFailed = () => ({
  type: actionTypes.GET_DOCTOR_INFO_FAILED,
});


export const handleCreateInforSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await createInfoSpecialty(data);
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        dispatch(handleCreateInforSpecialtySuccess());
        toast.success("Add Information Specialty Success");

      } else {
        dispatch(handleCreateInforSpecialtyFailed());
      }
    } catch (e) {
      dispatch(handleCreateInforSpecialtyFailed());
      console.log("create infor specialty: ", e);
    }
  };
}

export const handleCreateInforSpecialtySuccess = () => ({
  type: actionTypes.CREATE_INFOR_SPECIALTY_SUCCESS
});

export const handleCreateInforSpecialtyFailed = () => ({
  type: actionTypes.CREATE_INFOR_SPECIALTY_FAILED

})


export const handleGetAllSpecialty = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllSpecialty();
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        dispatch(handleGetAllSpecialtySuccess(response.data));
      } else {
        dispatch(handleGetAllSpecialtyFailed());
      }
    } catch (e) {
      dispatch(handleGetAllSpecialtyFailed());
      console.log("get all  specialty: ", e);
    }
  };
}

export const handleGetAllSpecialtySuccess = (data) => ({
  type: actionTypes.GET_ALL_SPECIALTY_SUCCESS,
  data: data
})

export const handleGetAllSpecialtyFailed = () => ({
  type: actionTypes.GET_ALL_SPECIALTY_FAILED
})



export const handleCreateInforClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await createInfoClinic(data);
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        dispatch(handleCreateInforClinicSuccess());
        toast.success("Add Information Clinic Success");

      } else {
        dispatch(handleCreateInforClinicFailed());
      }
    } catch (e) {
      dispatch(handleCreateInforClinicFailed());
      console.log("create infor Clinic: ", e);
    }
  };
}

export const handleCreateInforClinicSuccess = () => ({
  type: actionTypes.CREATE_INFOR_CLINIC_SUCCESS
});

export const handleCreateInforClinicFailed = () => ({
  type: actionTypes.CREATE_INFOR_CLINIC_FAILED

})



export const handleGetAllClinic = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllClinic();
      console.log("Check response: ", response);
      if (response && response.errCode === 0) {
        dispatch(handleGetAllClinicSuccess(response.data));
      } else {
        dispatch(handleGetAllClinicFailed());
      }
    } catch (e) {
      dispatch(handleGetAllClinicFailed());
      console.log("get all  Clinic: ", e);
    }
  };
}

export const handleGetAllClinicSuccess = (data) => ({
  type: actionTypes.GET_ALL_CLINIC_SUCCESS,
  data: data
})

export const handleGetAllClinicFailed = () => ({
  type: actionTypes.GET_ALL_CLINIC_FAILED
})

