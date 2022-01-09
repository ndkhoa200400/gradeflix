import React, { useState } from "react";
import { getApiMethod } from "../../api/api-handler";
import Spinning from "../spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import ErrorAlert from "../alert/error-alert.component";
const JoinClassRoomForm = ({ show, handleClose, onClassJoined }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [onSubmiting, setOnSubmiting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const closeModal = () => {
		handleClose();
		reset();
	};

	const onSubmit = async (data) => {
		setOnSubmiting(true);
		try {
			const newClassroom = await getApiMethod(`join-by-code/${data.code}`);
			onClassJoined(newClassroom);
			handleClose();

			reset();
		} catch (error) {
			console.log("error", error);
			setErrorMessage(error.message);
		}
		setOnSubmiting(false);
	};
	return (
		<div>
			<Modal show={show} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Tham gia lớp học bằng mã lớp</Modal.Title>
					{onSubmiting ? <Spinning isFull={false} className="mx-2" /> : null}
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-3">
							<Form.Label>Mã lớp học</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nhập mã lớp học (bắt buộc)"
								{...register("code", { required: true })}
								isInvalid={errors.code}
							/>
							{errors.code && <Form.Control.Feedback type="invalid">Bắt buộc</Form.Control.Feedback>}
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleClose}>
						Đóng
					</Button>
					<Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
						Tham gia
					</Button>
				</Modal.Footer>
			</Modal>
			<ErrorAlert show={errorMessage} setHide={() => setErrorMessage("")} message={errorMessage} />
		</div>
	);
};

export default JoinClassRoomForm;
