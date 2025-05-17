import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  isLoadingPosition: false,
  isLoadingRole: false,
  isLoadingUser: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  dataDoctor: [],
  doctors: [],
  doctor: null,
  content: [],
  scheduleTimes: [],
  schedulesDoctor: [],
  prices: [],
  paymentMethods: [],
  provinces: [],
  listDoctorInfo: [],
  listSpecialty: []
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // Gender
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.isLoadingGender = false;
      state.genders = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };

    // Position
    case actionTypes.FETCH_POSITION_START:
      state.isLoadingPosition = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.isLoadingPosition = false;
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.isLoadingPosition = false;
      state.positions = [];
      return {
        ...state,
      };

    // Role

    case actionTypes.FETCH_ROLE_START:
      state.isLoadingRole = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.isLoadingRole = false;
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.isLoadingRole = false;
      state.roles = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      state.isLoadingUser = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      state.isLoadingUser = false;
      return {
        ...state,
      };

    case actionTypes.GET_TOP_DOCTOR_SUCCESS:
      return {
        ...state,
        dataDoctor: action.data,
      };
    case actionTypes.GET_TOP_DOCTOR_FAILED:
      state.dataDoctor = [];
      return {
        ...state,
      };

    case actionTypes.GET_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        doctors: action.data,
      };

    case actionTypes.GET_ALL_DOCTORS_FAILED:
      return {
        ...state,
        doctors: [],
      };

    case actionTypes.GET_DETAIL_INFO_DOCTOR_SUCCESS:
      return {
        ...state,
        doctor: action.data,
      };
    case actionTypes.GET_DETAIL_INFO_DOCTOR_FAILED:
      return {
        ...state,
        doctor: null,
      };

    case actionTypes.GET_CONTENT_MARKDOWN_SUCCESS:
      return {
        ...state,
        content: action.data,
      };

    case actionTypes.GET_CONTENT_MARKDOWN_FAILED:
      return {
        ...state,
        content: [],
      };

    case actionTypes.GET_SCHEDULE_TIMES_SUCCESS:
      return {
        ...state,
        scheduleTimes: action.data,
      };
    case actionTypes.GET_SCHEDULE_TIMES_FAILED:
      return {
        ...state,
        scheduleTimes: [],
      };

    case actionTypes.GET_SCHEDULE_BY_DATE_SUCCESS:
      return {
        ...state,
        schedulesDoctor: action.data,
      };

    case actionTypes.GET_SCHEDULE_BY_DATE_FAILED:
      return {
        ...state,
        schedulesDoctor: [],
      };

    case actionTypes.GET_PRICE_MEDICAL_EXAMINATION_SUCCESS:
      return {
        ...state,
        prices: action.data,
      };
    case actionTypes.GET_PRICE_MEDICAL_EXAMINATION_FAILED:
      return {
        ...state,
        prices: [],
      };

    case actionTypes.GET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        paymentMethods: action.data,
      };
    case actionTypes.GET_PAYMENT_METHOD_FAILED:
      return {
        ...state,
        paymentMethods: [],
      };

    case actionTypes.GET_PROVINCE_SUCCESS:
      return {
        ...state,
        provinces: action.data,
      };

    case actionTypes.GET_PROVINCE_FAILED:
      return {
        ...state,
        provinces: [],
      };

    case actionTypes.GET_DOCTOR_INFO_SUCCESS:
      return {
        ...state,
        listDoctorInfo: action.data,
      };

    case actionTypes.GET_DOCTOR_INFO_FAILED:
      return {
        ...state,
        listDoctorInfo: [],
      };

    case actionTypes.GET_ALL_SPECIALTY_SUCCESS:
      return {
        ...state,
        listSpecialty: action.data
      }
    case actionTypes.GET_ALL_SPECIALTY_FAILED:
      return {
        ...state,
        listSpecialty: []
      }
    default:
      return state;
  }
};

export default adminReducer;
