import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faL } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import localization from "moment/locale/vi";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils/constant";
import "./DoctorInfo.scss";
class DoctorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailPrice: false,
      isShowInsurance: false,
    };
  }

  handleShow = (name) => {
    this.setState((prevState) => ({
      [name]: !prevState[name],
    }));
  };

  componentDidMount() {}
  componentDidUpdate(prevProps) {}

  render() {
    let { isShowDetailPrice, isShowInsurance } = this.state;
    return (
      <div className="doctor-info-container">
        <div className="content-top">
          <div className="title">Địa chỉ Khám</div>
          <div className="name-clinic">
            Hệ thống Y khoa Chuyên sâu Quốc tế BERNARD
          </div>
          <div className="detail-address">
            201 đường Nam Kỳ Khởi Nghĩa, Võ Thị Sáu, Quận 3, Thành phố Hồ Chí
            Minh
          </div>
        </div>
        <div className="content-down">
          {isShowDetailPrice === false && (
            <div className="price">
              Giá Khám: 500.000đ.{" "}
              <span onClick={() => this.handleShow("isShowDetailPrice")}>
                {" "}
                Xem chi tiết
              </span>
            </div>
          )}
          {isShowDetailPrice === true && (
            <div className="price-detail">
              <div className="price">Giá Khám: </div>
              Giá khám đối với người nước ngoài là 10 USD.{" "}
              <span onClick={() => this.handleShow("isShowDetailPrice")}>
                {" "}
                Ẩn bảng Giá
              </span>
            </div>
          )}
          {isShowInsurance === false && (
            <div className="insurance">
              Loại Bảo Hiểm Áp Dụng{" "}
              <span onClick={() => this.handleShow("isShowInsurance")}>
                Xem chi tiết
              </span>
            </div>
          )}
          {isShowInsurance === true && (
            <div className="insurance-detail">
              <div className="detail-top">
                <div className="title">Bảo Hiểm y tế nhà nước</div>
                <div className="content">
                  Phòng khám chưa áp dụng cho bảo hiểm y tế
                </div>
              </div>
              <div className="detail-down">
                <div className="title">Bảo hiểm bảo lãnh </div>
                <div className="content">
                  Đối với các đơn vị bảo hiểm không bảo lãnh trực tiếp: Bệnh
                  viện xuất hoá đơn tài chính (hoá đơn điện tử) và hỗ trợ bệnh
                  nhân hoàn thiện hồ sơ
                </div>
              </div>
              <div
                className="show"
                onClick={() => this.handleShow("isShowInsurance")}
              >
                Thu gọn
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);
