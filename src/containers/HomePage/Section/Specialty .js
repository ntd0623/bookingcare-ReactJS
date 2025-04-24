import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./Specialty.scss";
class Speacialty extends Component {
  render() {
    return (
      <div className="section-common section-specialty">
        <div className="section-container">
          <div className="section-header">
            <h2>Chuyên khoa phổ biến</h2>
            <button>Xem Thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-content">
                <div className="img section-specialty"></div>
                <span>Cơ Xương Khớp</span>
              </div>
              <div className="section-content">
                <div className="img section-specialty"></div>
                <span>Cơ Xương Khớp</span>
              </div>
              <div className="section-content">
                <div className="img section-specialty"></div>
                <span>Cơ Xương Khớp</span>
              </div>
              <div className="section-content">
                <div className="img section-specialty"></div>
                <span>Cơ Xương Khớp</span>
              </div>
              <div className="section-content">
                <div className="img section-specialty"></div>
                <span>Cơ Xương Khớp</span>
              </div>
              <div className="section-content">
                <div className="img section-specialty"></div>
                <span>Cơ Xương Khớp</span>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Speacialty);
