import { Button, Alert, Card, Col, Row } from "react-bootstrap";
import GradeForm from "../../components/grade-form/grade-form";
import UploadFileForm from "../../components/upload-file-form/upload-file-form";
import { useState, useEffect } from "react";
import GradeBoard from "../../components/grade-board/grade-board";
import { getApiMethod } from "../../api/api-handler";
import { createTemplateUploadStudentList, createTemplateUploadGradeAssignment, exportGradeBoard } from "../../services/xlsx.service";
import GradeCompositionFinalization from "../../components/grade-composition-finalization/grade-composition-finalization";
const TabGradeCompositions = ({ classroom, onGradeEdit }) => {
	const [showForm, setShowForm] = useState(false);
	const [showFinalizeForm, setShowFinalizeForm] = useState(false);
	const [showUploadFileForm, setShowUploadFileForm] = useState(false);
	const [students, setStudents] = useState([]);
	const [gradeForm, setGradeForm] = useState(false);
	const handleClose = () => {
		setShowForm(false);
		setShowUploadFileForm(false);
		setShowFinalizeForm(false);
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
			console.log(res)
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
		<Row className="pb-3">
			<Col md={4} lg={3}>
				{classroom && classroom.user.userRole !== "STUDENT" ? (
					<div>
						<Card style={{ marginBottom: "10px" }}>
							<Card.Header>
								<Card.Title>Thang ??i???m</Card.Title>
							</Card.Header>
							<Card.Body className="text-center d-grid grap-3">
								{classroom.gradeStructure ? (
									<div>
										<h5>T???ng ??i???m l???p: {total}</h5>
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
										))}
									</div>
								) : (
									<Alert className="my-2" variant={"info"}>
										<Alert.Heading>Ch??a c?? thang ??i???m!</Alert.Heading>
										<p>H??y th??m thang ??i???m</p>
									</Alert>
								)}

								<Button variant="outline-primary" style={{ marginTop: "20px" }} onClick={openForm}>
									Ch???nh s???a thang ??i???m
								</Button>

								<Button
									variant="outline-primary"
									style={{ marginTop: "20px" }}
									onClick={() => setShowFinalizeForm(true)}
								>
									C??ng b??? c???t ??i???m
								</Button>
							</Card.Body>
						</Card>
						<Card>
							<Card.Header>
								<Card.Title>C???u h??nh</Card.Title>
							</Card.Header>
							<Card.Body className="text-center d-grid grap-2">
								<Button
									variant="outline-primary"
									className="mb-3"
									onClick={() => {
										createTemplateUploadStudentList();
									}}
								>
									T???o m???u ??i???n danh s??ch sinh vi??n
								</Button>
								<Button
									variant="outline-primary"
									className="mb-3"
									onClick={() => {
										createTemplateUploadGradeAssignment(students);
									}}
								>
									T???o m???u ch???m ??i???m{" "}
								</Button>
								<Button
									variant="outline-primary"
									className="mb-3"
									onClick={() => {
										setEndPoint("student-list");
										setTitle("T???i l??n danh s??ch sinh vi??n");
										setShowUploadFileForm(true);
										setGradeForm(false);
									}}
								>
									Nh???p danh s??ch sinh vi??n t??? xlsx
								</Button>
								<Button
									disabled = {students.length === 0}
									variant="outline-primary"
									className="mb-3"
									onClick={() => {
									//	setEndPoint("student-list");
									//	setTitle("T???i l??n danh s??ch sinh vi??n");
									//	setShowUploadFileForm(true);
									//	setGradeForm(false);
										exportGradeBoard(students, "", classroom.gradeStructure);
									}}
								>
									Xu???t b???ng ??i???m
								</Button>
							</Card.Body>
						</Card>
					</div>
				) : null}
			</Col>
			<Col className="grade-compositions-list-tab mt-2 mt-md-0" md={8} lg={9}>
				<Card style={{ position: "relative" }}>
					<Card.Header>
						<Card.Title>B???ng ??i???m</Card.Title>
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
						<Alert.Heading>C?? l???i x???y ra!</Alert.Heading>
						<p>{error}</p>
					</Alert>
				</Card>
			</Col>
			<GradeForm show={showForm} handleClose={handleClose} onGradeEdit={midleOnGradeEdit} classroom={classroom} />
			<GradeCompositionFinalization
				show={showFinalizeForm}
				handleClose={handleClose}
				onGradeEdit={midleOnGradeEdit}
				classroom={classroom}
			/>
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
