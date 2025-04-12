import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
} from "../../services/userService";
import "./UserManage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faPlus } from "@fortawesome/free-solid-svg-icons";
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
      <div className="user-container">
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
        <div className="title text-center">Manage user</div>
        <div className="add-user text-end py-3 mx-3">
          <button
            className="btn-add-user"
            onClick={() => this.handleAddNewUser()}
          >
            <i>
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </i>
            <span>Add New Users</span>
          </button>
        </div>
        <div className="user-table">
          <table className="table table-hover table-bordered text-center align-middle">
            <thead className="table-primary">
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.length > 0 &&
                users.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn btn-edit"
                          onClick={() => this.handleUpdateUser(item)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-delete"
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
