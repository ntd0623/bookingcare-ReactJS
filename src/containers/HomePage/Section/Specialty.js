import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./Specialty.scss";
import * as action from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: []
    }
  }
  async componentDidMount() {
    console.log("Check props: ", this.props)
    await this.props.handleGetAllSpecialty()
  }

  handleDetailSpecialty = (specialty) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${specialty.id}`);
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.listSpecialty !== this.props.listSpecialty) {
      let listSpecialty = this.props.listSpecialty;
      this.setState({
        listSpecialty
      })
    }
  }

  render() {
    let { listSpecialty } = this.state
    console.log("Check listSpecialty: ", listSpecialty)
    return (
      <div className="section-common section-specialty">
        <div className="section-container">
          <div className="section-header">
            <h2><FormattedMessage id="homePage.popular-specialties"></FormattedMessage></h2>
            <button><FormattedMessage id="homePage.seeMore"></FormattedMessage></button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {listSpecialty && listSpecialty.length > 0 && listSpecialty.map((item, index) => {
                return (

                  <div className="section-content" key={item.id} onClick={() => this.handleDetailSpecialty(item)}>
                    <div className="img section-specialty" style={{ backgroundImage: `url(${item.image})`, cursor: "pointer", marginBottom: "5px" }}></div>
                    <span style={{ marginTop: "5px" }}>{item.name}</span>
                  </div>
                )
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
    language: state.app.language,
    listSpecialty: state.admin.listSpecialty
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetAllSpecialty: () => dispatch(action.handleGetAllSpecialty())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
