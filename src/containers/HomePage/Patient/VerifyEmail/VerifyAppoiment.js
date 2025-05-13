import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils/constant";
import HomeHeader from "../../HomeHeader";
import { veryfyBookingAppoitment } from "../../../../services/userService"
import { faL } from "@fortawesome/free-solid-svg-icons";
class VerifyAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerify: false,
            errCode: "",
        };
    }
    async componentDidMount() {
        if (this.props && this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            let access_token = urlParams.get('access_token');
            let doctorID = urlParams.get("doctorID");
            let res = await veryfyBookingAppoitment({
                doctorID: doctorID,
                access_token: access_token
            });
            if (res && res.errCode === 0) {
                this.setState({
                    isVerify: true,
                    errCode: res.errCode

                })
            } else {
                this.setState({
                    isVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    componentDidUpdate = (prevProp, prevState) => { };
    render() {
        let { isVerify, errCode } = this.state
        return (
            <>
                <HomeHeader />
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 px-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
                    {isVerify === false ? (
                        <div className="text-center mt-5">
                            <h2 className="text-3xl font-semibold text-red-600">Liên kết xác nhận không hợp lệ</h2>
                            <p className="mt-2 text-gray-600">
                                Đường dẫn bạn sử dụng để xác nhận không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại email hoặc liên hệ bộ phận hỗ trợ.
                            </p>
                        </div>
                    ) : errCode === 0 ? (
                        <div className="text-center mt-5">
                            <h2 className="text-3xl font-semibold text-green-600">Xác nhận lịch hẹn thành công!</h2>
                            <p className="mt-2 text-gray-600">
                                Cảm ơn bạn đã xác nhận lịch hẹn. Chúng tôi rất mong được phục vụ bạn đúng thời gian đã hẹn.
                            </p>
                        </div>
                    ) : (
                        <div className="text-center mt-5">
                            <h2 className="text-3xl font-semibold text-yellow-600 ">Xác nhận không thành công</h2>
                            <p className="mt-2 text-gray-600">
                                Lịch hẹn của bạn đã được xác nhận trước đó hoặc không tồn tại. Vui lòng không spam email ! Mọi thắc mắc xin liên hệ: 0981 321 319.
                            </p>
                        </div>
                    )}
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAppointment);
