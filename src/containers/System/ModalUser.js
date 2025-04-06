import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
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

  handleAddNewUser = () => {
    let isValidate = this.checkValidateInput();
    if (isValidate) {
      // Call API
      this.props.createNewUser(this.state);
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
          <ModalHeader toggle={this.toggle}>Add New User</ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="text"
                  // value={this.state.email}
                  onChange={(e) => this.handleOnChangeInput(e, "email")}
                  value={this.state.email}
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  // value={this.state.password}
                  onChange={(e) => this.handleOnChangeInput(e, "password")}
                  value={this.state.password}
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
              onClick={() => this.handleAddNewUser()}
            >
              Add New
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
