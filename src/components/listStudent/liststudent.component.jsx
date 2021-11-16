import React, { useState } from "react";
import CreateInviteForm from "../invite-form/invite-form.copoomponent";

import ChangeID from "../change-id-form/change-id-form-component";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";

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
  }

  const [showChangeID, setShowChangeID] = useState(false);

  return (
    <div>
      <table className="table table-striped table-hover col-lg-3">
        <thead>
          <tr>
            <th>Tên</th>
            <th>MSSV</th>
            <button type="button" class="btn btn-outline-dark" onClick={() => setShowInvite(true)}>
              <i className="fas fa-plus fa-1x"></i>
            </button>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr>
              <td>
                <img
                  src={item.avatar ?? "./default-avatar.png"}
                  width={24}
                  height={24}
                  className="me-2"
                ></img>
                {item.fullname}
              </td>
              <td>{item.studentId}</td>
              {
                 (classroom.user.userRole === "TEACHER" || classroom.user.userRole ==="HOST") ?
                <div>
                <Dropdown >


                  <Dropdown.Toggle
                    variant="light"
                    className="btn btn-light btn-add-classroom"
                    data-bs-toggle="dropdown"
                    id="addClassroomBtn"
                  >

                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      type="button"
                      onClick={() => {
                        setShowChangeID(true);
                        setidUser(item.id);
                      }
                      }
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
              </div> : <hr></hr>
                
              }
            </tr>
          ))}
        </tbody>
      </table>
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
