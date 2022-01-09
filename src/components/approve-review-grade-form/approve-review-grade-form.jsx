import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spinning from "../spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import ErrorAlert from "../alert/error-alert.component";

const ApproveReviewGradeForm = ({ show, id, studentid, reviewid, name, handleClose, gradeReview }) => {
	const { register, handleSubmit, reset } = useForm();
	const [onSubmiting, setOnSubmiting] = useState(false);

	const closeModal = () => {
		handleClose();
		reset();
	};
	const [errorMessage, setErrorMessage] = useState("");

	const onSubmit = async (data) => {
		setOnSubmiting(true);
		try {
			// Lấy ảnh ngẫu nhiên làm banner
			data.name = name;
			data.studentId = studentid;
			//console.log(data)
			// gửi cho api
			await postApiMethod("classrooms/" + id + "/grade-reviews/" + +reviewid, data);

			handleClose();
			gradeReview();
			reset();
		} catch (error) {
			console.log(error);
			setErrorMessage(error.message);
		}
		setOnSubmiting(false);
	};
	return (
		<div>
			<Modal show={show} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Cập nhật điểm</Modal.Title>
					{onSubmiting ? <Spinning isFull={false} className="mx-2" /> : null}
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-4">
							<Form.Label>Điểm chính thức</Form.Label>
							<Form.Control
								type="text"
								{...register("grade", {
									required: true,
								})}
							/>
							<Form.Control.Feedback type="invalid">Không được bỏ trống</Form.Control.Feedback>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleClose}>
						Hủy
					</Button>
					<Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
						Cập nhật
					</Button>
				</Modal.Footer>
			</Modal>
			<ErrorAlert show={errorMessage} setHide={() => setErrorMessage("")} message={errorMessage} />
		</div>
	);
};

export default ApproveReviewGradeForm;
