import React, { useState } from "react";
import CreateInviteForm from "../invite-form/invite-form.copoomponent";

import ChangeID from "../change-id-form/change-id-form-component";
import { Dropdown, OverlayTrigger, Tooltip, Table } from "react-bootstrap";

import { postApiMethod } from "../../api/api-handler";
const ListStudent = ({ list, classroom }) => {
  const idClass = classroom.id;
  const [showInvite, setShowInvite] = useState(false);
  const handleClose = () => {
    setShowInvite(false);
    setShowChangeID(false);
  };
  const [idUser, setidUser] = useState(0);

  const KickMember = async (id) => {
    const data = await postApiMethod(
      "classrooms/" + idClass + "/users/" + id + "/kick"
    );
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
              <button
                type="button"
                class="btn btn-outline-dark ms-auto"
                onClick={() => setShowInvite(true)}
              >
                <i className="fas fa-plus fa-1x"></i>
              </button>
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
                          setidUser(item.id);
                        }}
                      >
                        Chỉnh sửa
                      </Dropdown.Item>
                      <Dropdown.Item
                        type="button"
                        onClick={() => KickMember(item.id)}
                      >
                        Đá
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
        userId={idUser}
      />
    </div>
  );
};

export default ListStudent;
