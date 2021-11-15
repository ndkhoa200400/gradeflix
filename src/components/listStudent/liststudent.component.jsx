import React, { useState } from "react";
import CreateInviteForm from "../invite-form/invite-form.copoomponent";

const ListStudent = ({ list, idClass}) => {
  const [showInvite, setShowInvite] = useState(false);
  const handleClose = () => {
    setShowInvite(false);
    setShowChangeID(false);
  };
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
            </tr>
          ))}
        </tbody>
      </table>
      <CreateInviteForm
        show={showInvite}
        handleClose={handleClose}
        idClass={idClass}
        role ="STUDENT"
      />
    </div>
  );
};

export default ListStudent;
