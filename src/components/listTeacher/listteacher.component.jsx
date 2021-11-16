import React, { useState } from "react";
import CreateInviteForm from "../invite-form/invite-form.copoomponent";
import ChangeID from "../change-id-form/change-id-form-component";
import { Dropdown, OverlayTrigger, Tooltip, Table } from "react-bootstrap";

import { postApiMethod } from "../../api/api-handler";
const ListTeacher = ({ list, classroom }) => {
  const idClass = classroom.id;
  const [showInvite, setShowInvite] = useState(false);
  const handleClose = () => {
    setShowInvite(false);
  };

  const KickMember = async (id) => {
    const data = await postApiMethod(
      "classrooms/" + idClass + "/users/" + id + "/kick"
    );
  };
  return (
    <div className="teacher-info my-4">
      <div>
        <h2>Giáo viên</h2>
      </div>
      <Table hover>
        <thead>
          <tr className="">
            <th>Tên</th>
            <th className="text-end">
              <button
                type="button"
                class="btn btn-outline-dark"
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
              <td className="py-3 d-flex justify-content-between align-items-center">
                <div className="user-info">
                  <img
                    src={item.avatar ?? "/default-avatar.png"}
                    width={24}
                    height={24}
                    className="me-2"
                    alt="member avatar"
                  ></img>
                  {item.fullname} {item.userRole === "HOST" ? (
                    <span>(Quản trị viên)</span>
                  ) : null}
                </div>
              </td>
              <td>
                {classroom.user.userRole === "HOST" &&
                item.userRole === "TEACHER" ? (
                  <Dropdown className="text-end">
                    <Dropdown.Toggle
                      variant="light"
                      className="btn btn-light btn-add-classroom"
                      data-bs-toggle="dropdown"
                      id="addClassroomBtn"
                    ></Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        type="button"
                        onClick={() => KickMember(item.id)}
                      >
                        Đá
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CreateInviteForm
        show={showInvite}
        handleClose={handleClose}
        idClass={idClass}
        role="TEACHER"
      />
    </div>
  );
};

export default ListTeacher;
