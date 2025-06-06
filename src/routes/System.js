import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import Header from "../containers/Header/Header";
import UserRedux from "../containers/System/Admin/UserRedux";
import DoctorManage from "../containers/System/Admin/DoctorManage";
import SpecialtyManage from "../containers/System/Specialty/SpecialtyManage";
import ClinicManage from "../containers/System/Clinic/ClinicManage";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              {/* <Route path="/system/user-manage" component={UserManage} /> */}
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/doctor-manage" component={DoctorManage} />
              <Route path="/system/specialty-manage" component={SpecialtyManage} />
              <Route path="/system/clinic-manage" component={ClinicManage} />

              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
