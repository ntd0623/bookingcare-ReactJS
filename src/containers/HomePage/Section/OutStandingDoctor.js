import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as action from "../../../store/actions";
import CommonUtils from "../../../utils/CommonUtils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDoctor: [],
    };
  }
  componentDidMount() {
    this.props.getTopDoctor();
  }

  componentDidUpdate = (preProps, preState) => {
    if (preProps.dataDoctor !== this.props.dataDoctor) {
      this.setState({
        dataDoctor: this.props.dataDoctor,
      });
    }
  };

  handleDetailDoctor = (doctor) => {
    console.log("Doctor: ", doctor);
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  render() {
    let { dataDoctor } = this.state;
    let { language } = this.props;
    return (
      <div className="section-common section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <h2>
              <FormattedMessage id="homePage.outStandingDoctor"></FormattedMessage>
            </h2>
            <button>
              <FormattedMessage id="homePage.seeMore"></FormattedMessage>
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataDoctor &&
                dataDoctor.length > 0 &&
                dataDoctor.map((item, index) => {
                  return (
                    <div
                      className="section-content"
                      onClick={() => this.handleDetailDoctor(item)}
                    >
                      <div className="customize-border">
                        <div className="bg">
                          <div
                            style={{
                              backgroundImage: `url(${CommonUtils.convertBase64(
                                item.image
                              )})`,
                            }}
                            className="img section-outstanding-doctor "
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div>
                            {item.positionData ? (
                              language === "en" ? (
                                item.positionData.value_EN
                              ) : (
                                item.positionData.value_VI
                              )
                            ) : (
                              <span>Không có thông tin vị trí</span>
                            )}
                            , {item.firstName} {item.lastName}
                          </div>
                          <div>{item.Doctor_Info?.specialtyData?.name}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    dataDoctor: state.admin.dataDoctor,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctor: () => dispatch(action.getTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
