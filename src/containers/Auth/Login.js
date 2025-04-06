import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlus,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { flatMap } from "lodash";
import { handleLoginAPI } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginAPI(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="login-background">
          <div className="login-container">
            <div className="login-content row">
              <div className="col-12 text-login">Login</div>
              <div className="col-12 form-group login-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="UserName or Email"
                  value={this.state.username}
                  onChange={(event) => this.handOnChangeUserName(event)}
                />
              </div>
              <div className="col-12 form-group login-input">
                <div className="custom-input-password">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={(event) => this.handOnChangePassword(event)}
                  />
                  <span onClick={() => this.handleShowHidePassword()}>
                    <i>
                      <FontAwesomeIcon
                        icon={!this.state.isShowPassword ? faEyeSlash : faEye}
                      />
                    </i>
                  </span>
                </div>
              </div>
              <div className="col-12">
                <a className="forgot-password">Forgot your password ?</a>
              </div>
              <div className="col-12">{this.state.errMessage}</div>
              <div className="col-12">
                <button
                  className="btn-primary btn-login"
                  onClick={() => this.handleLogin()}
                >
                  Login
                </button>
              </div>
              <div className="col-12">
                <span className="sign-up">
                  Don't have an account ? <a>Sign up</a>
                </span>
                <span className="text-center">Or Login With</span>
              </div>
              <div className="col-12 social-login">
                <i>
                  <FontAwesomeIcon icon={faGooglePlus} className="google" />
                </i>
                <i>
                  <FontAwesomeIcon className="facebook" icon={faFacebook} />
                </i>
                <i>
                  <FontAwesomeIcon icon={faGithub} className="github" />
                </i>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
