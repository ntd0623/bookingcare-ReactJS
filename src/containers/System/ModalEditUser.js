import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.currentUser &&
      this.props.currentUser !== prevProps.currentUser
    ) {
      const user = this.props.currentUser;
      if (user && !_.isEmpty(user)) {
        this.setState({
          id: user.id,
          email: user.email,
          password: "hard code",
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
        });
      }
    }
  };

  // Toggle method to handle the closing/opening of the modal
  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (e, id) => {
    let coppyState = { ...this.state };
    coppyState[id] = e.target.value;
    this.setState({
      ...coppyState,
    });
  };

  checkValidateInput = () => {
    let isValidate = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValidate = false;
        alert("Missing Paramter: " + arrInput[i]);
        break;
      }
    }
    return isValidate;
  };

  handleSaveUser = () => {
    let isValidate = this.checkValidateInput();
    if (isValidate) {
      // Call API
      this.props.updateUser(this.state);
    }
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.toggle}
          size="lg"
          centered
          className="modal-user-container"
        >
          <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="text"
                  // value={this.state.email}
                  onChange={(e) => this.handleOnChangeInput(e, "email")}
                  value={this.state.email}
                  disabled
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  // value={this.state.password}
                  onChange={(e) => this.handleOnChangeInput(e, "password")}
                  value={this.state.password}
                  disabled
                />
              </div>
              <div className="input-container">
                <label>First Name</label>
                <input
                  type="text"
                  // value={this.state.firstName}
                  onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                  value={this.state.firstName}
                />
              </div>
              <div className="input-container">
                <label>Last Name</label>
                <input
                  type="text"
                  // value={this.state.lastName}
                  onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                  value={this.state.lastName}
                />
              </div>
              <div className="input-container">
                <label>Address</label>
                <input
                  type="text"
                  // value={this.state.address}
                  onChange={(e) => this.handleOnChangeInput(e, "address")}
                  value={this.state.address}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSaveUser()}
            >
              Save Changes
            </Button>
            <Button color="secondary" className="px-3" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
