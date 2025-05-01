import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import Select from "react-select";
import _ from "lodash";
import "./ManageSchedule.scss";
import moment from "moment/moment";
import DatePicker from "../../../components/Input/DatePicker";
import { data } from "autoprefixer";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      doctors: [],
      currentDate: new Date(),
      scheduleTimes: [],
    };
  }
  buidListDoctors = (listDoctors) => {
    let listDoctorArr = [];
    let { language } = this.props;
    if (listDoctors && listDoctors.length > 0) {
      listDoctors.map((item, index) => {
        let obj = {};
        let labelVI = `${item.firstName} ${item.lastName}`;
        let labelEN = `${item.lastName} ${item.firstName}`;
        obj.label = language === LANGUAGES.VI ? labelVI : labelEN;
        obj.value = item.id;
        listDoctorArr.push(obj);
      });
    }
    return listDoctorArr;
  };

  componentDidMount = async () => {
    this.props.getAllDoctors();
    this.props.getScheduleTimes();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.doctors !== this.props.doctors ||
      prevProps.language !== this.props.language
    ) {
      let doctorOptions = this.buidListDoctors(this.props.doctors);
      this.setState({
        doctors: doctorOptions,
      });
    }

    if (prevProps.scheduleTimes !== this.props.scheduleTimes) {
      this.setState({
        scheduleTimes: this.props.scheduleTimes,
      });
    }
  };
  handleChangeSelected = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    console.log("Check selected doctor: ", selectedDoctor);
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  render() {
    let { selectedDoctor, scheduleTimes } = this.state;
    let { language } = this.props;
    console.log("check schedule times: ", scheduleTimes);
    return (
      <div className="manage-schedule-container">
        <div className="manage-schedule-title text-center mb-4">
          <FormattedMessage id="manage-schedule.title"></FormattedMessage>
        </div>

        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {/* Cột 1 */}
            <div className="flex flex-col">
              <label className="text-md font-medium text-gray-700 mb-2">
                <FormattedMessage id="manage-schedule.choose-doctor"></FormattedMessage>
              </label>
              <Select
                classNames={{
                  control: () =>
                    "border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500",
                  input: () => "text-base",
                  menu: () =>
                    "mt-1 border border-gray-200 rounded-lg shadow-md",
                  option: ({ isFocused, isSelected }) =>
                    `px-4 py-2 cursor-pointer ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : isFocused
                        ? "bg-blue-100"
                        : ""
                    }`,
                }}
                value={selectedDoctor}
                onChange={this.handleChangeSelected}
                options={this.state.doctors}
              />
            </div>

            {/* Cột 2 */}
            <div className="flex flex-col">
              <label className="text-md font-medium text-gray-700 mb-2">
                <FormattedMessage id="manage-schedule.choose-date"></FormattedMessage>
              </label>
              <DatePicker
                minDate={new Date()}
                onChange={this.handleOnChangeDatePicker}
                value={this.state.currentDate}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="manage-schedule-time mt-6 px-10 py-8">
          <label className="block text-md font-medium text-gray-700 mb-3">
            <FormattedMessage id="manage-schedule.choose-time"></FormattedMessage>
          </label>
          <div className="flex flex-wrap gap-10">
            {scheduleTimes &&
              scheduleTimes.length > 0 &&
              scheduleTimes.map((item, index) => (
                <button
                  key={index}
                  className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-all duration-150 ease-in-out"
                >
                  {language === LANGUAGES.VI ? item.value_VI : item.value_EN}
                </button>
              ))}
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
    scheduleTimes: state.admin.scheduleTimes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.getAllDoctors()),
    getScheduleTimes: () => dispatch(actions.getScheduleTimes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
