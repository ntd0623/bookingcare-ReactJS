import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-author">
          <p className="center-text">
            &copy; 2025 Design with Thanhh Do (DoHocIT).
          </p>
          <p className="icon-right">
            <a target="_blank" href="https://www.facebook.com/thanhhdo.0623">
              <FontAwesomeIcon className="facebook" icon={faFacebook} />
            </a>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
