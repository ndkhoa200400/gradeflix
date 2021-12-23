import { Button, Alert, Card, Col, Row } from "react-bootstrap";
import GradeForm from "../../components/grade-form/grade-form";
import UploadFileForm from "../../components/upload-file-form/upload-file-form";
import { useState, useEffect } from "react";
import GradeBoard from "../../components/grade-board/grade-board";
import { getApiMethod } from "../../api/api-handler";
import { createTemplateUploadStudentList, createTemplateUploadGradeAssignment } from "../../services/xlsx.service";
const TabGradeCompositions = ({ classroom, onGradeEdit }) => {
	const [showForm, setShowForm] = useState(false);
	const [showUploadFileForm, setShowUploadFileForm] = useState(false);
	const [students, setStudents] = useState([]);
	const [gradeForm, setGradeForm] = useState(false);
	const handleClose = () => {
		setShowForm(false);
		setShowUploadFileForm(false);
	};
	const openForm = () => {
		setShowForm(true);
	};
	const [endPoint, setEndPoint] = useState("");
	const [title, setTitle] = useState("");
	const total = classroom.gradeStructure ? classroom.gradeStructure.total : "";
	const gradeCompositions = classroom.gradeStructure ? classroom.gradeStructure.gradeCompositions : [];
	const [showAlert, setShowAlert] = useState(false);
	const [error, setError] = useState("");
	const [errorList, setErrorList] = useState([]);
	const midleOnGradeEdit = (gradeStructure) => {
		onGradeEdit(gradeStructure);
		getGradeBoards();
	};
	const openGradeForm = (title, endPoint) => {
		setEndPoint(endPoint);
		setTitle(title);
		setShowUploadFileForm(true);
		setGradeForm(true);
	};
	const refeshGradeBoard = (msg, errList) => {
		if (errList && errList.length !== 0) {
			setError(msg);
			setErrorList(errList);
			setShowAlert(true);
		}
		getGradeBoards();
	};
	const getGradeBoards = async () => {
		try {
			const res = await getApiMethod("classrooms/" + classroom.id + "/student-list");
			setStudents(res);
		} catch (error) {
			console.log("error", error);
		}
	};
	useEffect(() => {
		return getGradeBoards();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onUpdateGrade = (newGrade) => {
		const studentId = newGrade.studentId;
		const newList = [...students];
		for (var i = 0; i < newList.length; i++) {
			if (newList[i].studentId === studentId) {
				Object.assign(newList[i], newGrade);
				break;
			}
		}
		setStudents(newList);
	};
	const hideAlert = () => {
		setError("");
		setErrorList([]);
		setShowAlert(false);
	};
	return (
		<Row className="py-3">
			<Col sm={3}>
				{classroom && classroom.user.userRole !== "STUDENT" ? (
					<div>
						<Card style={{ marginBottom: "10px" }}>
							<Card.Header>
								<Card.Title>Thang điểm</Card.Title>
							</Card.Header>
							<Card.Body className="text-center d-grid grap-3">
								{classroom.gradeStructure ? (
									<div>
										<h5>Tổng điểm lớp: {total}</h5>
										{gradeCompositions.map((item, idx) => (
											<Card.Text
												key={idx}
												style={{
													display: "flex",
													lexDirection: "row",
													justifyContent: "space-between",
												}}
											>
												<div>{item.name}</div>
												<div>{item.percent}%</div>
											</Card.Text>
										))}{" "}
									</div>
								) : (
									<Alert className="my-5" variant={"info"}>
										<Alert.Heading>Chưa có thang điểm!</Alert.Heading>
										<p>Hãy thêm thang điểm</p>
									</Alert>
								)}

								<Button variant="outline-primary" style={{ marginTop: "20px" }} onClick={openForm}>
									Chỉnh sửa thang điểm
								</Button>
							</Card.Body>
						</Card>
						<Card>
							<Card.Header>
								<Card.Title>Cấu hình</Card.Title>
							</Card.Header>
							<Card.Body className="text-center d-grid grap-2">
								<Button
									variant="outline-primary"
									className="mb-3"
									onClick={() => {
										createTemplateUploadStudentList();
									}}
								>
									Tạo mẫu điền danh sách sinh viên
								</Button>
								<Button
									variant="outline-primary"
									className="mb-3"
									onClick={() => {
										createTemplateUploadGradeAssignment(students);
									}}
								>
									Tạo mẫu chấm điểm{" "}
								</Button>
								<Button
									variant="outline-primary"
									className="mb-3"
									onClick={() => {
										setEndPoint("student-list");
										setTitle("Tải lên danh sách sinh viên");
										setShowUploadFileForm(true);
										setGradeForm(false);
									}}
								>
									Nhập danh sách sinh viên từ xlsx
								</Button>
							</Card.Body>
						</Card>
					</div>
				) : null}
			</Col>
			<Col className="grade-compositions-list-tab " sm={9}>
				<Card style={{ position: "relative" }}>
					<Card.Header>
						<Card.Title>Bảng điểm</Card.Title>
					</Card.Header>
					<Card.Body className="text-center d-grid grap-2 " style={{ position: "relative" }}>
						<GradeBoard
							errorList={errorList}
							openGradeForm={openGradeForm}
							classroomId={classroom.id}
							gradeStructure={classroom.gradeStructure}
							students={students}
							onUpdateGrade={onUpdateGrade}
						></GradeBoard>
					</Card.Body>
					<Alert
						variant="danger"
						style={{ position: "absolute", top: "2%", left: "15%", width: "80%", border: "5px" }}
						show={showAlert}
						onClose={hideAlert}
						dismissible
					>
						<Alert.Heading>Có lỗi xảy ra!</Alert.Heading>
						<p>{error}</p>
					</Alert>
				</Card>
			</Col>
			<GradeForm show={showForm} handleClose={handleClose} onGradeEdit={midleOnGradeEdit} classroom={classroom} />
			<UploadFileForm
				show={showUploadFileForm}
				handleClose={handleClose}
				endPoint={endPoint}
				classroom={classroom}
				refeshGradeBoard={refeshGradeBoard}
				title={title}
				gradeForm={gradeForm}
			/>
		</Row>
	);
};
export default TabGradeCompositions;
