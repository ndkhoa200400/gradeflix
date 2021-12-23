import React, { useState } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import Spining from "../../components/spinning/spinning.component";
import EditStudentIdModal from "./edit-student-id-modal";
import StudentGrade from "../../components/student-grade/student-grade";
import ListGradeCompositions from "../../components/list-grade-composition/list-grade-composition.component";
const TabMyInfo = ({ classroom, onEditStudentId, studentList }) => {
	const [showEditStudentId, setEditStudentId] = useState(false);
	const handleClose = () => {
		setEditStudentId(false);
	};
	const openModal = () => {
		setEditStudentId(true);
	};
	return (
		<div>
			{!classroom ? (
				<Spining />
			) : (
				<Row className="pb-3">
					<Col lg={3}>
						<Card  className="mb-3">
							<Card.Header>
								<Card.Title>Thông tin cá nhân</Card.Title>
							</Card.Header>
							<Card.Body>
								<Card.Text
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
									}}
								>
									<div>Mã số sinh viên</div>
									<div>{classroom.user.studentId}</div>
								</Card.Text>
								<Card.Text
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
									}}
								>
									<div>Họ và tên</div>
									<div>{classroom.user.fullname}</div>
								</Card.Text>
								<Card.Text
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
									}}
								>
									<div>Bài tập hoàn thành</div>
									<div>0</div>
								</Card.Text>
								<Card.Text
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
									}}
								>
									<div>Bài tập được giao</div>
									<div>0</div>
								</Card.Text>
								<Card.Text
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
									}}
								>
									<div>Điểm tích lũy</div>
									<div>0.0</div>
								</Card.Text>
								<br />
								<div
									style={{
										display: "flex",
										lexDirection: "row",
										justifyContent: "center",
									}}
								>
									<Button variant="outline-primary" onClick={openModal}>
										Chỉnh sửa mã số sinh viên
									</Button>
									<EditStudentIdModal
										show={showEditStudentId}
										handleClose={handleClose}
										onEditStudentId={onEditStudentId}
										classroom={classroom}
									/>
								</div>
							</Card.Body>
						</Card>
						<ListGradeCompositions classroom={classroom} />
					</Col>
					<Col lg={9}>
						<Card>
							<Card.Header>
								<Card.Title>Bảng điểm</Card.Title>
							</Card.Header>
							<Card.Body>
								<Card.Text>
									<StudentGrade classroom={classroom} studentList={studentList} />
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</div>
	);
};
export default TabMyInfo;
