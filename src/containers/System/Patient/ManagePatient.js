import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { FormattedMessage } from "react-intl";
import moment from "moment/moment";
import { getInfoPatient, sendInvoicePrescription } from "../../../services/userService";
import _ from "lodash";
import InvoicePrescriptionModal from "./InvoicePrescriptionModal";
import toast from "react-hot-toast";
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date())
                .set({ hour: 0, minute: 0, second: 0 })
                .format("YYYY-MM-DD HH:mm:ss"),
            listPatientInfo: [],
            isOpenModal: false,
            isCloseModal: true,
            dataModal: "",
            isLoading: false
        };
    }
    componentDidMount() {
        this.fetchListPatientInfo();
    }

    fetchListPatientInfo = async () => {
        let user = this.props.userInfo;
        let formatteDate = moment(this.state.currentDate).format(
            "YYYY-MM-DD HH:mm:ss"
        );
        let res = await getInfoPatient(user.id, formatteDate);
        if (res && res.errCode === 0) {
            let listPatientInfo = res.data;
            this.setState({
                listPatientInfo,
            });
        }
    };

    componentDidUpdate = (prevProp, prevState) => { };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
        this.fetchListPatientInfo();
    };

    handleConfirm = (item) => {
        console.log("Check item: item: ", item)
        let userInfo = this.props.userInfo;
        let language = this.props.language;
        let data = {
            fullName: `${item.patientData.firstName}${item.patientData.lastName}`,
            email: item.patientData.email,
            appointDate: moment(item.date).format("YYYY-MM-DD"),
            reason: item.reason,
            doctorName: `${userInfo.firstName}${userInfo.lastName}`,
            doctorID: item.doctorID,
            time: language === LANGUAGES.VI ? item.timetypeData.value_VI : item.timetypeData.value_EN,
            patientID: item.patientID,
            price: language === LANGUAGES.VI ? item.priceData.priceData.value_VI : item.priceData.priceData.value_EN,
            timeType: item.timeType
        }
        this.setState({
            isOpenModal: true,
            dataModal: data

        })
    };

    closeModal = () => {
        this.setState({
            isOpenModal: false,
            dataModal: {}
        });
    };

    sendInvoicePrescription = async (data) => {
        console.log("Data: ", data)
        this.setState({
            isLoading:true,
        })
        let res = await sendInvoicePrescription({
            email: data.email,
            image: data.prescriptionImageFile,
            doctorID: data.doctorID,
            patientID: data.patientID,
            timeType: data.timeType,
            patientName: data.fullName,
            doctorName: data.doctorName,
            language: this.props.language,
            date: data.date,
            time: data.time,
            reason: data.reason,
            price: data.price
        })
        if (res && res.errCode === 0) {
            this.setState({
            isLoading:false,
        })
            toast.success("Gửi hóa đơn thành công");
            this.closeModal();
            this.fetchListPatientInfo()
        } else {
            toast.error("Gửi hóa đơn thất bại !")
        }
    }

    render() {
        let { listPatientInfo } = this.state;
        let { language } = this.props;
        console.log("Check state: ", this.state);
        return (
            <React.Fragment>
                <div className="manage-patient-container">
                    <div className="manage-patient-title text-center mb-4">
                        <FormattedMessage id="manage-patient.title"></FormattedMessage>
                    </div>
                    <div className="flex flex-col mb-5">
                        <label className="text-md font-medium text-gray-700 mb-2">
                            <FormattedMessage id="manage-schedule.choose-date"></FormattedMessage>
                        </label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            value={this.state.currentDate}
                            className="w-1/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <table className="table w-full border-collapse text-center rounded-lg overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="border border-gray-300 p-3 font-bold">
                                    {" "}
                                    <FormattedMessage id="manage-patient.no"></FormattedMessage>
                                </th>
                                <th className="border border-gray-300 p-3 font-bold">
                                    <FormattedMessage id="manage-patient.time"></FormattedMessage>
                                </th>
                                <th className="border border-gray-300 p-3 font-bold">
                                    <FormattedMessage id="manage-patient.name"></FormattedMessage>
                                </th>
                                <th className="border border-gray-300 p-3 font-bold">
                                    <FormattedMessage id="manage-patient.gender"></FormattedMessage>
                                </th>
                                <th className="border border-gray-300 p-3 font-bold">
                                    <FormattedMessage id="manage-patient.address"></FormattedMessage>
                                </th>
                                <th className="border border-gray-300 p-3 font-bold">
                                    <FormattedMessage id="manage-patient.phone"></FormattedMessage>
                                </th>
                                <th className="border border-gray-300 p-3 font-bold">
                                    <FormattedMessage id="manage-patient.reason"></FormattedMessage>
                                </th>
                                <th className="border border-gray-300 p-3 font-bold">
                                    <FormattedMessage id="manage-patient.action"></FormattedMessage>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listPatientInfo && listPatientInfo.length > 0 ? (
                                listPatientInfo.map((item, index) => {
                                    let time =
                                        language === LANGUAGES.VI
                                            ? item?.timetypeData?.value_VI
                                            : item?.timetypeData?.value_EN;
                                    let name =
                                        language === LANGUAGES.VI
                                            ? `${item.patientData.firstName} ${item.patientData.lastName}`
                                            : `${item.patientData.lastName} ${item.patientData.firstName}`;
                                    let gender =
                                        language === LANGUAGES.VI
                                            ? item.patientData?.genderData?.value_VI
                                            : item.patientData?.genderData?.value_EN;

                                    return (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 transition duration-150"
                                        >
                                            <td className="border border-gray-200 p-3">{index + 1}</td>
                                            <td className="border border-gray-200 p-3">{time}</td>
                                            <td className="border border-gray-200 p-3">{name}</td>
                                            <td className="border border-gray-200 p-3">{gender}</td>
                                            <td className="border border-gray-200 p-3">
                                                {item?.patientData?.address}
                                            </td>
                                            <td className="border border-gray-200 p-3">
                                                {item?.patientData?.phoneNumber}
                                            </td>
                                            <td className="border border-gray-200 p-3">
                                                {item.reason}
                                            </td>
                                            <td className="border border-gray-200 p-3">
                                                <div className="flex justify-center gap-4 mt-4">
                                                    <button
                                                        className="px-5 py-2 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition duration-300"
                                                        onClick={() => this.handleConfirm(item)}
                                                    >
                                                        <FormattedMessage id="manage-patient.confirm"></FormattedMessage>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="p-4 text-center text-gray-500 font-medium"
                                    >
                                        Bác sĩ chưa có lịch hẹn với bệnh nhân
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text='Loading...'
                >
                    <InvoicePrescriptionModal
                        isOpen={this.state.isOpenModal}
                        closeModal={this.closeModal}
                        dataModal={this.state.dataModal}
                        sendInvoicePrescription={this.sendInvoicePrescription}
                    />
                </LoadingOverlay>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
