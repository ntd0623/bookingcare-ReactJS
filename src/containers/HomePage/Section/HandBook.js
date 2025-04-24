import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
class HandBook extends Component {
  render() {
    return (
      <div className="section-common section-handbook">
        <div className="section-container">
          <div className="section-header">
            <h2>Cẩm nang</h2>
            <button>Tất cả bài viết</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-content">
                <div className="img section-handbook"></div>
                <span>Cơ Xương Khớp</span>
              </div>
              <div className="section-content">
                <div className="img section-handbook"></div>
                <span>Cơ Xương Khớp</span>
              </div>
              <div className="section-content">
                <div className="img section-handbook"></div>
                <span>Cơ Xương Khớp</span>
              </div>
              <div className="section-content">
                <div className="img section-handbook"></div>
                <span>Cơ Xương Khớp</span>
              </div>
              <div className="section-content">
                <div className="img section-handbook"></div>
                <span>Cơ Xương Khớp</span>
              </div>
              <div className="section-content">
                <div className="img section-handbook"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
