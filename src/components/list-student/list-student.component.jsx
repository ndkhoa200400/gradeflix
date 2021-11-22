import React, { useState } from "react";
import CreateInviteForm from "../invite-form/invite-form.component";
import Spining from "../spinning/spinning.component";
import ChangeID from "../change-id-form/change-id-form-component";
import { Dropdown, Modal, Table,Button } from "react-bootstrap";

import { postApiMethod } from "../../api/api-handler";

const ModalConFirmKick = ({ show, handleClose,idClass, user, onKickMember }) => {
  const [onSubmiting, setOnSubmiting] = useState(false);
  
  const onClick = async () => {
    setOnSubmiting(true);
    try {
     const data = await postApiMethod(
       "classrooms/" + idClass + "/users/" + user.id + "/kick"
      );
      handleClose();
      onKickMember(user);
    } catch (err) {}

    setOnSubmiting(false);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mời {user?user.fullname:""} ra khỏi phòng?</Modal.Title>
        {onSubmiting ? <Spining isFull={false} className="mx-2" /> : null}
      </Modal.Header>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="outline-primary" onClick={onClick}>
          Đồng ý
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ListStudent = ({ list, classroom, onKickMember, onEditStudentId }) => {
  const idClass = classroom.id;
  const [showInvite, setShowInvite] = useState(false);
  const [showKickMember, setShowKickMember] = useState(false);
  const handleClose = () => {
    setShowInvite(false);
    setShowChangeID(false);
    setShowKickMember(false)
  };
  const [user, setUser] = useState();

  const KickMember = (user) => {
    setUser(user);
    setShowKickMember(true)
  };

  const [showChangeID, setShowChangeID] = useState(false);

  return (
    <div className="student-info my-5">
      <div>
        <h2>Sinh viên</h2>
      </div>
      <Table hover>
        <thead>
          <tr className="">
            <th>Tên</th>
            <th>MSSV</th>
            <th align="right" className="text-end">
            {classroom.user.userRole === "STUDENT"?
                null
                :
                <button
                type="button"
                class="btn btn-outline-dark"
                onClick={() => setShowInvite(true)}
              >
                <i className="fas fa-plus fa-1x"></i>
              </button>}
              
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr>
              <td className="py-3 ">
                <div className="user-info">
                  <img
                    src={item.avatar ?? "/default-avatar.png"}
                    width={24}
                    height={24}
                    className="me-2"
                    alt="member avatar"
                  ></img>
                  {item.fullname}{" "}
                 
                </div>
              </td>
              <td>{item.studentId}</td>
              {classroom.user.userRole === "TEACHER" ||
              classroom.user.userRole === "HOST" ? (
                <td align="right">
                  <Dropdown className="">
                    <Dropdown.Toggle
                      variant="light"
                      className="btn btn-light btn-add-classroom"
                      data-bs-toggle="dropdown"
                      id="addClassroomBtn"
                    ></Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        type="button"
                        onClick={() => {
                          setShowChangeID(true);
                          setUser(item);
                        }}
                      >
                        Chỉnh sửa mã số sinh viên
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="button"
                        onClick={() => KickMember(item)}
                      >
                        Mời ra khỏi lớp
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              ) : (
                <td></td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <CreateInviteForm
        show={showInvite}
        handleClose={handleClose}
        idClass={idClass}
        role="STUDENT"
      />
      <ChangeID
        show={showChangeID}
        handleClose={handleClose}
        idClass={idClass}
        user={user}
        onEditStudentId = {onEditStudentId}
      />
      <ModalConFirmKick
        show={showKickMember}
        handleClose={handleClose}
        user={user}
        idClass = {idClass}
        onKickMember={onKickMember}
      />
    </div>
  );
};

export default ListStudent;