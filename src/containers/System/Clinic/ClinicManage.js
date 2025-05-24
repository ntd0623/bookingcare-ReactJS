import React, { Component } from "react";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import _ from "lodash";
import "./ClinicManage.scss";

const mdParser = new MarkdownIt();

class ClinicManage extends Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
        this.coverInputRef = React.createRef();
        this.state = {
            nameClinic: "",
            addressClinic: "",
            previewImgURL: "",
            isOpenPreview: false,
            avatar: "",
            contentMarkdown: "",
            contentHTML: "",
            error: {}
        };
    }

    componentDidMount() {
        // Future implementation for fetching existing data
    }

    componentDidUpdate = (prevProps, prevState) => {
        // Future implementation for handling updates
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

    openCoverDialog = () => {
        if (this.coverInputRef.current) {
            this.coverInputRef.current.click();
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

    handleOnChangeImageFile = async (file) => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            });
        }
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    checkValidateInput = () => {
        let isValid = true;
        const requiredFields = ["nameClinic", "contentMarkdown", "addressClinic"];

        for (let i = 0; i < requiredFields.length; i++) {
            if (!this.state[requiredFields[i]]) {
                isValid = false;
                alert(`Missing required field: ${requiredFields[i]}`);
                break;
            }
        }

        return isValid;
    };

    handleSubmit = async () => {
        const isValid = this.checkValidateInput();
        if (isValid) {
            console.log("Check state: ", this.state)
            await this.props.handleCreateInforClinic({
                nameClinic: this.state.nameClinic,
                addressClinic: this.state.addressClinic,
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                avatar: this.state.avatar
            })
            this.setState({
                nameClinic: "",
                addressClinic: "",
                previewImgURL: "",
                contentMarkdown: "",
                contentHTML: ""
            })
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
            avatar: imageBase64,
            previewImgURL: imageBase64,
        });
    };

    render() {
        let { previewImgURL, nameClinic, contentMarkdown, addressClinic } = this.state;
        const { language } = this.props;

        return (
            <div className="specialty-manage-container bg-gray-50 min-h-screen py-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="specialty-title text-3xl font-bold text-center mb-10 text-gray-800">
                        <FormattedMessage id="manage-clinic.title" />
                    </h1>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-blue-600 px-6 py-4">
                            <h2 className="text-xl text-center font-semibold text-white">
                                <FormattedMessage id="manage-clinic.form-title" />
                            </h2>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Image section */}
                            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Profile image */}
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                                        <FormattedMessage id="manage-clinic.profile-image" />
                                    </h3>

                                    <div className="flex items-center">
                                        <div
                                            className="h-24 w-24 rounded-lg overflow-hidden bg-gray-200 cursor-pointer border-2 border-blue-500"
                                            onClick={() => this.openPreview()}
                                        >
                                            {!_.isEmpty(previewImgURL) ? (
                                                <img
                                                    src={previewImgURL}
                                                    className="h-full w-full object-cover"
                                                    alt="Specialty preview"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                                                    <svg
                                                        className="h-12 w-12 text-gray-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        <div className="ml-5">
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
                                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                                            >
                                                <FormattedMessage id="manage-clinic.change-image" />
                                            </button>
                                            <p className="text-sm text-gray-500 mt-2">
                                                <FormattedMessage id="manage-clinic.image-desc" />
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Cover image */}
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                                        <FormattedMessage id="manage-clinic.cover-image" />
                                    </h3>

                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <input
                                            id="cover-upload"
                                            type="file"
                                            ref={this.coverInputRef}
                                            onChange={this.handleOnChangeImage}
                                            className="sr-only"
                                            accept="image/*"
                                        />

                                        <div className="space-y-2"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                let files = e.dataTransfer.files;
                                                if (files.length > 0) {
                                                    this.handleOnChangeImageFile(files[0]);
                                                }
                                            }}
                                        >
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20l-12-12z"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M28 8v12h12M16 24l4 4 8-8"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>

                                            <div className="flex justify-center items-center"

                                            >
                                                <span
                                                    onClick={this.openCoverDialog}
                                                    className="mx-1 text-blue-500 font-semibold cursor-pointer hover:text-blue-700 text-center block"
                                                >
                                                    <FormattedMessage id="manage-clinic.upload-cover" />
                                                </span>

                                                <p>
                                                    <FormattedMessage id="manage-clinic.upload-cover-support" />
                                                </p>

                                            </div>

                                            <p className="text-xs text-gray-500">
                                                <FormattedMessage id="manage-clinic.cover-desc" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Basic information */}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">
                                    <FormattedMessage id="manage-clinic.basic-info" />
                                </h3>

                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                <FormattedMessage id="manage-clinic.name" />
                                                <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="nameClinic"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                                placeholder="Enter name clinic"
                                                value={nameClinic}
                                                onChange={(event) => this.handleOnChangeInput(event, "nameClinic")}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                <FormattedMessage id="manage-clinic.address" />
                                                <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="addressClinic"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                                placeholder="Enter address clinic"
                                                value={addressClinic}
                                                onChange={(event) => this.handleOnChangeInput(event, "addressClinic")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Markdown editor */}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">
                                    <FormattedMessage id="manage-clinic.description" />
                                    <span className="text-red-500">*</span>
                                </h3>

                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <MdEditor
                                        style={{ height: "500px", marginBottom: "20px" }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChange}
                                        value={contentMarkdown}
                                        placeholder="Enter detailed description about this clinic..."
                                    />
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-6 py-2 border border-transparent text-lg font-semibold rounded-3xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => this.handleSubmit()}
                                >
                                    <FormattedMessage id="manage-clinic.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lightbox for image preview */}
                {this.state.isOpenPreview && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpenPreview: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleCreateInforClinic: (data) => dispatch(actions.handleCreateInforClinic(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);