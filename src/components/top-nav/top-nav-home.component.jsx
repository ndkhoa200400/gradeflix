import React, { useState } from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import CreateClassRoomForm from "../create-classroom-form/create-classroom-form.component";
const TopNavigationHome = ({ onClassCreated }) => {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showJoinClass, setShowJoinClass] = useState(false);
  const handleClose = () => {
    setShowCreateClass(false);
    setShowJoinClass(false);
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Tạo hoặc tham gia khóa học
    </Tooltip>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light px-3">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src="/logo.png" alt="" width={24} height={24} />
          <span>Gradeflix</span>
        </a>
        <Dropdown>
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
              <i className="fas fa-plus fa-2x"></i>
            </Dropdown.Toggle>
          </OverlayTrigger>
          <Dropdown.Menu>
            <Dropdown.Item
              type="button"
              onClick={() => setShowCreateClass(true)}
            >
              Thêm lớp học
            </Dropdown.Item>

            <Dropdown.Item type="button" onClick={() => setShowJoinClass(true)}>
              Tham gia lớp học
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
      </div>

      <CreateClassRoomForm
        show={showCreateClass}
        handleClose={handleClose}
        onClassCreated={onClassCreated}
      />
    </nav>
  );
};
export default TopNavigationHome;
