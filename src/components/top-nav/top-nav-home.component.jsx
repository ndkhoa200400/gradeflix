import React, { useState } from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../avatar-user/avatar-user.component";
import CreateClassRoomForm from "../create-classroom-form/create-classroom-form.component";
import JoinClassRoomForm from "../join-classroom-form/join-classroom-form.component";
import NotificationList from "../notification/notification-list.component";
const TopNavigationHome = ({ onClassCreated, onClassJoined }) => {
	const [showCreateClass, setShowCreateClass] = useState(false);
	const [showJoiningClass, setShowJoiningClass] = useState(false);
	const handleClose = () => {
		setShowCreateClass(false);
		setShowJoiningClass(false);
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

				<section className="utility d-flex justify-content-around align-items-center">
					<Dropdown align="end" className="mx-2">
						<OverlayTrigger placement="left" delay={{ show: 250, hide: 50 }} overlay={renderTooltip}>
							<Dropdown.Toggle
								variant="secondary"
								className="btn btn-add-classroom rounded rounded-circle"
								data-bs-toggle="dropdown"
								id="addClassroomBtn"
							>
								<i className="fas fa-plus"></i>
							</Dropdown.Toggle>
						</OverlayTrigger>
						<Dropdown.Menu>
							<Dropdown.Item type="button" onClick={() => setShowCreateClass(true)}>
								Thêm lớp học
							</Dropdown.Item>
							<Dropdown.Item type="button" onClick={() => setShowJoiningClass(true)}>
								Tham gia lớp học
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<NotificationList />

					{/* <div className="dropdown d-flex align-items-center justify-content-center mx-2">
						<div className=" " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
							<i className="far fa-bell fa-2x"></i>
						</div>
						<ul className="dropdown-menu" >
							<Dropdown.Item type="button" onClick={() => setShowJoiningClass(true)}>
								Tham gia lớp học
							</Dropdown.Item>
						</ul>
					</div> */}
					<Avatar />
				</section>
			</div>
			<CreateClassRoomForm show={showCreateClass} handleClose={handleClose} onClassCreated={onClassCreated} />
			<JoinClassRoomForm show={showJoiningClass} handleClose={handleClose} onClassJoined={onClassJoined} />
		</nav>
	);
};
export default TopNavigationHome;
