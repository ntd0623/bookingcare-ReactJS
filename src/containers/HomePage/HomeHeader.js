import React, { Component } from "react";
import { connect } from "react-redux";
import "../HomePage/HomeHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleQuestion,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FormattedMessage } from "react-intl";
import logo from "../../assets/images/bookingcare-2020.svg";
import InputSearch from "../../hoc/InputSearch";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguage } from "../../store/actions";
class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };
  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <button>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 32 32"
                  preserveAspectRatio="none"
                  fill="#969495"
                >
                  <path d="M4 10h24a2 2 0 0 0 0-4H4a2 2 0 0 0 0 4m24 4H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4m0 8H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4"></path>
                </svg>
              </button>
              <div className="logo">
                <img src={logo} />
              </div>
            </div>
            <div className="center-content">
              <div className="content-child">
                <div>
                  <b>
                    <FormattedMessage id="home-header.specialist" />
                  </b>
                </div>
                <div>
                  <FormattedMessage id="home-header.selecteddoctor" />
                </div>
              </div>
              <div className="content-child">
                <div>
                  <b>
                    <FormattedMessage id="home-header.healthcarefacility" />
                  </b>
                </div>
                <div>
                  <FormattedMessage id="home-header.selectedhopistal" />
                </div>
              </div>
              <div className="content-child">
                <div>
                  <b>
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div>
                  <FormattedMessage id="home-header.choosedoctor" />
                </div>
              </div>
              <div className="content-child">
                <div>
                  <b>
                    <FormattedMessage id="home-header.healthcheckuppackage" />
                  </b>
                </div>
                <div>
                  <FormattedMessage id="home-header.generalhealthcheckup" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i>
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </i>
                <FormattedMessage id="home-header.support" />
                <div
                  className={
                    language === LANGUAGES.VI
                      ? "language-Vie active"
                      : "language-Vie"
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                    VIE
                  </span>
                </div>
                <div
                  className={
                    language === LANGUAGES.EN
                      ? "language-En active"
                      : "language-En"
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                    EN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="home-header-banner-content-top">
            <div className="title">
              <h1>
                <FormattedMessage id="banner.healthcareplatform" />
                <br />
                <FormattedMessage id="banner.comprehensivehealthcare" />
              </h1>
            </div>
            <div className="search">
              <div className="search-content">
                <i>
                  <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                </i>

                <InputSearch />
              </div>
            </div>
          </div>
          <div className="home-header-banner-content-down">
            <div className="option">
              <div className="option-child">
                <div className="icon"></div>
                <span className="content">
                  <FormattedMessage id="check-up-package.specialist-consultation" />
                </span>
              </div>
              <div className="option-child">
                <div className="icon"></div>
                <span className="content">
                  <FormattedMessage id="check-up-package.telemedicine" />
                </span>
              </div>
              <div className="option-child">
                <div className="icon"></div>
                <span className="content">
                  <FormattedMessage id="check-up-package.general-check-up" />
                </span>
              </div>
              <div className="option-child">
                <div className="icon"></div>
                <span className="content">
                  <FormattedMessage id="check-up-package.medical-test" />
                </span>
              </div>
              <div className="option-child">
                <div className="icon"></div>
                <span className="content">
                  <FormattedMessage id="check-up-package.mental-health" />
                </span>
              </div>
              <div className="option-child">
                <div className="icon"></div>
                <span className="content">
                  <FormattedMessage id="check-up-package.dental-check-up" />
                </span>
              </div>
              <div className="option-child">
                <div className="icon"></div>
                <span className="content">
                  <FormattedMessage id="check-up-package.surgery-package" />
                </span>
              </div>
              <div className="option-child">
                <div className="icon"></div>
                <span className="content">
                  <FormattedMessage id="check-up-package.healthcare-product" />
                </span>
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
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Fire event
    changeLanguage: (language) => dispatch(changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
