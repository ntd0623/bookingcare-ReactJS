import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faL } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import localization from "moment/locale/vi";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils/constant";
import { NumericFormat } from "react-number-format";
import _ from "lodash";
import "./DoctorInfo.scss";
class DoctorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailPrice: false,
      isShowInsurance: false,
      listDoctorInfo: [],
      price: "",
      payment: "",
    };
  }

  handleShow = (name) => {
    this.setState((prevState) => ({
      [name]: !prevState[name],
    }));
  };

  componentDidMount() {}
  componentDidUpdate = (prevProp, prevState) => {
    if (
      prevProp.listDoctorInfo !== this.props.listDoctorInfo ||
      prevProp.language !== this.props.language
    ) {
      let listDoctorInfo = this.props.listDoctorInfo;
      this.setState({
        listDoctorInfo,
      });
      if (listDoctorInfo && listDoctorInfo.priceData) {
        let { language } = this.props;
        let price =
          language === LANGUAGES.VI
            ? listDoctorInfo.priceData.value_VI
            : listDoctorInfo.priceData.value_EN;
        this.setState({ price });
      }
      if (listDoctorInfo && listDoctorInfo.paymentData) {
        let { language } = this.props;
        let payment =
          language === LANGUAGES.VI
            ? listDoctorInfo.paymentData.value_VI
            : listDoctorInfo.paymentData.value_EN;
        this.setState({ payment });
      }
    }
  };

  render() {
    let { isShowDetailPrice, isShowInsurance, listDoctorInfo, price, payment } =
      this.state;
    let { language } = this.props;
    return (
      <div className="doctor-info-container">
        <div className="content-top">
          <div className="title">
            {" "}
            <FormattedMessage id="detail-doctor.examination-address"></FormattedMessage>
          </div>
          <div className="name-clinic">
            {listDoctorInfo ? listDoctorInfo.nameClinic : ""}
          </div>
          <div className="detail-address">
            {listDoctorInfo ? listDoctorInfo.addressClinic : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailPrice === false && (
            <div className="price">
              <FormattedMessage id="detail-doctor.examination-fee"></FormattedMessage>{" "}
              {!_.isEmpty(price) && language === LANGUAGES.VI ? (
                <NumericFormat
                  value={price}
                  thousandSeparator=","
                  suffix={" VNĐ"}
                  displayType="text"
                  renderText={(price) => <>{price}</>}
                />
              ) : (
                <NumericFormat
                  value={price}
                  thousandSeparator=","
                  suffix={" $"}
                  displayType="text"
                  renderText={(price) => <>{price}</>}
                />
              )}
              <span onClick={() => this.handleShow("isShowDetailPrice")}>
                <FormattedMessage id="detail-doctor.more-detail"></FormattedMessage>
              </span>
            </div>
          )}
          {isShowDetailPrice === true && (
            <div className="price-detail">
              <div className="price">
                {" "}
                <FormattedMessage id="detail-doctor.examination-fee"></FormattedMessage>
              </div>
              Giá khám đối với người nước ngoài là 10 USD.{" "}
              <span onClick={() => this.handleShow("isShowDetailPrice")}>
                {" "}
                <FormattedMessage id="detail-doctor.hide"></FormattedMessage>
              </span>
            </div>
          )}
          {isShowInsurance === false && (
            <div className="insurance">
              <FormattedMessage id="detail-doctor.applicable-insurance-type"></FormattedMessage>{" "}
              <span onClick={() => this.handleShow("isShowInsurance")}>
                <FormattedMessage id="detail-doctor.more-detail"></FormattedMessage>
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
                <FormattedMessage id="detail-doctor.hide"></FormattedMessage>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listDoctorInfo: state.admin.listDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);
