import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../../store/actions";
import * as ReactDOM from "react-dom";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}
class TableManageUser extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount = async () => {
    try {
      this.props.fetchAllUserStart();
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.users !== this.props.users) {
      let users = this.props.users;
      this.setState({
        userRedux: users,
      });
    }
  };

  handleDeleteUser = (user) => {
    this.props.deleteUser(user.id);
  };

  handleUpdateUser = (user) => {
    this.props.handleUpdateUserFromParent(user);
  };
  render() {
    console.log("UserRedux: ", this.state.userRedux);
    let { userRedux } = this.state;
    return (
      <React.Fragment>
        <table className="table w-full border-collapse text-center rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-gray-300 p-3 font-bold">Email</th>
              <th className="border border-gray-300 p-3 font-bold">
                First Name
              </th>
              <th className="border border-gray-300 p-3 font-bold">
                Last Name
              </th>
              <th className="border border-gray-300 p-3 font-bold">Address</th>
              <th className="border border-gray-300 p-3 font-bold">Option</th>
            </tr>
          </thead>
          <tbody>
            {userRedux &&
              userRedux.length > 0 &&
              userRedux.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="border border-gray-200 p-3">{item.email}</td>
                    <td className="border border-gray-200 p-3">
                      {item.firstName}
                    </td>
                    <td className="border border-gray-200 p-3">
                      {item.lastName}
                    </td>
                    <td className="border border-gray-200 p-3">
                      {item.address}
                    </td>
                    <td className="border border-gray-200 p-3">
                      <div className="flex justify-center gap-4">
                        <button
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                          onClick={() => this.handleUpdateUser(item)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
    deleteUser: (userId) => dispatch(actions.handleDeleteUser(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
