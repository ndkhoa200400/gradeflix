import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spinning from "../spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import ErrorAlert from "../alert/error-alert.component";
const CreateClassRoomForm = ({ show, handleClose, onClassCreated }) => {
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
			// Lấy ảnh ngẫu nhiên làm banner
			const res = await fetch(
				`https://api.unsplash.com/photos/random?client_id=uYeNoWUqI3LCIlxbJtpvKy0Mdw0NrYsvRq5ta9-dDLs`
			);
			const response = await res.json();
			data.banner = response.urls.regular;

			// gửi cho api
			const newClassroom = await postApiMethod("classrooms", data);
			onClassCreated(newClassroom);
			handleClose();

			reset();
		} catch (error) {
			//console.log("error", error);
			setErrorMessage("Đã xảy ra lỗi! Vui lòng thử lại");
		}
		setOnSubmiting(false);
	};
	return (
		<div>
			<Modal show={show} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Tạo lớp học</Modal.Title>
					{onSubmiting ? <Spinning isFull={false} className="mx-2" /> : null}
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-3">
							<Form.Label>Tên lớp học (*)</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nhập tên lớp học (bắt buộc)"
								{...register("name", { required: true })}
								isInvalid={errors.name}
							/>
							{errors.name && <Form.Control.Feedback type="invalid">Bắt buộc</Form.Control.Feedback>}
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Môn học</Form.Label>
							<Form.Control type="text" placeholder="Nhập môn học" {...register("subject")} />
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Mô tả lớp học</Form.Label>
							<Form.Control type="text" placeholder="Nhập mô tả lớp học" {...register("description")} />
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Phòng học</Form.Label>
							<Form.Control type="text" placeholder="Nhập phòng học" {...register("room")} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleClose}>
						Đóng
					</Button>
					<Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
						Tạo lớp
					</Button>
				</Modal.Footer>
			</Modal>
			<ErrorAlert show={errorMessage} setHide={() => setErrorMessage("")} message={errorMessage} />
		</div>
	);
};

export default CreateClassRoomForm;
