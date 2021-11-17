import React, { useState } from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../avatar/avatar.component";
import CreateClassRoomForm from "../create-classroom-form/create-classroom-form.component";
const TopNavigationHome = ({ onClassCreated }) => {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const handleClose = () => {
    setShowCreateClass(false);
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Tạo hoặc tham gia khóa học
    </Tooltip>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light px-3">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/logo.png" alt="" width={24} height={24} />
          <span>Gradeflix</span>
        </Link>

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
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Avatar />
      <CreateClassRoomForm
        show={showCreateClass}
        handleClose={handleClose}
        onClassCreated={onClassCreated}
      />
    </nav>
  );
};
export default TopNavigationHome;
