import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
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
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 animate-slide-down">
          <h2 className="text-xl font-semibold text-center mb-6">
            Add New User
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Email</label>
              <input
                type="text"
                value={this.state.email}
                onChange={(e) => this.handleOnChangeInput(e, "email")}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={(e) => this.handleOnChangeInput(e, "password")}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">First Name</label>
              <input
                type="text"
                value={this.state.firstName}
                onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Last Name</label>
              <input
                type="text"
                value={this.state.lastName}
                onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label className="mb-1 font-medium">Address</label>
              <input
                type="text"
                value={this.state.address}
                onChange={(e) => this.handleOnChangeInput(e, "address")}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={this.handleAddNewUser}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add New
            </button>
            <button
              onClick={this.toggle}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
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
