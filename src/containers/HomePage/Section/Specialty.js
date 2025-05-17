import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./Specialty.scss";
import * as action from "../../../store/actions";
import { FormattedMessage } from "react-intl";

class Speacialty extends Component {
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

  componentDidUpdate = (prevState, prevProp) => {
    if (prevProp.listSpecialty !== this.props.listSpecialty) {
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

                  <div className="section-content" key={item.index}>
                    <div className="img section-specialty" style={{ backgroundImage: `url(${item.image})` }}></div>
                    <span>{item.name}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Speacialty);
