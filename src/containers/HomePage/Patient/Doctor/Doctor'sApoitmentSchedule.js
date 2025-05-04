import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import "./Doctor'sApoitmentSchedule.scss";
import moment from "moment/moment";
import localization from "moment/locale/vi";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils/constant";

class DoctorsApointmentSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedulesDoctor: [],
      allDays: [],
      selectedDate: "",
      allTimes: [],
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps) {
    if (
      prevProps.schedulesDoctor !== this.props.schedulesDoctor ||
      prevProps.language !== this.props.language
    ) {
      const { language, schedulesDoctor } = this.props;
      const allDays = this.getDateOfWeek(schedulesDoctor, language);
      const prevSelected = this.state.selectedDate;

      // Giữ lại selectedDate nếu nó còn tồn tại trong allDays
      const isStillValid = allDays.some((day) => day.value === prevSelected);
      const selectedDate =
        isStillValid && prevSelected
          ? prevSelected
          : allDays.length > 0
          ? allDays[0].value
          : "";

      const allTimes = this.getTimeOfDoctor(
        schedulesDoctor,
        language,
        selectedDate
      );

      this.setState({
        schedulesDoctor,
        allDays,
        selectedDate,
        allTimes,
      });
    }
  }

  getDateOfWeek = (listDays, language) => {
    let objDays = [];
    if (listDays && listDays.length > 0) {
      listDays = listDays.map((item, index) => {
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
    return objDays;
  };

  getTimeOfDoctor = (schedulesDoctor, language, selectedDate) => {
    if (!schedulesDoctor || schedulesDoctor.length === 0 || !selectedDate) {
      return [];
    }

    let times = schedulesDoctor
      .filter((schedule) => schedule.date === selectedDate)
      .map((schedule) => {
        return {
          id: schedule.id,
          timeType: schedule.timeType,
          value:
            language === LANGUAGES.VI
              ? schedule.timeTypeData?.value_VI
              : schedule.timeTypeData?.value_EN,
        };
      })
      .filter((time) => time.value); // Loại bỏ những item không có value

    return times;
  };

  handleOnChangeSelected = (e) => {
    let selectedDate = e.target.value;
    let { schedulesDoctor } = this.state;
    let { language } = this.props;

    let allTimes = this.getTimeOfDoctor(
      schedulesDoctor,
      language,
      selectedDate
    );

    this.setState({
      selectedDate,
      allTimes,
    });
  };
  render() {
    let { allDays, selectedDate, allTimes } = this.state;
    let { language } = this.props;
    console.log("Check state: ", this.state);
    return (
      <div className="schedule-container">
        <div className="schedule-date">
          <select
            value={selectedDate}
            onChange={(e) => this.handleOnChangeSelected(e)}
          >
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                if (index < 7) {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                }
              })}
          </select>
        </div>
        <div className="schedule-time">
          <div className="schedule-title">
            <i>
              <FontAwesomeIcon icon={faCalendarDays} />
            </i>
            Lịch Khám
          </div>
          <div className="time-content">
            {allTimes &&
              allTimes.length > 0 &&
              allTimes.map((item, index) => {
                return <button key={index}>{item.value}</button>;
              })}
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
    doctors: state.admin.doctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorsApointmentSchedule);
