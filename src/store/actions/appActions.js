import actionTypes from "./actionTypes";

export const appStartUpComplete = () => ({
  type: actionTypes.APP_START_UP_COMPLETE,
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
  type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
  contentOfConfirmModal: contentOfConfirmModal,
});

export const changeLanguage = (language, fromStorageEvent = false) => {
  if (!fromStorageEvent) {
    localStorage.setItem("language", language);
  }

  const event = new Event("languageChange");
  window.dispatchEvent(event);

  return {
    type: actionTypes.CHANGE_LANGUAGE,
    language,
  };
};
