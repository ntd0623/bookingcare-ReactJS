import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import "./Doctor'sApoitmentSchedule.scss";
import moment from "moment/moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../../utils/constant";
import BookingModal from "./BookingModal";
import LoadingOverlay from 'react-loading-overlay';

class DoctorsApointmentSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedulesDoctor: [],
      allDays: [],
      selectedDate: "",
      allTimes: [],
      isOpen: false,
      dataTime: {},
      isLoading: false
    };
  }

  componentDidMount() {
    console.log("DoctorsApointmentSchedule componentDidMount - schedulesDoctor:", this.props.schedulesDoctor);
    this.updateScheduleState(this.props.schedulesDoctor, this.props.language);
  }

  componentDidUpdate(prevProps) {
    let { schedulesDoctor, language } = this.props;
    if (
      prevProps.schedulesDoctor !== schedulesDoctor ||
      prevProps.language !== language
    ) {
      console.log("DoctorsApointmentSchedule componentDidUpdate - schedulesDoctor:", schedulesDoctor);
      this.updateScheduleState(schedulesDoctor, language);
    }
  }

  updateScheduleState = (schedulesDoctor, language) => {
    if (!Array.isArray(schedulesDoctor)) {
      console.error("schedulesDoctor phải là mảng, nhận:", schedulesDoctor);
      this.setState({
        schedulesDoctor: [],
        allDays: [],
        selectedDate: "",
        allTimes: [],
      });
      return;
    }

    let allDays = this.getDateOfWeek(schedulesDoctor, language);
    let prevSelected = this.state.selectedDate;
    let isStillValid = allDays.some((day) => day.value === prevSelected);
    let selectedDate =
      isStillValid && prevSelected
        ? prevSelected
        : allDays.length > 0
          ? allDays[0].value
          : "";
    let allTimes = this.getTimeOfDoctor(schedulesDoctor, language, selectedDate);

    console.log("allDays:", allDays);
    console.log("selectedDate:", selectedDate);
    console.log("allTimes:", allTimes);

    this.setState({
      schedulesDoctor,
      allDays,
      selectedDate,
      allTimes,
    });
  };

  getDateOfWeek = (listDays, language) => {
    let objDays = [];
    if (listDays && Array.isArray(listDays) && listDays.length > 0) {
      listDays.forEach((item) => {
        let obj = {};
        if (language === LANGUAGES.VI) {
          obj.label = moment(item.date)
            .format("dddd - DD/MM")
            .toLocaleUpperCase();
        } else {
          obj.label = moment(item.date).locale("en").format("ddd - DD/MM");
        }
        obj.value = item.date;
        let isExists = objDays.some(
          (day) => day.label === obj.label && day.value === obj.value
        );
        if (!isExists) {
          objDays.push(obj);
        }
      });
    }
    console.log("Check allDays:", objDays);
    return objDays;
  };

  getTimeOfDoctor = (schedulesDoctor, language, selectedDate) => {
    if (!schedulesDoctor || !Array.isArray(schedulesDoctor) || !selectedDate) {
      return [];
    }

    let times = schedulesDoctor
      .filter((schedule) => schedule.date === selectedDate)
      .map((schedule) => {
        return {
          id: schedule.doctorID,
          doctorData: schedule.doctorData,
          date: schedule.date,
          timeType: schedule.timeType,
          value:
            language === LANGUAGES.VI
              ? schedule.timeTypeData?.value_VI || ""
              : schedule.timeTypeData?.value_EN || "",
        };
      })
      .filter((time) => time.value);

    console.log("Check allTimes:", times);
    return times;
  };

  handleOnChangeSelected = (e) => {
    let selectedDate = e.target.value;
    let { schedulesDoctor } = this.state;
    let { language } = this.props;

    let allTimes = this.getTimeOfDoctor(schedulesDoctor, language, selectedDate);

    this.setState({
      selectedDate,
      allTimes,
    });
  };

  handleAppointment = (time) => {
    this.setState({ isOpen: true, dataTime: time });
  };

  handleOnClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  loading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    })
  }
  render() {
    let { allDays, selectedDate, allTimes, dataTime } = this.state;
    let { language } = this.props;
    return (
      <React.Fragment>
        <div className="schedule-container">
          <div className="schedule-date">
            <select
              value={selectedDate}
              onChange={(e) => this.handleOnChangeSelected(e)}
            >
              {allDays && allDays.length > 0 ? (
                allDays.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))
              ) : (
                <option>Không có ngày nào</option>
              )}
            </select>
          </div>
          <div className="schedule-time">
            <div className="schedule-title">
              <i>
                <FontAwesomeIcon icon={faCalendarDays} />
              </i>
              <FormattedMessage id="detail-doctor.appoint-schedule" />
            </div>
            <div className="time-content">
              {allTimes && allTimes.length > 0 ? (
                allTimes.map((item, index) => (
                  <button
                    onClick={() => this.handleAppointment(item)}
                    key={index}
                  >
                    {item.value}
                  </button>
                ))
              ) : (
                <p>Không có khung giờ nào</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-5">
            <span>
              <FormattedMessage id="detail-doctor.click" />
            </span>
            <svg
              viewBox="0 0 448 512"
              preserveAspectRatio="none"
              width="14"
              fill="#333"
              height="16"
              className="inline-block"
            >
              <path d="M105.6 83.2v86.177a115.52 115.52 0 0 0-22.4-2.176c-47.914 0-83.2 35.072-83.2 92 0 45.314 48.537 57.002 78.784 75.707 12.413 7.735 23.317 16.994 33.253 25.851l.146.131.148.129C129.807 376.338 136 384.236 136 391.2v2.679c-4.952 5.747-8 13.536-8 22.12v64c0 17.673 12.894 32 28.8 32h230.4c15.906 0 28.8-14.327 28.8-32v-64c0-8.584-3.048-16.373-8-22.12V391.2c0-28.688 40-67.137 40-127.2v-21.299c0-62.542-38.658-98.8-91.145-99.94-17.813-12.482-40.785-18.491-62.791-15.985A93.148 93.148 0 0 0 272 118.847V83.2C272 37.765 234.416 0 188.8 0c-45.099 0-83.2 38.101-83.2 83.2m118.4 0v91.026c14.669-12.837 42.825-14.415 61.05 4.95 19.646-11.227 45.624-1.687 53.625 12.925 39.128-6.524 61.325 10.076 61.325 50.6V264c0 45.491-35.913 77.21-39.676 120H183.571c-2.964-25.239-21.222-42.966-39.596-59.075-12.65-11.275-25.3-21.725-39.875-30.799C80.712 279.645 48 267.994 48 259.2c0-23.375 8.8-44 35.2-44 35.2 0 53.075 26.4 70.4 26.4V83.2c0-18.425 16.5-35.2 35.2-35.2 18.975 0 35.2 16.225 35.2 35.2M352 424c13.255 0 24 10.745 24 24s-10.745 24-24 24-24-10.745-24-24 10.745-24 24-24"></path>
            </svg>
            <span>
              <FormattedMessage id="detail-doctor.free-booking" />
            </span>
          </div>
        </div>
        <LoadingOverlay
          active={this.state.isLoading}
          spinner
          text='Loading...'
        >
          <BookingModal
            isOpen={this.state.isOpen}
            closeModal={this.handleOnClose}
            dataTime={dataTime}
            loading={this.state.isLoading}
          />
        </LoadingOverlay>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    doctors: state.admin.doctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsApointmentSchedule);