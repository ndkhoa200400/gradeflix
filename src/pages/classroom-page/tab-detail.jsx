import React, { useState } from "react";
import { Col, Row, Card, Button, Toast } from "react-bootstrap";
import EditClassRoomForm from "./edit-classroom-form";
const TabDetail = ({ classroom, onEditedClassRoom }) => {
	const [showEditClass, setEditCreateClass] = useState(false);
	const handleClose = () => {
		setEditCreateClass(false);
	};
	const [show, setShow] = useState(false);
	const openModal = () => {
		setEditCreateClass(true);
	};
	const invLink = `${window.location.host}/invitation?classroomId=${classroom.id}&role=STUDENT`;
	const copyCodeToClipboard = () => {
		navigator.clipboard.writeText(invLink);
		setShow(true);
	};

	return (
		<div className="tab-detail pb-3">
			<Row>
				<Col sm={3}>
					{classroom && classroom.user.userRole === "STUDENT" ? (
						<Card>
							<Card.Header>
								<Card.Title>Bài tập sắp đến hạn</Card.Title>
							</Card.Header>
							<Card.Body>
								<Card.Text>Không có bài tập nào sắp đến hạn</Card.Text>
							</Card.Body>
						</Card>
					) : (
						<div>
							<Card style={{ marginBottom: "10px", position: "relative" }}>
								<Card.Header>
									<Card.Title> Đường dẫn vào lớp</Card.Title>
								</Card.Header>
								<Card.Body>
									<div
										style={{
											display: "flex",
											lexDirection: "row",
											justifyContent: "center",
										}}
									>
										<Card.Text style={{ flexWrap: "nowrap", overflowX: "auto" }}>{invLink}</Card.Text>
									</div>
									<br />

									<Button variant="outline-primary" onClick={copyCodeToClipboard} className="btn-block w-100">
										Sao chép
									</Button>
								</Card.Body>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
									}}
								>
									<Toast
										style={{
											position: "absolute",
											top: "50%",
											width: "120px",
											right: "30%",
										}}
										onClose={() => setShow(false)}
										show={show}
										delay={1000}
										autohide
									>
										<Toast.Body>Đã sao chép!</Toast.Body>
									</Toast>
								</div>
							</Card>

							<Card>
								<Card.Header >
									<Card.Title>Cấu hình</Card.Title>
								</Card.Header>
								<Card.Body>
									<Button variant="outline-primary" onClick={openModal} className="w-100">
										Thay đổi thông tin
									</Button>

									<EditClassRoomForm
										show={showEditClass}
										handleClose={handleClose}
										onEditedClassRoom={onEditedClassRoom}
										classroom={classroom}
									/>
								</Card.Body>
							</Card>
						</div>
					)}
				</Col>

				<Col sm={9}>
					<Card className="my-3 my-sm-0">
						<Card.Header>
							<Card.Title>Thông tin lớp học</Card.Title>
						</Card.Header>
						<Card.Body>
							<Card.Title>Tên lớp</Card.Title>
							<Card.Text>{classroom.name}</Card.Text>
							<Card.Title>Môn học</Card.Title>
							<Card.Text>{classroom.subject ? classroom.subject : "Trống"}</Card.Text>
							<Card.Title>Mô tả lớp học</Card.Title>
							<Card.Text>{classroom.description ? classroom.description : "Trống"}</Card.Text>
							<Card.Title>Phòng học</Card.Title>
							<Card.Text>{classroom.room ? classroom.room : "Trống"}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
};
export default TabDetail;
