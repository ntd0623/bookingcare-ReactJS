import React, { Component } from "react";
import { connect } from "react-redux";
class AboutBookingCare extends Component {
  render() {
    return (
      <div className="section-common section-about">
        <div className="section-about-header">Giới thiệu về BookingCare</div>
        <div className="section-about-content">
          <div className="section-about-content-left">
            <iframe
              width="100%"
              height="315px"
              src="https://www.youtube.com/embed/vK6oRhio2Ek"
              title="BookingCare: Hệ thống đặt lịch khám bác sĩ chuyên khoa"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="section-about-content-right">
            <p>
              BookingCare là nền tảng công nghệ y tế hàng đầu tại Việt Nam, cung
              cấp dịch vụ đặt lịch khám bệnh trực tuyến tại các bệnh viện, phòng
              khám và bác sĩ chuyên khoa trên toàn quốc. Với mục tiêu nâng cao
              trải nghiệm khám chữa bệnh cho người dân, BookingCare giúp người
              dùng tiết kiệm thời gian, giảm thiểu việc chờ đợi và chủ động hơn
              trong việc chăm sóc sức khỏe.
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutBookingCare);
