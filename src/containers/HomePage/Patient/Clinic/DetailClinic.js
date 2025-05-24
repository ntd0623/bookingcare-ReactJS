import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./DetailClinic.scss";
import HomeHeader from "../../HomeHeader";
import DoctorsApointmentSchedule from "../Doctor/Doctor'sApoitmentSchedule";
import DoctorInfo from "../Doctor/DoctorInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getClinicByID } from "../../../../services/userService"
import _ from "lodash"
import { LANGUAGES } from "../../../../utils/constant";
import { FormattedMessage } from "react-intl";
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSchedule: {},
            detailClinic: "",
            isShowContent: false,
            doctorID: [],
        };
    }

    async componentDidMount() {
        console.log("Check param: ", this.props.match.params)
        if (this.props && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getClinicByID({
                id: id,
            });

            if (res && res.data && !_.isEmpty(res.data[0].clinicData)) {
                let data = res.data[0].clinicData;
                this.setState({
                    doctorID: data.map((item, index) => {
                        return item.doctorID;
                    }),
                })
            }
            if (res && res.errCode === 0) {
                this.setState({
                    detailClinic: res.data[0]
                })
            }
        }
        this.fetchDoctorSchedules()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            this.fetchDoctorSchedules();
        }
    }

    fetchDoctorSchedules = async () => {
        let doctorIDs = this.state.doctorID;
        const schedulesByDoctor = {};

        // Lặp qua từng bác sĩ và fetch lịch
        for (const doctorID of doctorIDs) {
            try {
                const schedule = await this.props.handleGetScheduleByDate(doctorID);
                if (Array.isArray(schedule)) {
                    schedulesByDoctor[doctorID] = schedule;
                } else {
                    schedulesByDoctor[doctorID] = [];
                }
            } catch (error) {
                schedulesByDoctor[doctorID] = [];
                console.error(`Lỗi fetch lịch cho bác sĩ ${doctorID}:`, error);
            }
        }

        this.setState({ listSchedule: schedulesByDoctor });
    };

    renderDoctorApointment = () => {
        const { listSchedule } = this.state;
        const { language } = this.props;
        const doctorIDs = Object.keys(listSchedule);

        return (
            <div className="detail-specialty-content">
                {doctorIDs.map((doctorID) => {
                    const schedules = listSchedule[doctorID] || [];

                    return (
                        <div
                            key={doctorID}
                            className="specialty-detail rounded-lg bg-white p-6 mt-[10px]"
                            style={{ backgroundColor: "#FFFF", boxShadow: "0 1px 6px rgba(32, 33, 36, 0.3)" }}
                        >
                            <div className="content-left">
                                <div className="doctor-info-specialty">
                                    <ProfileDoctor
                                        doctorID={doctorID}
                                        isShowDescription={true}
                                        isShowPrice={false}
                                        isShowLink={true}
                                    />
                                </div>
                            </div>

                            <div className="content-right">
                                <div className="doctor-schedules">
                                    {schedules.length > 0 ? (
                                        <DoctorsApointmentSchedule
                                            schedulesDoctor={schedules}
                                            language={language}
                                        />
                                    ) : (
                                        <p className="text-red-500 italic">Bác sĩ hiện chưa có lịch khám.</p>
                                    )}
                                </div>
                                <div className="doctor-info">
                                    <DoctorInfo key={doctorID} doctorId={doctorID} language={language} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };


    toggleContent = () => {
        this.setState({
            isShowContent: !this.state.isShowContent
        })
    }

    render() {
        let { detailClinic, isShowContent } = this.state
        let { language } = this.props
        console.log("Check state: ", this.state)
        return (
            <>
                <HomeHeader />
                <div className="detail-specialty-container">

                    <div className="description max-w-full mx-auto px-4 py-8 relative">
                        <h1>{detailClinic.name}</h1>
                        <div
                            className={`text-gray-700 transition-all duration-200 ease-in-out ${isShowContent ? "max-h-full" : "max-h-32 overflow-hidden relative"
                                }`}
                            dangerouslySetInnerHTML={{
                                __html: detailClinic?.descriptionHTML || "No available content!",
                            }}
                        />

                        {!isShowContent && (
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
                        )}

                        <button
                            onClick={this.toggleContent}
                            className="mt-3 font-normal relative z-10"
                            style={{
                                color: '#288AD6',
                                fontSize: '14px'
                            }}

                        >

                            <FormattedMessage id={isShowContent ? "detail-clinic.hide" : "detail-clinic.more-detail"} />


                        </button>
                    </div>

                    <div className="schedule-section pt-5" style={{ backgroundColor: "rgb(238,238,238)" }}>
                        {this.renderDoctorApointment()}
                    </div>
                </div >
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
    handleGetScheduleByDate: (doctorID) =>
        dispatch(actions.handleGetScheduleByDate(doctorID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
