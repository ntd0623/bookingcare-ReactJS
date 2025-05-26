import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES, CommonUtils } from "../../../utils";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./InvoicePrescriptionModal.scss";
import toast from "react-hot-toast";
import { FormattedMessage } from "react-intl";
import { NumericFormat } from "react-number-format";
import CustomScrollbars from "../../../components/CustomScrollbars";
class InvoicePrescriptionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: null,
            prescriptionImageFile: null,
            isImageModalOpen: false,
            fullName: "",
            email: "",
            reason: "",
            date: "",
            doctorName: "",
            time: "",
            price: "",
            timeType: "",
            doctorID: "",
            patientID: "",
        };
    }
    componentDidMount() {
        if (this.props.dataModal) {
            let data = this.props.dataModal;
            this.setState({
                fullName: data.fullName,
                email: data.email,
                reason: data.reason,
                date: data.appointDate,
                doctorName: data.doctorName,
                time: data.time,
                price: data.price,
                timeType: data.timeType,
                doctorID: data.doctorID,
                patientID: data.patientID,
            })
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.dataModal !== this.props.dataModal) {
            let data = this.props.dataModal;
            this.setState({
                fullName: data.fullName,
                email: data.email,
                reason: data.reason,
                date: data.appointDate,
                doctorName: data.doctorName,
                time: data.time,
                price: data.price,
                timeType: data.timeType,
                doctorID: data.doctorID,
                patientID: data.patientID,
            })
        }
    }


    handlePrescriptionImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                previewImage: objectUrl,
                prescriptionImageFile: base64,
            });
        }
    };

    handleSubmit = () => {
        this.props.sendInvoicePrescription(this.state)
    };


    render() {
        let { isOpen, closeModal, dataModal, language, sendInvoicePrescription } = this.props;
        const { previewImage, isImageModalOpen } = this.state;
        let price = this.state.price
        return (
            <>
                {isOpen === true && (
                    <div className="booking-modal fixed inset-0 z-999 flex items-center justify-center bg-black bg-opacity-50"
                        style={{ zIndex: "999" }}>
                        <CustomScrollbars
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100vh",
                                height: "100vh",
                            }}
                        >
                            <div className="bg-white mt-10 rounded-2xl shadow-lg w-full max-w-3xl max-h-[100vh] p-6 relative overflow-y-auto"

                            >
                                {/* Close button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                >
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className="text-2xl cursor-pointer hover:text-red-700"
                                    />
                                </button>

                                {/* Modal Header */}
                                <h2 className="text-xl font-bold mb-4 text-center">
                                    Hóa Đơn và Đơn Thuốc
                                </h2>

                                {/* Modal Body */}
                                <div className="text-gray-700 mb-6 space-y-4">
                                    {/* Thông Tin Bệnh Nhân */}
                                    <div className="pb-3">
                                        <h3 className="font-semibold text-lg mb-2">
                                            Thông Tin Bệnh Nhân
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Họ Tên Bệnh Nhân
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.fullName}
                                                    className="w-full border border-gray-300 rounded-md p-2"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={this.state.email}
                                                    className="w-full border border-gray-300 rounded-md p-2"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Ngày Khám
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.date}
                                                    className="w-full border border-gray-300 rounded-md p-2"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Lý do khám
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.reason}
                                                    className="w-full border border-gray-300 rounded-md p-2"
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Thông Tin Bác Sĩ */}
                                    <div className="pb-3">
                                        <h3 className="font-semibold text-lg mb-2">Thông Tin Bác Sĩ</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Họ Tên Bác Sĩ
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-md p-2"
                                                    value={this.state.doctorName}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Giờ khám
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-md p-2"
                                                    value={this.state.time}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ảnh Đơn Thuốc */}
                                    <div className="pb-3">
                                        <h3 className="font-semibold text-lg mb-2">Ảnh Đơn Thuốc</h3>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            onChange={this.handlePrescriptionImageChange}
                                        />
                                        {previewImage && (
                                            <>
                                                <img
                                                    src={previewImage}
                                                    alt="Đơn thuốc"
                                                    className="mt-3 rounded shadow border max-w-xs max-h-64 object-contain cursor-pointer"
                                                    onClick={() => this.setState({ isImageModalOpen: true })}
                                                />
                                                {isImageModalOpen && (
                                                    <div
                                                        className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
                                                        onClick={() => this.setState({ isImageModalOpen: false })}
                                                    >
                                                        <img
                                                            src={previewImage}
                                                            alt="Phóng to ảnh đơn thuốc"
                                                            className="max-h-[90vh] max-w-[90vw] object-contain rounded shadow-lg"
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* Tổng Chi Phí */}
                                    <div className="pb-3">
                                        <h3 className="font-semibold text-lg mb-2">Tổng Chi Phí</h3>
                                        <div className="flex justify-between items-center">
                                            <h3 class="font-semibold text-lg">Giá Khám: </h3>
                                            {!_.isEmpty(price) && language === LANGUAGES.VI ? (
                                                <NumericFormat
                                                    value={price}
                                                    thousandSeparator=","
                                                    suffix={" VNĐ"}
                                                    displayType="text"
                                                    renderText={(price) => <span className="text-xl font-bold text-blue-600">{price}</span>}
                                                />
                                            ) : (
                                                <NumericFormat
                                                    value={price}
                                                    thousandSeparator=","
                                                    suffix={" $"}
                                                    displayType="text"
                                                    renderText={(price) => <span className="text-xl font-bold text-blue-600">{price}</span>}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => this.handleSubmit()}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        <FormattedMessage id="manage-patient.send" />
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-red-600"
                                    >
                                        <FormattedMessage id="manage-patient.cancel" />
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePrescriptionModal);
