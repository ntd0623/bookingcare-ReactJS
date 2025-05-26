import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
import { changeLanguage } from "../../store/actions";
import { adminMenu, doctorMenu } from "./menuApp";
import { FormattedMessage } from "react-intl";
import "./Header.scss";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
    };
  }

  componentDidMount() {
    let { userInfo } = this.props;
    if (userInfo && !_.isEmpty(userInfo)) {
      let menu = [];
      if (this.props.userInfo.roleID === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (this.props.userInfo.roleID === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
      this.setState({
        menu: menu,
      });
    }
  }

  handleChangeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    const { processLogout } = this.props;
    let language = this.props.language;
    let userInfo = this.props.userInfo;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menu} />
        </div>

        <div className="flex items-center justify-end gap-4 text-white pr-4 h-full">
          <span className="welcome">
            <FormattedMessage id="home-header.welcome" />{" "}
            {userInfo && userInfo.firstName && userInfo.lastName ? (
              language === 'vi'
                ? `${userInfo.firstName} ${userInfo.lastName}`
                : `${userInfo.lastName} ${userInfo.firstName}`
            ) : ""} !
          </span>

          <span
            className={`cursor-pointer ${language === LANGUAGES.VI ? "font-bold underline" : "opacity-70"}`}
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
          >
            VN
          </span>

          <span
            className={`cursor-pointer ${language === LANGUAGES.EN ? "font-bold underline" : "opacity-70"}`}
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>

          <div
            className="ml-2 cursor-pointer hover:text-gray-200"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
