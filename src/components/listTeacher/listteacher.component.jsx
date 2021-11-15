import React, { useState } from "react";
import CreateInviteForm from "../invite-form/invite-form.copoomponent";
import ChangeID from "../change-id-form/change-id-form-component";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";

import { getApiMethod } from "../../api/api-handler";
const ListTeacher = ({ list, idClass }) => {
  const [showInvite, setShowInvite] = useState(false);
const handleClose = () => {
  setShowInvite(false);
  setShowChangeID(false);
};
const [showChangeID, setShowChangeID] = useState(false);
const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
  
  </Tooltip>
);

const KickMember =async (id) => {
  const data = await getApiMethod(
    "classrooms/" + idClass+ "/users/"+id+"/kick"
  );
}
return (
    <div>
      <table className="table table-hover col-lg-3">
        <thead>
          <tr>
            <th>Tên</th>
            
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
              <div>
              <Dropdown >
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 50 }}
            overlay={renderTooltip}
          >
            <Dropdown.Toggle
              variant="light"
              className="btn btn-light btn-add-classroom"
              data-bs-toggle="dropdown"
              id="addClassroomBtn"
            >
              
            </Dropdown.Toggle>
          </OverlayTrigger>
          <Dropdown.Menu>
            <Dropdown.Item
              type="button"
              onClick={() => setShowChangeID(true)}
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
              </div>
            </tr>
            
          ))}
        </tbody>
      </table>
      <CreateInviteForm
        show={showInvite}
        handleClose={handleClose}
        idClass={idClass}
        role ="TEACHER"
      />
      <ChangeID
        show={showChangeID}
        handleClose={handleClose}
        idClass={idClass}
        role ="TEACHER"
      />
    </div>
  );
};

export default ListTeacher;
