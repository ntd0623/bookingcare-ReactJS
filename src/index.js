import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";
import { Provider } from "react-redux";
import reduxStore, { persistor } from "./redux";
import * as actions from "./store/actions";
import './styles/tailwind.css';
import './styles/common.scss';
window.addEventListener("storage", (event) => {
  if (event.key === "language") {
    const newLanguage = event.newValue;
    // Dispatch action để cập nhật ngôn ngữ trên tất cả các tab
    reduxStore.dispatch(actions.changeLanguage(newLanguage, true));
  }
});
const renderApp = () => {
  ReactDOM.render(
    <Provider store={reduxStore}>
      <IntlProviderWrapper>
        <App persistor={persistor} />
      </IntlProviderWrapper>
    </Provider>,
    document.getElementById("root")
  );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
