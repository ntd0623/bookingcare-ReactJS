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
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
import { toast } from "react-hot-toast";

class UserManage extends Component {
  constructor(prop) {
    super(prop);
    console.log("Constructor: isOpenModal =", this.state?.isOpenModal);
    this.state = {
      users: [],
      isOpenModal: false,
      isOpenModalUpdateUser: false,
      userUpdate: null,
    };
  }

  async componentDidMount() {
    console.log("componentDidMount: isOpenModal =", this.state.isOpenModal);
    await this.getAllUsers();
  }

  getAllUsers = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      console.log(
        "getAllUsers: Setting users, isOpenModal =",
        this.state.isOpenModal
      );
      this.setState({
        users: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    console.log(
      "handleAddNewUser: Before setState, isOpenModal =",
      this.state.isOpenModal
    );
    this.setState(
      {
        isOpenModal: true,
      },
      () => {
        console.log(
          "handleAddNewUser: After setState, isOpenModal =",
          this.state.isOpenModal
        );
      }
    );
    emitter.emit("EVENT_CLEAR_MODAL_DATA");
  };

  toggleUserModal = () => {
    console.log(
      "toggleUserModal: Before setState, isOpenModal =",
      this.state.isOpenModal
    );
    this.setState(
      {
        isOpenModal: !this.state.isOpenModal,
      },
      () => {
        console.log(
          "toggleUserModal: After setState, isOpenModal =",
          this.state.isOpenModal
        );
      }
    );
  };

  toggleUpdateUserModal = () => {
    console.log(
      "toggleUpdateUserModal: Before setState, isOpenModalUpdateUser =",
      this.state.isOpenModalUpdateUser
    );
    this.setState(
      {
        isOpenModalUpdateUser: !this.state.isOpenModalUpdateUser,
      },
      () => {
        console.log(
          "toggleUpdateUserModal: After setState, isOpenModalUpdateUser =",
          this.state.isOpenModalUpdateUser
        );
      }
    );
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUser(data);
      if (response && response.errCode !== 0) {
        toast.error(response.message);
      } else {
        await this.getAllUsers();
        console.log(
          "createNewUser: Before setState, isOpenModal =",
          this.state.isOpenModal
        );
        this.setState(
          {
            isOpenModal: false,
          },
          () => {
            console.log(
              "createNewUser: After setState, isOpenModal =",
              this.state.isOpenModal
            );
          }
        );
        toast.success("Người dùng được tạo thành công!");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Đã xảy ra lỗi hệ thống.");
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let response = await deleteUser(user.id);
      if (response && response.errCode === 0) {
        console.log(
          "handleDeleteUser: Before setState, isOpenModal =",
          this.state.isOpenModal
        );
        this.setState({
          users: [...this.state.users].filter((item) => item.id !== user.id),
        });
        toast.success("Xóa người dùng thành công!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Đã xảy ra lỗi hệ thống.");
    }
  };

  updateUser = async (user) => {
    try {
      let response = await updateUser(user);
      if (response && response.errCode !== 0) {
        toast.error("Cập nhật thất bại!");
      } else {
        await this.getAllUsers();
        console.log(
          "updateUser: Before setState, isOpenModalUpdateUser =",
          this.state.isOpenModalUpdateUser
        );
        this.setState(
          {
            isOpenModalUpdateUser: false,
          },
          () => {
            console.log(
              "updateUser: After setState, isOpenModalUpdateUser =",
              this.state.isOpenModalUpdateUser
            );
          }
        );
        toast.success("Cập nhật người dùng thành công!");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Đã xảy ra lỗi hệ thống.");
    }
  };

  handleUpdateUser = (user) => {
    console.log(
      "handleUpdateUser: Before setState, isOpenModalUpdateUser =",
      this.state.isOpenModalUpdateUser
    );
    this.setState(
      {
        isOpenModalUpdateUser: true,
        userUpdate: user,
      },
      () => {
        console.log(
          "handleUpdateUser: After setState, isOpenModalUpdateUser =",
          this.state.isOpenModalUpdateUser
        );
      }
    );
  };

  render() {
    let users = this.state.users;
    console.log("Render: isOpenModal =", this.state.isOpenModal);
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Quản lý người dùng
        </h1>
        <div className="flex justify-end mb-4">
          <button
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
            onClick={() => this.handleAddNewUser()}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Thêm người dùng</span>
          </button>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="border border-gray-200 p-3 font-semibold">
                  Email
                </th>
                <th className="border border-gray-200 p-3 font-semibold">
                  Tên
                </th>
                <th className="border border-gray-200 p-3 font-semibold">Họ</th>
                <th className="border border-gray-200 p-3 font-semibold">
                  Địa chỉ
                </th>
                <th className="border border-gray-200 p-3 font-semibold">
                  Tùy chọn
                </th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((item) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    Không có người dùng nào
                  </td>
                </tr>
              )}
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
