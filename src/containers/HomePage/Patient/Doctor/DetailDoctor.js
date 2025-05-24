import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomeHeader";
import "./DetailDoctor.scss";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils/constant";
import DoctorsApointmentSchedule from "./Doctor'sApoitmentSchedule";
import DoctorInfo from "./DoctorInfo";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: null,
      label: "",
      schedulesDoctor: [],
      currentDoctor: "",
    };
  }

  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({ currentDoctor: id });
      this.props.getDetailInfoDoctorById(id);
      this.props.handleGetScheduleByDate(id);
    }
  }

  getNameByLanguage = (infoDoctor) => {
    let { language } = this.props;
    let labelVI = `${infoDoctor.positionData.value_VI}, ${infoDoctor.roleData.value_VI} ${infoDoctor.firstName} ${infoDoctor.lastName}`;
    let labelEN = `${infoDoctor.positionData.value_EN}, ${infoDoctor.roleData.value_EN} ${infoDoctor.lastName} ${infoDoctor.firstName}`;
    return language === LANGUAGES.VI ? labelVI : labelEN;
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.doctor !== this.props.doctor ||
      prevProps.language !== this.props.language
    ) {
      let infoDoctor = this.props.doctor;
      let label = this.getNameByLanguage(infoDoctor);
      this.setState({
        doctor: infoDoctor,
        label: label,
      });
    }

    if (prevProps.schedulesDoctor !== this.props.schedulesDoctor) {
      this.setState({ schedulesDoctor: this.props.schedulesDoctor });
    }
  }

  render() {
    let { doctor, label, schedulesDoctor, currentDoctor } = this.state;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="detail-doctor-container">
          <div className="detail-doctor-intro">
            <div
              className="content-left"
              style={{
                backgroundImage:
                  doctor && doctor.image ? `url(${doctor.image})` : "none",
              }}
            ></div>
            <div className="content-right">
              <div className="title">{label}</div>
              <div className="content">
                {doctor?.Markdown?.description || "No description available"}
              </div>
            </div>
          </div>
          <div className="detail-doctor-schedule">
            <DoctorsApointmentSchedule schedulesDoctor={schedulesDoctor} />
            <DoctorInfo doctorId={currentDoctor}
              language={this.props.language}
            />
          </div>
          <div className="detail-doctor-info">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  doctor?.Markdown?.contentHTML ||
                  "<p>No content available</p>",
              }}
            ></div>
          </div>
          <div className="detail-doctor-comment"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctor: state.admin.doctor,
    schedulesDoctor: state.admin.schedulesDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailInfoDoctorById: (id) =>
      dispatch(actions.getDetailInfoDoctorById(id)),
    handleGetScheduleByDate: (doctorID) =>
      dispatch(actions.handleGetScheduleByDate(doctorID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
