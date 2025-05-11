import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils/constant";
import { getProfileDoctor } from "../../../../services/userService";
import "./ProfileDoctor.scss";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faHospital } from "@fortawesome/free-regular-svg-icons";
import { FormattedMessage } from "react-intl";
import { NumericFormat } from "react-number-format";
import moment from "moment/moment";
import localization from "moment/locale/vi";
import _ from "lodash";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.handleGetProfileDoctor(this.props.doctorID);
    this.setState({
      doctorProfile: data,
    });
  }

  handleGetProfileDoctor = async (doctorID) => {
    let result = {};
    if (!doctorID) {
      toast.error("Not found doctor ID !");
      return;
    }
    let data = await getProfileDoctor(doctorID);
    if (!data) {
      toast.error("Not found profile doctor !");
      return;
    } else {
      result = data.data;
    }
    return result;
  };

  rederTime = (dataTime, doctorProfile) => {
    if (
      dataTime &&
      !_.isEmpty(dataTime) &&
      doctorProfile &&
      doctorProfile.Doctor_Info
    ) {
      let { language } = this.props;
      let nameClinic = doctorProfile.Doctor_Info.nameClinic;
      let addressClinic = doctorProfile.Doctor_Info.addressClinic;
      let time =
        language === LANGUAGES.VI
          ? moment(dataTime.date)
              .format("dddd - DD/MM/YYYY")
              .toLocaleUpperCase()
          : moment(dataTime.date).locale("en").format("ddd - DD/MM/YYYY");
      return (
        <div className="time-doctor">
          <div>
            <i>
              <FontAwesomeIcon icon={faCalendarDays} fontSize={16} />
            </i>
            <span>{dataTime.value}</span>
            <span>{time}</span>
          </div>
          <div>
            <i>
              <FontAwesomeIcon icon={faHospital} />
            </i>
            {nameClinic} - {addressClinic}
          </div>
        </div>
      );
    }
  };

  componentDidUpdate = (prevProp, prevState) => {};
  render() {
    let { doctorProfile } = this.state;
    let { language, isShowDescription, dataTime } = this.props;
    console.log("Check state profileDoctor: ", this.state);
    let label = "";
    let price = "";
    if (
      doctorProfile &&
      doctorProfile.Doctor_Info &&
      doctorProfile.Doctor_Info.priceData
    ) {
      if (language === LANGUAGES.EN) {
        price = doctorProfile.Doctor_Info.priceData.value_EN;
      } else {
        price = doctorProfile.Doctor_Info.priceData.value_VI;
      }
    }
    if (language === LANGUAGES.VI && doctorProfile.positionData) {
      label = `${doctorProfile.positionData.value_VI}, ${doctorProfile.firstName} ${doctorProfile.lastName}`;
    }
    if (language === LANGUAGES.EN && doctorProfile.positionData) {
      label = `${doctorProfile.positionData.value_EN}, ${doctorProfile.lastName} ${doctorProfile.firstName}`;
    }

    return (
      <div className="profile-doctor">
        <div className="detail-doctor-intro">
          <div
            className="content-left"
            style={{
              height: 100,
              marginTop: 15,
              backgroundImage:
                doctorProfile && doctorProfile.image
                  ? `url(${doctorProfile.image})`
                  : "none",
            }}
          ></div>
          <div className="content-right">
            <div className="title">{label}</div>
            {isShowDescription === true ? (
              <React.Fragment>
                <div className="content">
                  {doctorProfile?.Markdown?.description ||
                    "No description available"}
                </div>
              </React.Fragment>
            ) : (
              this.rederTime(dataTime, doctorProfile)
            )}
          </div>
        </div>
        {/* Giá khám */}
        <div className="pt-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">
              <FormattedMessage id="detail-doctor.examination-fee"></FormattedMessage>
            </h3>
            <span className="text-xl font-bold text-blue-600">
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
                  suffix={" USD"}
                  displayType="text"
                  renderText={(price) => <>{price}</>}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
