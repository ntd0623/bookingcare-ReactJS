import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutstandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";
import AboutBookingCare from "./Section/AboutBookingCare";
import Footer from "./Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.scss";
class HomePage extends Component {
  handleAfterChange = (current) => { };
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      afterChange: this.handleAfterChange(),
    };

    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutstandingDoctor settings={settings} />
        <HandBook settings={settings} />
        <AboutBookingCare />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
