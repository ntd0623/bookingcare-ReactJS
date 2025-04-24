import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./MedicalFacility.scss";
class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-common section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <h2>Cơ sở y tế nổi bật</h2>
            <button>Xem Thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-content">
                <div className="img section-medical-facility "></div>
                <span>Bệnh viên Chợ Rẫy</span>
              </div>
              <div className="section-content">
                <div className="img section-medical-facility "></div>
                <span>Bệnh viên Chợ Rẫy</span>
              </div>
              <div className="section-content">
                <div className="img section-medical-facility "></div>
                <span>Bệnh viên Chợ Rẫy</span>
              </div>
              <div className="section-content">
                <div className="img section-medical-facility "></div>
                <span>Bệnh viên Chợ Rẫy</span>
              </div>
              <div className="section-content">
                <div className="img section-medical-facility "></div>
                <span>Bệnh viên Chợ Rẫy</span>
              </div>
              <div className="section-content">
                <div className="img section-medical-facility "></div>
                <span>Bệnh viên Chợ Rẫy</span>
              </div>
            </Slider>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
