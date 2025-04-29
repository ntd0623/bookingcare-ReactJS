import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./DoctorManage.scss";
import Select from "react-select";
const mdParser = new MarkdownIt();

class DoctorManage extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      doctors: [],
    };
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSaveContentMarkdown = () => {
    console.log("Check state: ", this.state);
    this.props.createInfoDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorID: this.state.selectedDoctor.value,
    });
  };

  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleOnChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  componentDidMount = async () => {
    this.props.getAllDoctors();
  };

  buidListDoctors = (listDoctors) => {
    let listDoctorArr = [];
    let { language } = this.props;
    if (listDoctors && listDoctors.length > 0) {
      listDoctors.map((item, index) => {
        let obj = {};
        let labelVI = `${item.firstName} ${item.lastName}`;
        let labelEN = `${item.lastName} ${item.firstName}`;
        obj.label = language === LANGUAGES.VI ? labelVI : labelEN;
        obj.value = item.id;
        listDoctorArr.push(obj);
      });
    }
    return listDoctorArr;
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.doctors !== this.props.doctors ||
      prevProps.language !== this.props.language
    ) {
      let doctorOptions = this.buidListDoctors(this.props.doctors);
      this.setState({
        doctors: doctorOptions,
      });
    }
  };

  render() {
    const { selectedDoctor } = this.state;
    console.log("check selectedDoctors: ", selectedDoctor);
    return (
      <div className="doctor-manage-container">
        <div className="doctor-manage-title">Hello Thanh Đô</div>
        <div className="more-info grid grid-cols-2 gap-4">
          <div className="content-left mb-4 p-4">
            <label
              for="message"
              class="block text-xl font-medium text-gray-700 mb-4"
            >
              Chọn bác sĩ
            </label>
            <Select
              classNames={{
                control: () =>
                  "border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500",
                input: () => "text-base",
                menu: () => "mt-1 border border-gray-200 rounded-lg shadow-md",
                option: ({ isFocused, isSelected }) =>
                  `px-4 py-2 cursor-pointer ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : isFocused
                      ? "bg-blue-100"
                      : ""
                  }`,
              }}
              value={selectedDoctor}
              onChange={this.handleChange}
              options={this.state.doctors}
            />
          </div>
          <div class="content-right mb-4 p-4">
            <label
              for="message"
              class="block text-xl font-medium text-gray-700 mb-4"
            >
              Thông tin giới thiệu
            </label>
            <textarea
              value={this.state.description}
              onChange={(e) => this.handleOnChangeDescription(e)}
              class="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Nhập nội dung tại đây..."
            ></textarea>
          </div>
        </div>
        <div className="doctor-manage-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <div className="button">
          <button
            onClick={() => this.handleSaveContentMarkdown()}
            className="save-info"
          >
            Lưu thông tin
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.getAllDoctors()),
    createInfoDoctor: (data) => dispatch(actions.createInfoDoctor(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
