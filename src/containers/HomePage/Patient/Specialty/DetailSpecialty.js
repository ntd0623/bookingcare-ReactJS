import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomeHeader";
import DoctorsApointmentSchedule from "../Doctor/Doctor'sApoitmentSchedule";
import DoctorInfo from "../Doctor/DoctorInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getSpecialtyByID } from "../../../../services/userService"
import _ from "lodash"
import { LANGUAGES } from "../../../../utils/constant";
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSchedule: {},
            detailSpecialty: "",
            isShowContent: false,
            doctorID: [],
            listProvince: [],
            selectedProvince: "ALL"
        };
    }

    async componentDidMount() {
        console.log("Check param: ", this.props.match.params)
        if (this.props && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getSpecialtyByID({
                id: id,
                location: "ALL"
            });

            if (res && res.data && !_.isEmpty(res.data[0].specialtyData)) {
                let data = res.data[0].specialtyData;
                let provinceData = data.map(item => item.provinceData);
                let listProvince = provinceData.reduce((acc, province) => {
                    if (!acc.find(p => p.key === province.key)) {
                        acc.push(province);
                    }
                    return acc;
                }, []);
                this.setState({
                    doctorID: data.map((item, index) => {
                        return item.doctorID;
                    }),
                    listProvince: listProvince
                })
            }

            if (res && res.errCode === 0) {
                this.setState({
                    detailSpecialty: res.data[0]
                })
            }
        }
        this.fetchDoctorSchedules();
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

        // Gán toàn bộ vào state cục bộ, KHÔNG qua Redux
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

    handleOnChangeSelect = async (e) => {
        let selectedProvince = e.target.value
        this.setState({
            selectedProvince: e.target.selectedProvince
        })
        let res = await getSpecialtyByID({
            id: this.props.match.params.id,
            location: selectedProvince
        });
        if (res && res.data && !_.isEmpty(res.data[0].specialtyData)) {
            let data = res.data[0].specialtyData;
            this.setState({
                doctorID: data.map((item, index) => {
                    return item.doctorID;
                }),
            })
        }
        this.fetchDoctorSchedules();
    }

    render() {
        let { detailSpecialty, isShowContent, listProvince, selectedProvince } = this.state
        let { language } = this.props
        console.log("Check state: ", this.state)
        return (
            <>
                <HomeHeader />
                <div className="detail-specialty-container">

                    <div className="description max-w-full mx-auto px-4 py-8 relative">
                        <div
                            className={`text-gray-700 transition-all duration-200 ease-in-out ${isShowContent ? "max-h-full" : "max-h-32 overflow-hidden relative"
                                }`}
                            dangerouslySetInnerHTML={{
                                __html: detailSpecialty?.descriptionHTML || "No available content!",
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
                            {isShowContent ? "Ẩn bớt" : "Xem thêm"}
                        </button>
                    </div>

                    <div className="schedule-section pt-5" style={{ backgroundColor: "rgb(238,238,238)" }}>
                        <div className="relative inline-block w-fit" style={{
                            marginLeft: "160px",
                            paddingTop: ".375rem",
                            paddingBottom: ".375rem"
                        }}>
                            <select
                                value={selectedProvince}
                                onChange={(event) => this.handleOnChangeSelect(event)}
                                className="text-black border border-gray-300 rounded-md bg-white pr-8 pl-3 py-2 appearance-none outline-none cursor-pointer shadow-sm hover:border-gray-400">
                                <option value="ALL">Toàn Quốc</option>
                                {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                                    return <option key={index} value={item.key}>
                                        {language === LANGUAGES.EN ? item.value_EN : item.value_VI}
                                    </option>
                                })}
                            </select>
                            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-black">
                                ▼
                            </div>

                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
