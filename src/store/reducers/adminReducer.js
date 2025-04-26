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
      console.log("Fetch gender success: ", action);
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
      console.log("Fetch position success: ", action);
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
      console.log("Fetch role success: ", action);

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
      console.log("Fetch user success: ", action);
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

    default:
      return state;
  }
};

export default adminReducer;
