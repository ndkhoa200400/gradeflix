import React, { useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { postApiMethod } from "../../api/api-handler";
import ErrorAlert from "../alert/error-alert.component";
import InfoAlert from "../alert/info-alert.component";

const StudentGradeCompoistionItem = ({ classroom, gradeComposition, grade }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [showInfo, setShowInfo] = useState(false);
	const [infoMessage, setInfoMessage] = useState("");
	const [showReviewRequest, setShowReviewRequest] = useState(false);

	const onSubmit = async (data) => {
		console.log("data", data);
		try {
			await postApiMethod(`classrooms/${classroom.id}/grade-reviews`, {
				explanation: data.explanation,
				expectedGrade: {
					name: gradeComposition.name,
					grade: data.expectedGrade,
				},
			});
			setInfoMessage("Yêu cầu đã được gửi");
			setShowInfo(true);
			setShowReviewRequest(false);
		} catch (error) {
			setErrorMessage(error.message);
			setShowError(true);
		}
	};

	const renderRequestForm = () => (
		<Modal show={showReviewRequest} onHide={() => setShowReviewRequest(false)}>
			<Modal.Header>
				<h4>
					Phúc khảo điểm <span className="fw-bold">{gradeComposition.name}</span>{" "}
				</h4>
			</Modal.Header>
			<Form noValidate onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<div>
						<Form.Label>Điểm hiện tại: {grade}</Form.Label>
					</div>
					<Form.Group className="mb-3">
						<Form.Label>Điểm mong muốn</Form.Label>
						<Form.Control
							type="number"
							placeholder="Nhập điểm mong muốn"
							{...register("expectedGrade", {
								required: "Không được bỏ trống",
							})}
							isInvalid={errors.expectedGrade}
						/>
						{errors.expectedGrade?.message && (
							<Form.Control.Feedback type="invalid">{errors.expectedGrade.message}</Form.Control.Feedback>
						)}
					</Form.Group>
					<Form.Group className="">
						<Form.Label>Lí do</Form.Label>
						<Form.Control
							as="textarea"
							style={{ height: "100px" }}
							placeholder="Nhập lý do"
							{...register("explanation")}
							isInvalid={errors.explanation}
						/>
						{errors.explanation?.message && (
							<Form.Control.Feedback type="invalid">{errors.explanation.message}</Form.Control.Feedback>
						)}
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={() => setShowReviewRequest(false)}>
						Đóng
					</Button>
					<Button variant="outline-primary" type="submit">
						Gửi yêu cầu
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);

	return (
		<Row className="p-2">
			<Col className="border border-2 border-end-0 p-3" sm={8}>
				{gradeComposition.name}
			</Col>
			<Col className="border border-2 p-3">
				<div className="d-flex justify-content-between">
					{grade}
					{Number(grade) ? (
						<Dropdown className="">
							<Dropdown.Toggle
								variant="light"
								className="btn btn-light"
								data-bs-toggle="dropdown"
								id="addClassroomBtn"
							></Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item type="button" onClick={() => setShowReviewRequest(true)}>
									Phúc khảo điểm
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					) : null}
				</div>
			</Col>
			{renderRequestForm()}
			<ErrorAlert show={showError} setHide={() => setShowError(false)} message={errorMessage} />
			<InfoAlert show={showInfo} setHide={() => setShowInfo(false)} message={infoMessage} />
		</Row>
	);
};

export default StudentGradeCompoistionItem;
