import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./DoctorManage.scss";
import _ from "lodash";
import Select from "react-select";
const mdParser = new MarkdownIt();

class DoctorManage extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      contentId: "",
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      doctors: [],
      action: "ADD",

      prices: [],
      selectedPrice: "",
      paymentMethods: [],
      selectedPayment: "",
      provinces: [],
      selectedProvince: "",
      specialties: [],
      selectedSepcialty: "",
      clinics: [],
      selectedClinic: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSaveContentMarkdown = () => {
    if (this.state.action === CRUD_ACTIONS.ADD) {
      this.props.createInfoDoctor({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        doctorID: this.state.selectedDoctor.value,
        // Doctor-Info
        priceID: this.state.selectedPrice.value,
        provinceID: this.state.selectedProvince.value,
        paymentID: this.state.selectedPayment.value,
        specialtyID: this.state.selectedSepcialty.value,
        clinicID: this.state.selectedClinic,
        addressClinic: this.state.addressClinic,
        nameClinic: this.state.nameClinic,
        note: this.state.note,
      });
      this.setState({
        contentId: "",
        contentMarkdown: "",
        contentHTML: "",
        selectedDoctor: "",
        description: "",
        action: "ADD",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        selectedSepcialty: "",
        selectedClinic: "",
        nameClinic: "",
        addressClinic: "",
        note: "",
      });
    } else {
      this.props.handleUpdateContentMarkdown({
        id: this.state.contentId,
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        doctorID: this.state.selectedDoctor.value,

        // Doctor-Info
        priceID: this.state.selectedPrice.value,
        provinceID: this.state.selectedProvince.value,
        paymentID: this.state.selectedPayment.value,
        specialtyID: this.state.selectedSepcialty.value,
        clinicID: this.state.selectedClinic,
        addressClinic: this.state.addressClinic,
        nameClinic: this.state.nameClinic,
        note: this.state.note,
      });
      this.setState({
        contentId: "",
        contentMarkdown: "",
        contentHTML: "",
        selectedDoctor: "",
        description: "",
        action: "ADD",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        selectedSepcialty: "",
        selectedClinic: "",
        nameClinic: "",
        addressClinic: "",
        note: "",
      });
    }
  };

  handleChangeSelected = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let content = await this.props.getDetailInfoDoctorById(
      selectedDoctor.value
    );
    let { prices, paymentMethods, provinces, specialties } = this.state;
    let nameClinic = "",
      addressClinic = "",
      note = "",
      selectedPayment = "",
      selectedPrice = "",
      selectedProvince = "",
      selectedClinic = "",
      selectedSepcialty = "";
    if (content && content.Markdown) {
      if (content.Doctor_Info) {
        nameClinic = content.Doctor_Info.nameClinic;
        addressClinic = content.Doctor_Info.addressClinic;
        note = content.Doctor_Info.note;
        // Find INFO input below database and set value input
        selectedPayment = paymentMethods.find((item) => {
          return item.value === content.Doctor_Info.paymentData.key;
        });
        selectedPrice = prices.find((item) => {
          return item.value === content.Doctor_Info.priceData.key;
        });
        selectedProvince = provinces.find((item) => {
          return item.value === content.Doctor_Info.provinceData.key;
        });
        selectedSepcialty = specialties.find((item) => {
          return item.value === content.Doctor_Info.specialtyID;
        });
      }
      this.setState({
        action: CRUD_ACTIONS.EDIT,
        contentMarkdown: content.Markdown.contentMarkdown,
        contentHTML: content.Markdown.contentHTML,
        description: content.Markdown.description,
        contentId: content.Markdown.id,
        nameClinic: nameClinic,
        addressClinic: addressClinic,
        note: note,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedSepcialty: selectedSepcialty
      });
    } else {
      this.setState({
        action: CRUD_ACTIONS.ADD,
        contentMarkdown: "",
        contentHTML: "",
        description: "",
      });
    }
  };

  handleChangeSelectedInput = async (selectedInput, name) => {
    let stateName = name.name;
    let coppyState = { ...this.state };
    coppyState[stateName] = selectedInput;
    this.setState({
      ...coppyState,
    });
  };

  handleOnChangeDescription = (e, name) => {
    let stateName = name;
    let coppyState = { ...this.state };
    coppyState[stateName] = e.target.value;
    this.setState({
      ...coppyState,
    });
  };
  componentDidMount = async () => {
    this.props.getAllDoctors();
    this.props.getPriceMedicalExamination();
    this.props.getPaymentMedthod();
    this.props.getProvince();
    this.props.getAllSpecialty();
    this.setState({
      action: CRUD_ACTIONS.ADD,
      selectedDoctor: "",
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      contentId: "",
    });
  };

  buildChangeLanguage = (listItem, type) => {
    let lisItemArr = [];
    let { language } = this.props;
    if (listItem && listItem.length > 0) {
      if (type === "USERS") {
        listItem.map((item, index) => {
          let obj = {};
          let labelVI = `${item.firstName} ${item.lastName}`;
          let labelEN = `${item.lastName} ${item.firstName}`;
          obj.label = language === LANGUAGES.VI ? labelVI : labelEN;
          obj.value = item.id;
          lisItemArr.push(obj);
        });
      }
      if (type === "PRICE") {
        listItem.map((item, index) => {
          let obj = {};
          let labelVI = `${item.value_VI} VNĐ`;
          let labelEN = `${item.value_EN} USD`;
          obj.label = language === LANGUAGES.VI ? labelVI : labelEN;
          obj.value = item.key;
          lisItemArr.push(obj);
        });
      }
      if (type === "PROVINCE" || type === "PAYMENT") {
        listItem.map((item, index) => {
          let obj = {};
          let labelVI = `${item.value_VI}`;
          let labelEN = `${item.value_EN}`;
          obj.label = language === LANGUAGES.VI ? labelVI : labelEN;
          obj.value = item.key;
          lisItemArr.push(obj);
        });
      }
      if (type === "SPECIALTIES") {
        listItem.map((item, index) => {
          let obj = {};
          obj.label = item.name;
          obj.value = item.id;
          lisItemArr.push(obj);
        })
      }
    }
    return lisItemArr;
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.doctors !== this.props.doctors ||
      prevProps.language !== this.props.language
    ) {
      let doctorOptions = this.buildChangeLanguage(this.props.doctors, "USERS");
      this.setState({
        doctors: doctorOptions,
      });
    }
    if (
      prevProps.prices !== this.props.prices ||
      prevProps.language !== this.props.language
    ) {
      let prices = this.buildChangeLanguage(this.props.prices, "PRICE");
      this.setState({
        prices: prices,
      });
    }

    if (
      prevProps.paymentMethods !== this.props.paymentMethods ||
      prevProps.language !== this.props.language
    ) {
      let paymentMethods = this.buildChangeLanguage(
        this.props.paymentMethods,
        "PAYMENT"
      );
      this.setState({
        paymentMethods: paymentMethods,
      });
    }

    if (
      prevProps.provinces !== this.props.provinces ||
      prevProps.language !== this.props.language
    ) {
      let provinces = this.buildChangeLanguage(
        this.props.provinces,
        "PROVINCE"
      );
      this.setState({
        provinces: provinces,
      });
    }

    if (
      prevProps.specialties !== this.props.specialties ||
      prevProps.language !== this.props.language
    ) {
      let specialties = this.buildChangeLanguage(
        this.props.specialties,
        "SPECIALTIES"
      );
      this.setState({
        specialties: specialties,
      });
    }
  };

  render() {
    let { selectedDoctor, selectedPrice, selectedPayment, selectedProvince, selectedSepcialty, selectedClinic } =
      this.state;
    console.log("Check state: ", this.state);
    return (
      <div className="doctor-manage-container">
        <div className="doctor-manage-title">
          <FormattedMessage id="manage-doctor.doctor-infor"></FormattedMessage>
        </div>
        <div className="more-info grid grid-cols-2 gap-4">
          <div className="content-left mb-4 p-4">
            <label
              for="message"
              class="block text-xl font-medium text-gray-700 mb-4"
            >
              <FormattedMessage id="manage-doctor.choose-doctor"></FormattedMessage>
            </label>
            <Select
              classNames={{
                control: () =>
                  "border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500",
                input: () => "text-base",
                menu: () => "mt-1 border border-gray-200 rounded-lg shadow-md",
                option: ({ isFocused, isSelected }) =>
                  `px-4 py-2 cursor-pointer ${isSelected
                    ? "bg-blue-500 text-white"
                    : isFocused
                      ? "bg-blue-100"
                      : ""
                  }`,
              }}
              placeholder={
                <FormattedMessage id="manage-doctor.choose-doctor"></FormattedMessage>
              }
              value={selectedDoctor}
              onChange={this.handleChangeSelected}
              options={this.state.doctors}
            />
          </div>
          <div class="content-right mb-4 p-4">
            <label
              for="message"
              class="block text-xl font-medium text-gray-700 mb-4"
            >
              <FormattedMessage id="manage-doctor.doctor-intro"></FormattedMessage>
            </label>
            <textarea
              value={this.state.description}
              onChange={(e) => this.handleOnChangeDescription(e, "description")}
              class="w-full h-30 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Nhập nội dung tại đây..."
            ></textarea>
          </div>
        </div>
        {/* More INFO */}
        <div class="more-info grid grid-cols-3 gap-4">
          {/* Price */}
          <div className="content-left mb-4 p-4">
            <label
              for="message"
              class="block text-xl font-medium text-gray-700 mb-4"
            >
              <FormattedMessage id="manage-doctor.price"></FormattedMessage>
            </label>
            <Select
              classNames={{
                control: () =>
                  "border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500",
                input: () => "text-base",
                menu: () => "mt-1 border border-gray-200 rounded-lg shadow-md",
                option: ({ isFocused, isSelected }) =>
                  `px-4 py-2 cursor-pointer ${isSelected
                    ? "bg-blue-500 text-white"
                    : isFocused
                      ? "bg-blue-100"
                      : ""
                  }`,
              }}
              placeholder={
                <FormattedMessage id="manage-doctor.price"></FormattedMessage>
              }
              value={selectedPrice}
              onChange={this.handleChangeSelectedInput}
              name="selectedPrice"
              options={this.state.prices}
            />
          </div>
          {/* Method Payment */}
          <div className="content-left mb-4 p-4">
            <label
              for="message"
              class="block text-xl font-medium text-gray-700 mb-4"
            >
              <FormattedMessage id="manage-doctor.payment"></FormattedMessage>
            </label>
            <Select
              classNames={{
                control: () =>
                  "border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500",
                input: () => "text-base",
                menu: () => "mt-1 border border-gray-200 rounded-lg shadow-md",
                option: ({ isFocused, isSelected }) =>
                  `px-4 py-2 cursor-pointer ${isSelected
                    ? "bg-blue-500 text-white"
                    : isFocused
                      ? "bg-blue-100"
                      : ""
                  }`,
              }}
              placeholder={
                <FormattedMessage id="manage-doctor.payment"></FormattedMessage>
              }
              value={selectedPayment}
              onChange={this.handleChangeSelectedInput}
              name="selectedPayment"
              options={this.state.paymentMethods}
            />
          </div>
          {/* Province */}
          <div className="content-left mb-4 p-4">
            <label
              for="message"
              class="block text-xl font-medium text-gray-700 mb-4"
            >
              <FormattedMessage id="manage-doctor.province"></FormattedMessage>
            </label>
            <Select
              classNames={{
                control: () =>
                  "border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500",
                input: () => "text-base",
                menu: () => "mt-1 border border-gray-200 rounded-lg shadow-md",
                option: ({ isFocused, isSelected }) =>
                  `px-4 py-2 cursor-pointer ${isSelected
                    ? "bg-blue-500 text-white"
                    : isFocused
                      ? "bg-blue-100"
                      : ""
                  }`,
              }}
              placeholder={
                <FormattedMessage id="manage-doctor.province"></FormattedMessage>
              }
              value={selectedProvince}
              onChange={this.handleChangeSelectedInput}
              options={this.state.provinces}
              name="selectedProvince"
            />
          </div>
          {/* Specialty */}
          <div className="content-left mb-4 p-4">
            <label
              for="message"
              class="block text-xl font-medium text-gray-700 mb-4"
            >
              <FormattedMessage id="manage-doctor.specialty"></FormattedMessage>

            </label>
            <Select
              classNames={{
                control: () =>
                  "border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500",
                input: () => "text-base",
                menu: () => "mt-1 border border-gray-200 rounded-lg shadow-md",
                option: ({ isFocused, isSelected }) =>
                  `px-4 py-2 cursor-pointer ${isSelected
                    ? "bg-blue-500 text-white"
                    : isFocused
                      ? "bg-blue-100"
                      : ""
                  }`,
              }}
              placeholder={<FormattedMessage id="manage-doctor.choose-specialty"></FormattedMessage>
              }
              value={selectedSepcialty}
              onChange={this.handleChangeSelectedInput}
              options={this.state.specialties}
              name="selectedSepcialty"
            />
          </div>
          {/* Clinic */}
          <div className="content-left mb-4 p-4">
            <label
              for="message"
              class="block text-xl font-medium text-gray-700 mb-4"
            >
              <FormattedMessage id="manage-doctor.clinic"></FormattedMessage>

            </label>
            <Select
              classNames={{
                control: () =>
                  "border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500",
                input: () => "text-base",
                menu: () => "mt-1 border border-gray-200 rounded-lg shadow-md",
                option: ({ isFocused, isSelected }) =>
                  `px-4 py-2 cursor-pointer ${isSelected
                    ? "bg-blue-500 text-white"
                    : isFocused
                      ? "bg-blue-100"
                      : ""
                  }`,
              }}
              placeholder={<FormattedMessage id="manage-doctor.choose-clinic"></FormattedMessage>
              }
              value={selectedClinic}
              onChange={this.handleChangeSelectedInput}
              options={this.state.clinics}
              name="selectedClinic"
            />
          </div>
          {/* Name Clinic */}
          <div className="content-left mb-4 p-4">
            <label
              for="nameClinic"
              className="block text-xl font-medium text-gray-700 mb-4"
            >
              <FormattedMessage id="manage-doctor.nameClinic"></FormattedMessage>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2 text-base"
              value={this.state.nameClinic}
              onChange={(e) => this.handleOnChangeDescription(e, "nameClinic")}
            />
          </div>

          {/* Address Clinic */}
          <div className="content-left mb-4 p-4">
            <label
              for="addressClinic"
              className="block text-xl font-medium text-gray-700 mb-4"
            >
              <FormattedMessage id="manage-doctor.addressClinic"></FormattedMessage>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2 text-base"
              value={this.state.addressClinic}
              onChange={(e) =>
                this.handleOnChangeDescription(e, "addressClinic")
              }
            />
          </div>

          {/* Note */}
          <div className="content-left mb-4 p-4">
            <label
              for="note"
              className="block text-xl font-medium text-gray-700 mb-4"
            >
              <FormattedMessage id="manage-doctor.note"></FormattedMessage>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2 text-base"
              value={this.state.note}
              onChange={(e) => this.handleOnChangeDescription(e, "note")}
            />
          </div>
        </div>
        <div className="doctor-manage-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <div className="button">
          <button
            onClick={() => this.handleSaveContentMarkdown()}
            className={
              this.state.action === CRUD_ACTIONS.ADD
                ? "save-info bg-blue-500 hover:bg-blue-600"
                : "save-info bg-yellow-500 hover:bg-yellow-600"
            }
          >
            {this.state.action === CRUD_ACTIONS.ADD ? (
              <FormattedMessage id="manage-doctor.save"></FormattedMessage>
            ) : (
              <FormattedMessage id="manage-doctor.update"></FormattedMessage>
            )}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    users: state.admin.users,
    doctors: state.admin.doctors,
    prices: state.admin.prices,
    paymentMethods: state.admin.paymentMethods,
    provinces: state.admin.provinces,
    specialties: state.admin.listSpecialty
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.getAllDoctors()),
    createInfoDoctor: (data) => dispatch(actions.createInfoDoctor(data)),
    getDetailInfoDoctorById: (id) =>
      dispatch(actions.getDetailInfoDoctorById(id)),
    handleUpdateContentMarkdown: (data) =>
      dispatch(actions.handleUpdateContentMarkdown(data)),
    getPriceMedicalExamination: () =>
      dispatch(actions.getPriceMedicalExamination()),
    getPaymentMedthod: () => dispatch(actions.getPaymentMedthod()),
    getProvince: () => dispatch(actions.getProvince()),
    getAllSpecialty: () => dispatch(actions.handleGetAllSpecialty())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
