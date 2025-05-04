import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, dateFormat } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import Select from "react-select";
import _ from "lodash";
import "./ManageSchedule.scss";
import moment from "moment/moment";
import DatePicker from "../../../components/Input/DatePicker";
import { data } from "autoprefixer";
import toast from "react-hot-toast";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      doctors: [],
      currentDate: new Date(),
      scheduleTimes: [],
      maxPatients: 10,
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
      let schedules = this.props.scheduleTimes;
      if (schedules && schedules.length > 0) {
        schedules = schedules.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        scheduleTimes: schedules,
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

  handleSubmit = () => {
    let { selectedDoctor, scheduleTimes, currentDate, maxPatients } =
      this.state;
    let result = [];
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid doctor !");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid date !");
      return;
    }
    // let date = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    // let date = moment(currentDate, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss");
    let date = new Date(currentDate.setHours(0, 0, 0, 0)).getTime();

    if (scheduleTimes && scheduleTimes.length > 0) {
      let selectedTimes = scheduleTimes.filter(
        (item) => item.isSelected === true
      );
      if (selectedTimes && selectedTimes.length > 0) {
        selectedTimes.map((item, index) => {
          let obj = {};
          obj.date = date;
          obj.doctorID = selectedDoctor.value;
          obj.maxNumber = maxPatients;
          obj.timeType = item.key;
          result.push(obj);
        });
      }
    } else {
      toast.error("Invalid selected times !");
    }
    this.props.handleCreateSchedules(result);
    console.log("Check result: ", result);
  };

  handleSelectedTimes = (time) => {
    let { scheduleTimes } = this.state;
    scheduleTimes = scheduleTimes.map((item) => {
      if (item.id === time.id) {
        item.isSelected = !item.isSelected;
      }
      return item;
    });
    this.setState({
      scheduleTimes,
    });
    console.log("Check scheduleTimes: ", this.state.scheduleTimes);
  };
  handleMaxPatientsChange = (e) => {
    let value = parseInt(e.target.value);
    console.log("Check value: ", value);
    let maxPatients = Math.min(Math.max(value, 1), 10);
    this.setState({ maxPatients });
  };
  render() {
    let { selectedDoctor, scheduleTimes, maxPatients } = this.state;
    let { language } = this.props;
    return (
      <div className="manage-schedule-container">
        <div className="manage-schedule-title text-center mb-4">
          <FormattedMessage id="manage-schedule.title"></FormattedMessage>
        </div>

        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {/* Tất cả 3 cột trong cùng một hàng */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-20">
              {/* Cột 1: Chọn bác sĩ */}
              <div className="flex flex-col mt-1">
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

              {/* Cột 2: Chọn ngày */}
              <div className="flex flex-col">
                <label className="text-md font-medium text-gray-700 mb-2">
                  <FormattedMessage id="manage-schedule.choose-date"></FormattedMessage>
                </label>
                <DatePicker
                  minDate={new Date().setHours(0, 0, 0, 0)}
                  onChange={this.handleOnChangeDatePicker}
                  value={this.state.currentDate}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Cột 3: Số bệnh nhân tối đa */}
              <div className="flex flex-col px-10">
                <label className="text-md font-medium text-gray-700 mb-2 px-4">
                  {language === LANGUAGES.VI
                    ? "Số bệnh nhân tối đa"
                    : "Maximum Patients"}
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={maxPatients}
                    onChange={this.handleMaxPatientsChange}
                    className="w-20 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-600">
                    {language === LANGUAGES.VI ? "(Tối đa: 10)" : "(Max: 10)"}
                  </span>
                </div>
              </div>
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
                  onClick={() => this.handleSelectedTimes(item)}
                  key={index}
                  className={
                    item.isSelected === true
                      ? "px-5 py-2 bg-blue-800 hover:bg-blue-500 text-white rounded-lg shadow-sm transition-all duration-150 ease-in-out"
                      : "px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-all duration-150 ease-in-out"
                  }
                >
                  {language === LANGUAGES.VI ? item.value_VI : item.value_EN}
                </button>
              ))}
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-3xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => this.handleSubmit()}
          >
            Lưu Thông Tin
          </button>
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
    handleCreateSchedules: (data) =>
      dispatch(actions.handleCreateSchedules(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
