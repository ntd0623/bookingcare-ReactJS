import React, { Component } from "react";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import _ from "lodash";
import "./UserRedux.scss";
import TableManageUSer from "../Admin/TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpenPreview: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      error: {},

      action: "",

      userupdateID: "",
    };
  }

  async componentDidMount() {
    try {
      this.props.fetchGenderStart();
      this.props.fetchPositionStart();
      this.props.fetchRoleStart();
    } catch (e) {
      console.log("Error: " + e);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.genders !== this.props.genders) {
      let gender = this.props.genders;
      this.setState({
        genderArr: gender,
        gender: gender && gender.length > 0 ? gender[0].key : "",
      });
    }
    if (prevProps.roles !== this.props.roles) {
      let role = this.props.roles;
      this.setState({
        roleArr: role,
        role: role && role.length > 0 ? role[0].key : "",
      });
    }
    if (prevProps.positions !== this.props.positions) {
      let position = this.props.positions;
      this.setState({
        positionArr: position,
        position: position && position.length > 0 ? position[0].key : "",
      });
    }
    if (prevProps.users !== this.props.users) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        gender: "M",
        position: "P0",
        role: "R0",
        avatar: "",
        previewImgURL: "",
        error: {},
        action: CRUD_ACTIONS.ADD,
      });
    }
  };

  handleOnChangeImage = async (event) => {
    const files = event.target.files[0];
    if (files) {
      const objectUrl = URL.createObjectURL(files);
      let base64 = await CommonUtils.getBase64(files);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openDialog = () => {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.click();
    }
  };

  handleOnChangeInput = (event, id) => {
    this.setState((prevState) => ({
      [id]: event.target.value,
      error: {
        ...prevState.error,
        [id]: "",
      },
    }));
  };

  checkValidateInput = () => {
    let error = {};
    let isValid = true;
    let inputArr = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phone",
      "address",
      "gender",
      "position",
      "role",
    ];
    for (let i = 0; i < inputArr.length; i++) {
      if (!this.state[inputArr[i]]) {
        error[inputArr[i]] = `${inputArr[
          i
        ].toLocaleUpperCase()} không được để trống !`;
        isValid = false;
      }
    }
    this.setState({
      error: error,
    });
    return isValid;
  };

  handleSubmit = () => {
    let isValid = this.checkValidateInput();
    if (!isValid) return;
    let { action } = this.state;
    // Kiểm tra nếu các trường bắt buộc (gender, position, role) chưa được chọn
    if (!this.state.gender || !this.state.position || !this.state.role) {
      alert("Please select gender, position, and role.");
      return; // Nếu không chọn, không gửi dữ liệu
    }

    // Kiểm tra các trường khác như email, password, firstName, lastName...
    if (
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.email ||
      !this.state.password ||
      !this.state.phone ||
      !this.state.address
    ) {
      alert("Please fill in all the required fields.");
      return;
    }
    if (action === CRUD_ACTIONS.ADD) {
      this.props.handleCreateNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phone,
        address: this.state.address,
        gender: this.state.gender,
        positionID: this.state.position,
        roleID: this.state.role,
        avatar: this.state.avatar,
      });
    } else {
      this.props.handleUpdateUserRedux({
        id: this.state.userupdateID,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phone,
        address: this.state.address,
        gender: this.state.gender,
        positionID: this.state.position,
        roleID: this.state.role,
        avatar: this.state.avatar,
      });
    }
  };
  openPreview = () => {
    if (!_.isEmpty(this.state.previewImgURL)) {
      this.setState({
        isOpenPreview: true,
      });
    }
  };

  handleUpdateUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "123456",
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionID,
      role: user.roleID,
      avatar: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userupdateID: user.id,
      previewImgURL: imageBase64,
    });
  };

  render() {
    let { genderArr, positionArr, roleArr, previewImgURL, isOpenPreview } =
      this.state;
    let { language, isLoadingGender, isLoadingPosition, isLoadingRole } =
      this.props;

    let {
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      gender,
      position,
      role,
      avatar,
      error,
    } = this.state;
    const isLoading = isLoadingGender || isLoadingPosition || isLoadingRole;
    return (
      <React.Fragment>
        <div className="user-redux-container p-6">
          {isLoading && (
            <div className="load">
              <div className="loader"></div>
            </div>
          )}
          <div className="title text-2xl font-bold text-center mb-4">
            Manage User Redux
          </div>
          <div className="user-redux-body">
            <div className="min-h-screen bg-gray-50 py-10 px-4">
              <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-md">
                <div className="mb-8">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label className="block text-lg font-medium text-gray-700">
                        <FormattedMessage id="manage-user.photo"></FormattedMessage>
                      </label>
                      <div className="mt-2 flex items-center">
                        <span
                          className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                          onClick={() => this.openPreview()}
                        >
                          {!_.isEmpty(previewImgURL) ? (
                            <img
                              src={previewImgURL}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 24H0V0h24v24z" fill="none" />
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          )}
                        </span>
                        <input
                          type="file"
                          ref={this.fileInputRef}
                          onChange={(event) => this.handleOnChangeImage(event)}
                          hidden
                          accept="image/*"
                        />
                        <button
                          type="button"
                          onClick={this.openDialog}
                          className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <FormattedMessage id="manage-user.change"></FormattedMessage>
                        </button>
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label className="block text-lg font-medium text-gray-700">
                        <span>
                          <FormattedMessage id="manage-user.coverChange"></FormattedMessage>
                        </span>
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20l-12-12z"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M28 8v12h12M16 24l4 4 8-8"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-lg text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                            >
                              <span>
                                <FormattedMessage id="manage-user.upLoad"></FormattedMessage>
                              </span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                ref={this.fileInputRef}
                                onChange={this.handleOnChangeImage}
                              />
                            </label>
                            <p className="pl-1">
                              <FormattedMessage id="manage-user.drag"></FormattedMessage>
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            <FormattedMessage id="manage-user.detail"></FormattedMessage>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information Section */}
                <div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                    {/* First Name and Last Name in One Row */}
                    <div className="sm:col-span-3">
                      <label className="block text-lg font-medium text-gray-700">
                        <FormattedMessage id="manage-user.firstName"></FormattedMessage>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className={`mt-1 py-2 block w-full shadow-sm sm:text-lg rounded-md border ${
                          error.firstName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="First Name"
                        value={firstName}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "firstName")
                        }
                      />
                      {error.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.firstName}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-lg font-medium text-gray-700">
                        <FormattedMessage id="manage-user.lastName"></FormattedMessage>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className={`mt-1 py-2 block w-full shadow-sm sm:text-lg rounded-md border ${
                          error.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "lastName")
                        }
                      />
                      {error.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.lastName}
                        </p>
                      )}
                    </div>

                    {/* Email and Password in One Row */}
                    <div className="sm:col-span-3">
                      <label className="block text-lg font-medium text-gray-700">
                        <FormattedMessage id="manage-user.email"></FormattedMessage>
                      </label>
                      <input
                        type="text"
                        name="email"
                        className={`mt-1 py-2 block w-full shadow-sm sm:text-lg rounded-md border ${
                          error.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "email")
                        }
                        disabled={
                          this.state.action === CRUD_ACTIONS.EDIT ? true : false
                        }
                      />
                      {error.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.email}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-lg font-medium text-gray-700">
                        <FormattedMessage id="manage-user.password"></FormattedMessage>
                      </label>
                      <input
                        type="password"
                        className={`mt-1 py-2 block w-full shadow-sm sm:text-lg rounded-md border ${
                          error.password ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "password")
                        }
                        disabled={
                          this.state.action === CRUD_ACTIONS.EDIT ? true : false
                        }
                      />
                      {error.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.password}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-lg font-medium text-gray-700">
                        <FormattedMessage id="manage-user.phone"></FormattedMessage>
                      </label>
                      <input
                        type="text"
                        className={`mt-1 py-2 block w-full shadow-sm sm:text-lg rounded-md border ${
                          error.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "phone")
                        }
                      />
                      {error.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.phone}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-lg font-medium text-gray-700">
                        <FormattedMessage id="manage-user.address"></FormattedMessage>
                      </label>
                      <input
                        type="text"
                        className={`mt-1 py-2 block w-full shadow-sm sm:text-lg rounded-md border ${
                          error.address ? "border-red-500" : "border-gray-300"
                        }`}
                        value={address}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "address")
                        }
                      />
                      {error.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.address}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3 lg:col-span-2">
                      <label className="block text-lg font-medium text-gray-700">
                        <FormattedMessage id="manage-user.gender"></FormattedMessage>
                      </label>
                      <select
                        className="mt-1 py-2 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                        value={gender}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "gender")
                        }
                      >
                        {genderArr &&
                          genderArr.length > 0 &&
                          genderArr.map((item, index) => {
                            return (
                              <option key={index} value={item.key}>
                                {language === "en"
                                  ? item.value_EN
                                  : item.value_VI}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="sm:col-span-3 lg:col-span-2">
                      <label className="block text-lg font-medium text-gray-700">
                        <FormattedMessage id="manage-user.position"></FormattedMessage>
                      </label>
                      <select
                        className="mt-1 py-2 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                        value={position}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "position")
                        }
                      >
                        {positionArr &&
                          positionArr.length > 0 &&
                          positionArr.map((item, index) => {
                            return (
                              <option key={index} value={item.key}>
                                {language === "en"
                                  ? item.value_EN
                                  : item.value_VI}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="sm:col-span-3 lg:col-span-2">
                      <label className="block text-lg font-medium text-gray-700">
                        <FormattedMessage id="manage-user.role"></FormattedMessage>
                      </label>
                      <select
                        className="mt-1 py-2 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                        value={role}
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "role")
                        }
                      >
                        {roleArr &&
                          roleArr.length > 0 &&
                          roleArr.map((item, index) => {
                            return (
                              <option key={index} value={item.key}>
                                {language === "en"
                                  ? item.value_EN
                                  : item.value_VI}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex justify-end">
                  <button
                    type="submit"
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "inline-flex items-center px-6 py-2 border border-transparent text-lg font-semibold rounded-3xl shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        : "inline-flex items-center px-6 py-2 border border-transparent text-lg font-semibold rounded-3xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    }
                    onClick={() => this.handleSubmit()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.update"></FormattedMessage>
                    ) : (
                      <FormattedMessage id="manage-user.save"></FormattedMessage>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {this.state.isOpenPreview && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpenPreview: false })}
            />
          )}
        </div>

        <TableManageUSer
          handleUpdateUserFromParent={this.handleUpdateUserFromParent}
          action={this.state.action}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
    roles: state.admin.roles,
    positions: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    isLoadingPosition: state.admin.isLoadingPosition,
    isLoadingRole: state.admin.isLoadingRole,
    users: state.admin.users,
  };
};

// Fire Event
const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
    fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
    handleCreateNewUser: (data) => dispatch(actions.handleCreateNewUser(data)),
    fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
    handleUpdateUserRedux: (data) => dispatch(actions.handleUpdateUser(data)),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
