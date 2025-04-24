import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
} from "../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
import { toast } from "react-hot-toast";

class UserManage extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      users: [],
      isOpenModal: false,
      isOpenModalUpdateUser: false,
      userUpdate: null,
    };
  }

  async componentDidMount() {
    await this.getAllUsers();
  }

  getAllUsers = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        users: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
    emitter.emit("EVENT_CLEAR_MODAL_DATA");
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toggleUpdateUserModal = () => {
    this.setState({
      isOpenModalUpdateUser: !this.state.isOpenModalUpdateUser,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUser(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUsers();
        this.setState({
          isOpenModal: false,
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let response = await deleteUser(user.id);
      if (response && response.errCode === 0) {
        this.setState({
          users: [...this.state.users].filter(
            (item, index) => item.id !== user.id
          ),
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  updateUser = async (user) => {
    try {
      let response = await updateUser(user);
      if (response && response.errCode !== 0) {
        toast.error("Update thất bại!");
      } else {
        await this.getAllUsers();
        toast.success("Cập nhật người dùng thành công!", {
          icon: "✅",
          style: {
            borderRadius: "8px",
            background: "#1E293B",
            color: "#F1F5F9",
            fontSize: "14px",
          },
        });

        this.setState({
          isOpenModalUpdateUser: false,
        });
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Đã xảy ra lỗi hệ thống.");
    }
  };

  handleUpdateUser = (user) => {
    this.setState({
      isOpenModalUpdateUser: true,
      userUpdate: user,
    });
  };

  render() {
    let users = this.state.users;
    return (
      <div className="user-container px-4 py-6">
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        <ModalEditUser
          isOpen={this.state.isOpenModalUpdateUser}
          toggleFromParent={this.toggleUpdateUserModal}
          currentUser={this.state.userUpdate}
          updateUser={this.updateUser}
        />
        <div className="title text-2xl font-semibold text-center mb-4">
          Manage user
        </div>
        <div className="add-user flex justify-end py-3 mx-3">
          <button
            className="btn-add-user flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
            onClick={() => this.handleAddNewUser()}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Add New Users</span>
          </button>
        </div>
        <div className="user-table overflow-x-auto">
          <table className="table w-full border-collapse text-center">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-gray-300 p-3">Email</th>
                <th className="border border-gray-300 p-3">First Name</th>
                <th className="border border-gray-300 p-3">Last Name</th>
                <th className="border border-gray-300 p-3">Address</th>
                <th className="border border-gray-300 p-3">Option</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.length > 0 &&
                users.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-100 transition duration-150"
                    >
                      <td className="border border-gray-300 p-3">
                        {item.email}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {item.firstName}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {item.lastName}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {item.address}
                      </td>
                      <td className="border border-gray-300 p-3 flex justify-center gap-2">
                        <button
                          className="btn-edit"
                          onClick={() => this.handleUpdateUser(item)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn-delete text-red-500"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
