import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./MedicalFacility.scss";
import * as action from "../../../store/actions"
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinics: [],
    }
  }
  async componentDidMount() {
    await this.props.handleGetAllClinic()
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.clinics !== this.props.clinics) {
      let clinics = this.props.clinics;
      console.log("Check clinic update: ", clinics)
      this.setState({
        clinics
      })
    }
  }

  handleDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };

  render() {
    let { clinics } = this.state
    console.log("Check clinic: ", clinics)
    return (
      <div className="section-common section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <h2>Cơ sở y tế nổi bật</h2>
            <button><FormattedMessage id="homePage.seeMore"></FormattedMessage></button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {
                clinics && clinics.length > 0 && clinics.map((item, index) => {
                  return (

                    <div className="section-content" key={item.id}
                      onClick={() => this.handleDetailClinic(item)}
                    >
                      <div className="img section-medical-facility" style={{ backgroundImage: `url(${item.image})`, cursor: "pointer", marginBottom: "5px" }}></div>
                      <span style={{ marginTop: "5px !important" }}>{item.name}</span>
                    </div>
                  )
                })
              }
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
    language: state.app.language,
    clinics: state.admin.clinics
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAllClinic: () => dispatch(action.handleGetAllClinic())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
