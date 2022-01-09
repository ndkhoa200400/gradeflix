import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spinning from "../spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import ErrorAlert from "../alert/error-alert.component";

const ChangeIDForm = ({ show, handleClose, idClass, user, onEditStudentId }) => {
	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm();
	const [onSubmiting, setOnSubmiting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const closeModal = () => {
		handleClose();
		reset();
	};

	const onSubmit = async (data) => {
		if (user && data.studentId === user.studentId) {
			setError("studentId", {
				message: "Hãy nhập mã số sinh viên mới",
			});
			return;
		}
		setOnSubmiting(true);
		try {
			// Lấy ảnh ngẫu nhiên làm banner

			// console.log(data)
			//console.log("classrooms/" + idClass + "/users/" + userId);
			// gửi cho api
			await postApiMethod("classrooms/" + idClass + "/users/" + user.id, data);

			handleClose();
			user.studentId = data.studentId;

			onEditStudentId(user);
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
					<Modal.Title>Chỉnh sửa mã số sinh viên</Modal.Title>
					{onSubmiting ? <Spinning isFull={false} className="mx-2" /> : null}
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-4">
							<Form.Label> Mã số sinh viên</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nhập mã số sinh viên"
								{...register("studentId")}
								isInvalid={errors.studentId}
								defaultValue={user ? user.studentId : ""}
							/>
							{errors.studentId?.message && (
								<Form.Control.Feedback type="invalid">{errors.studentId?.message}</Form.Control.Feedback>
							)}
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleClose}>
						Đóng
					</Button>
					<Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
						Xác nhận
					</Button>
				</Modal.Footer>
			</Modal>
			<ErrorAlert show={errorMessage} setHide={() => setErrorMessage("")} message={errorMessage} />
		</div>
	);
};

export default ChangeIDForm;
