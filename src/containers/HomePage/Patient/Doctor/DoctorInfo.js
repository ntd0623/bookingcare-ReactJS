import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { NumericFormat } from "react-number-format";
import { LANGUAGES } from "../../../../utils/constant";
import _ from "lodash";
import { getDoctorInfo } from "../../../../services/userService";
import "./DoctorInfo.scss";

class DoctorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailPrice: false,
      isShowInsurance: false,
      doctorInfo: null,
      price: "",
      payment: "",
    };
  }

  componentDidMount() {
    this.fetchDoctorInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.doctorId !== this.props.doctorId) {
      this.fetchDoctorInfo();
    }
    if (prevProps.language !== this.props.language) {
      this.updatePricePayment();
    }
  }

  fetchDoctorInfo = async () => {
    let { doctorId } = this.props;
    if (!doctorId) return;

    try {
      let response = await getDoctorInfo(doctorId);
      if (response && response.errCode === 0) {

        this.setState(
          {
            doctorInfo: response.data,
          },
          this.updatePricePayment
        );
      }
    } catch (error) {
      // Không hiển thị lỗi, chỉ log ra console nếu cần
      console.error("Lỗi lấy thông tin bác sĩ:", error);
    }
  };

  updatePricePayment = () => {
    let { doctorInfo } = this.state;
    let { language } = this.props;

    if (!doctorInfo) return;

    let price = "";
    let payment = "";

    if (doctorInfo.priceData) {
      price =
        language === LANGUAGES.VI
          ? doctorInfo.priceData.value_VI
          : doctorInfo.priceData.value_EN;
    }

    if (doctorInfo.paymentData) {
      payment =
        language === LANGUAGES.VI
          ? doctorInfo.paymentData.value_VI
          : doctorInfo.paymentData.value_EN;
    }

    this.setState({ price, payment });
  };

  handleShow = (name) => {
    this.setState((prevState) => ({
      [name]: !prevState[name],
    }));
  };

  render() {
    const {
      isShowDetailPrice,
      isShowInsurance,
      doctorInfo,
      price,
    } = this.state;
    let { language } = this.props;

    if (!doctorInfo) return null;

    return (
      <div className="doctor-info-container">
        <div className="content-top">
          <div className="title">
            <FormattedMessage id="detail-doctor.examination-address" />
          </div>
          <div className="name-clinic">{doctorInfo.nameClinic || ""}</div>
          <div className="detail-address">{doctorInfo.addressClinic || ""}</div>
        </div>
        <div className="content-down">
          {!isShowDetailPrice ? (
            <div className="price">
              <FormattedMessage id="detail-doctor.examination-fee" />{" "}
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
                <FormattedMessage id="detail-doctor.more-detail" />
              </span>
            </div>
          ) : (
            <div className="price-detail">
              <div className="price">
                <FormattedMessage id="detail-doctor.examination-fee" />
              </div>
              Giá khám đối với người nước ngoài là 10 USD.
              <span onClick={() => this.handleShow("isShowDetailPrice")}>
                <FormattedMessage id="detail-doctor.hide" />
              </span>
            </div>
          )}
          {!isShowInsurance ? (
            <div className="insurance">
              <FormattedMessage id="detail-doctor.applicable-insurance-type" /> {" "}
              <span onClick={() => this.handleShow("isShowInsurance")}>
                <FormattedMessage id="detail-doctor.more-detail" />
              </span>
            </div>
          ) : (
            <div className="insurance-detail">
              <div className="detail-top">
                <div className="title">Bảo Hiểm y tế nhà nước</div>
                <div className="content">
                  Phòng khám chưa áp dụng cho bảo hiểm y tế
                </div>
              </div>
              <div className="detail-down">
                <div className="title">Bảo hiểm bảo lãnh</div>
                <div className="content">
                  Đối với các đơn vị bảo hiểm không bảo lãnh trực tiếp: Bệnh viện
                  xuất hoá đơn tài chính (hoá đơn điện tử) và hỗ trợ bệnh nhân
                  hoàn thiện hồ sơ
                </div>
              </div>
              <div
                className="show"
                onClick={() => this.handleShow("isShowInsurance")}
              >
                <FormattedMessage id="detail-doctor.hide" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default DoctorInfo;
