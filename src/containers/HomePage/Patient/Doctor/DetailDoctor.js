import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomeHeader";
import "./DetailDoctor.scss";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils/constant";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: null,
      label: "",
    };
  }
  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.props.getDetailInfoDoctorById(id);
    }
  }

  getNameByLanguage = (infoDoctor) => {
    let { language } = this.props;
    let labelVI = `${infoDoctor.positionData.value_VI}, ${infoDoctor.roleData.value_VI} ${infoDoctor.firstName} ${infoDoctor.lastName}`;
    let labelEN = `${infoDoctor.positionData.value_EN}, ${infoDoctor.roleData.value_EN} ${infoDoctor.lastName} ${infoDoctor.firstName}`;

    let label = language === LANGUAGES.VI ? labelVI : labelEN;
    return label;
  };

  componentDidUpdate = (prevProp, prevState) => {
    if (
      prevProp.doctor !== this.props.doctor ||
      prevProp.language !== this.props.language
    ) {
      let infoDoctor = this.props.doctor;
      let label = this.getNameByLanguage(infoDoctor);
      this.setState({
        doctor: infoDoctor,
        label: label,
      });
    }
  };
  render() {
    let { doctor, label } = this.state;
    console.log("Check doctor: ", doctor);
    return (
      <React.Fragment>
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
              <div className="content">{doctor?.Markdown.description}</div>
            </div>
          </div>
          <div className="detail-doctor-schedule"></div>
          <div className="detail-doctor-info">
            <div
              dangerouslySetInnerHTML={{ __html: doctor?.Markdown.contentHTML }}
            ></div>
          </div>
          <div className="detail-doctor-comment"></div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctor: state.admin.doctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailInfoDoctorById: (id) =>
      dispatch(actions.getDetailInfoDoctorById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
