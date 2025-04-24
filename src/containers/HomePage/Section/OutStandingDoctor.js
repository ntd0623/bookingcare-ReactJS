import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
class OutStandingDoctor extends Component {
  render() {
    return (
      <div className="section-common section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <h2>Bác sĩ nổi bật tuần qua</h2>
            <button>Xem Thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-content">
                <div className="customize-border">
                  <div className="bg">
                    <div className="img section-outstanding-doctor "></div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo Sư tiến sĩ</div>
                    <div>Tai Mũi họng</div>
                  </div>
                </div>
              </div>
              <div className="section-content">
                <div className="customize-border">
                  <div className="bg">
                    <div className="img section-outstanding-doctor "></div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo Sư tiến sĩ</div>
                    <div>Tai Mũi họng</div>
                  </div>
                </div>
              </div>
              <div className="section-content">
                <div className="customize-border">
                  <div className="bg">
                    <div className="img section-outstanding-doctor "></div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo Sư tiến sĩ</div>
                    <div>Tai Mũi họng</div>
                  </div>
                </div>
              </div>
              <div className="section-content">
                <div className="customize-border">
                  <div className="bg">
                    <div className="img section-outstanding-doctor "></div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo Sư tiến sĩ</div>
                    <div>Tai Mũi họng</div>
                  </div>
                </div>
              </div>
              <div className="section-content">
                <div className="customize-border">
                  <div className="bg">
                    <div className="img section-outstanding-doctor "></div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo Sư tiến sĩ</div>
                    <div>Tai Mũi họng</div>
                  </div>
                </div>
              </div>
              <div className="section-content">
                <div className="customize-border">
                  <div className="bg">
                    <div className="img section-outstanding-doctor "></div>
                  </div>
                  <div className="position text-center">
                    <div>Giáo Sư tiến sĩ</div>
                    <div>Tai Mũi họng</div>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
