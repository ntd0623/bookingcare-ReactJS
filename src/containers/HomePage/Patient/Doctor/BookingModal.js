import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils/constant";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ProfileDoctor from "./ProfileDoctor";
import "./BookingModal.scss";
import CustomScrollbars from "../../../../components/CustomScrollbars";
import { createPatientInfo } from "../../../../services/userService";
import Select from "react-select";
import toast from "react-hot-toast";
import { FormattedMessage } from "react-intl";
import moment from "moment/moment";
import localization from "moment/locale/vi";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listGender: [],
      phoneNumber: "",
      birthYear: new Date(),
      email: "",
      address: "",
      reason: "",
      patientFirstName: "",
      patientLastName: "",
      selectedGender: "",
      dataTime: "",
      doctorID: "",
    };
  }
  componentDidMount() {
    this.props.fetchGenderStart();
  }

  handleChangeSelected = async (selectedGender) => {
    this.setState({ selectedGender });
    console.log("Check selected doctor: ", selectedGender);
  };

  buidListGender = (listGender) => {
    let listGenderArr = [];
    let { language } = this.props;
    if (listGender && listGender.length > 0) {
      listGender.map((item, index) => {
        let obj = {};
        let labelVI = `${item.value_VI}`;
        let labelEN = `${item.value_EN}`;
        obj.label = language === LANGUAGES.VI ? labelVI : labelEN;
        obj.value = item.key;
        listGenderArr.push(obj);
      });
    }
    return listGenderArr;
  };

  componentDidUpdate = (prevProp, prevState) => {
    if (
      prevProp.genders !== this.props.genders ||
      prevProp.language !== this.props.language
    ) {
      this.setState({
        listGender: this.buidListGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProp.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        this.setState({
          dataTime: this.props.dataTime,
        });
      }
    }
  };

  handleChangeInput = (e, name) => {
    let coppyState = { ...this.state };
    coppyState[name] = e.target.value;
    this.setState({
      ...coppyState,
    });
  };

  builDataBooking = (dataTime) => {
    console.log("Check data time: ", dataTime)
    if (
      dataTime &&
      !_.isEmpty(dataTime)
    ) {
      let { language } = this.props;
      let doctorName = language === LANGUAGES.VI ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}` :
        `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
      let time =
        language === LANGUAGES.VI
          ? moment(dataTime.date)
            .format("dddd - DD/MM/YYYY")
            .toLocaleUpperCase()
          : moment(dataTime.date).locale("en").format("ddd - DD/MM/YYYY");
      return {
        time: time,
        doctorName: doctorName
      }
    }
    return "";
  };

  handleSubmit = async () => {
    let { dataTime } = this.state;
    let { language } = this.props;
    let data = this.builDataBooking(dataTime);
    let res = await createPatientInfo({
      doctorID: dataTime.id,
      date: dataTime.date,
      timeType: dataTime.timeType,
      email: this.state.email,
      firstName: this.state.patientFirstName,
      lastName: this.state.patientLastName,
      gender: this.state.selectedGender.value,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      reason: this.state.reason,
      time: data.time,
      doctorName: data.doctorName,
      language: language
    });
    if (res && res.errCode === 0) {
      toast.success("Thêm Thông Tin Bệnh Nhân Thành Công");
      this.props.closeModal();
    } else {
      toast.error("Thêm Thông Tin Bệnh Nhân Thất Bại !");
    }
  };

  render() {
    let {
      phoneNumber,
      email,
      address,
      reason,
      patientFirstName,
      patientLastName,
      selectedGender,
    } = this.state;
    let { isOpen, closeModal, dataTime } = this.props;
    let doctorID = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorID = dataTime.id;
    }
    return (
      <>
        {isOpen === true && (
          <div className="booking-modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <CustomScrollbars
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vh",
                height: "100vh",
              }}
            >
              <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl max-h-[90vh] p-6 flex-colp-6 relative">
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <i>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-2xl cursor-pointer hover:text-red-700"
                    />
                  </i>
                </button>

                {/* Modal Header */}
                <h2 className="text-xl font-bold mb-4 text-center">
                  <FormattedMessage id="detail-doctor.examination-address"></FormattedMessage>
                </h2>

                {/* Modal Body */}
                {/* Modal Body */}
                <div className="text-gray-700 mb-6 space-y-4">
                  {/* Thông Tin Bác Sĩ */}
                  <div className="doctor-info">
                    <ProfileDoctor
                      doctorID={doctorID}
                      isShowDescription={false}
                      dataTime={dataTime}
                    />
                  </div>
                  {/* Thông tin bệnh nhân */}
                  <div className="pb-3">
                    <h3 className="font-semibold text-lg mb-2">
                      <FormattedMessage id="detail-doctor.paitient-information"></FormattedMessage>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <FormattedMessage id="detail-doctor.firstName"></FormattedMessage>
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={patientFirstName}
                          onChange={(e) =>
                            this.handleChangeInput(e, "patientFirstName")
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <FormattedMessage id="detail-doctor.lastName"></FormattedMessage>
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={patientLastName}
                          onChange={(e) =>
                            this.handleChangeInput(e, "patientLastName")
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <FormattedMessage id="detail-doctor.gender"></FormattedMessage>
                        </label>
                        <Select
                          classNames={{
                            control: () =>
                              "border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500",
                            input: () => "text-base",
                            menu: () =>
                              "mt-1 border border-gray-200 rounded-lg shadow-md",
                            option: ({ isFocused, isSelected }) =>
                              `px-4 py-2 cursor-pointer ${isSelected
                                ? "bg-blue-500 text-white"
                                : isFocused
                                  ? "bg-blue-100"
                                  : ""
                              }`,
                          }}
                          value={selectedGender}
                          onChange={this.handleChangeSelected}
                          options={this.state.listGender}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <FormattedMessage id="detail-doctor.phoneNumber"></FormattedMessage>
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={phoneNumber}
                          onChange={(e) =>
                            this.handleChangeInput(e, "phoneNumber")
                          }
                        />
                      </div>

                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={email}
                          onChange={(e) => this.handleChangeInput(e, "email")}
                        />
                      </div>
                      <div className="">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <FormattedMessage id="detail-doctor.address"></FormattedMessage>
                        </label>
                        <input
                          type="email"
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={address}
                          onChange={(e) => this.handleChangeInput(e, "address")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Địa chỉ */}
                  <div className="pb-3">
                    <h3 className="font-semibold text-lg mb-2">
                      <FormattedMessage id="detail-doctor.reason"></FormattedMessage>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <FormattedMessage id="detail-doctor.reason-examination"></FormattedMessage>
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={reason}
                          onChange={(e) => this.handleChangeInput(e, "reason")}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => this.handleSubmit()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <FormattedMessage id="detail-doctor.confirm"></FormattedMessage>
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-red-600"
                  >
                    <FormattedMessage id="detail-doctor.cancel"></FormattedMessage>
                  </button>
                </div>
              </div>
            </CustomScrollbars>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
