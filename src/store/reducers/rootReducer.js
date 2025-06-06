import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};
const adminPersistConfig = {
  ...persistCommonConfig,
  key: "admin",
  whitelist: ["isLoggedIn", "adminInfo"],
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "admin",
  whitelist: ["isLoggedIn", "userInfo"],
};

const appPersistConfig = {
  ...persistCommonConfig,
  key: "app",
  whitelist: ["language"],
};

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: (appPersistConfig, appReducer),
    admin: adminReducer,
  });
