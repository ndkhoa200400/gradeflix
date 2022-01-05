import React, { useState } from "react";
import CreateInviteForm from "../invite-form/invite-form.component";
import Spining from "../spinning/spinning.component";
import { Dropdown, Modal, Table, Button } from "react-bootstrap";

import { postApiMethod } from "../../api/api-handler";

const ModalConFirmKick = ({ show, handleClose, idClass, user, onKickMember }) => {
	const [onSubmiting, setOnSubmiting] = useState(false);

	const onClick = async () => {
		setOnSubmiting(true);
		try {
			await postApiMethod("classrooms/" + idClass + "/users/" + user.id + "/kick");
			handleClose();
			onKickMember(user);
		} catch (err) {}

		setOnSubmiting(false);
	};
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Mời {user ? user.fullname : ""} ra khỏi phòng?</Modal.Title>
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
const ListTeacher = ({ list, classroom, onKickMember }) => {
	const idClass = classroom.id;
	const [showInvite, setShowInvite] = useState(false);
	const [showKickMember, setShowKickMember] = useState(false);
	const [user, setUser] = useState();
	const handleClose = () => {
		setShowInvite(false);
		setShowKickMember(false);
	};

	const KickMember = (user) => {
		setUser(user);
		setShowKickMember(true);
	};
	return (
		<div className="teacher-info my-3">
			<div>
				<h2>Giáo viên</h2>
			</div>
			<Table hover>
				<thead>
					<tr className="">
						<th>Tên</th>
						<th className="text-end">
							{classroom.user.userRole === "STUDENT" ? null : (
								<button type="button" className="btn btn-outline-dark" onClick={() => setShowInvite(true)}>
									<i className="fas fa-plus fa-1x"></i>
								</button>
							)}
						</th>
					</tr>
				</thead>
				<tbody>
					{list.map((item, idx) => (
						<tr key={idx}>
							<td className="py-3 d-flex justify-content-between align-items-center">
								<div className="user-info">
									<img
										src={item.avatar ?? "/default-avatar.png"}
										width={24}
										height={24}
										className="me-2"
										alt="member avatar"
									></img>
									{item.fullname} {item.userRole === "HOST" ? <span>(Người tạo)</span> : null}
								</div>
							</td>
							<td>
								{classroom.user.userRole === "HOST" && item.userRole === "TEACHER" ? (
									<Dropdown className="text-end">
										<Dropdown.Toggle
											variant="light"
											className="btn btn-light btn-add-classroom"
											data-bs-toggle="dropdown"
											id="addClassroomBtn"
										></Dropdown.Toggle>

										<Dropdown.Menu>
											<Dropdown.Item type="button" onClick={() => KickMember(item)}>
												Mời ra khỏi lớp
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								) : null}
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<CreateInviteForm show={showInvite} handleClose={handleClose} idClass={idClass} role="TEACHER" />
			<ModalConFirmKick
				show={showKickMember}
				handleClose={handleClose}
				user={user}
				idClass={idClass}
				onKickMember={onKickMember}
			/>
		</div>
	);
};

export default ListTeacher;
