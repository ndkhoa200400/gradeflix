import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spinning from "../../components/spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import ErrorAlert from "../../components/alert/error-alert.component";
const EditClassRoomForm = ({ show, handleClose, onEditedClassRoom, classroom }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const [onSubmiting, setOnSubmiting] = useState(false);
	const [newImage, setNewImage] = useState(null);
	const [image, setImage] = useState(classroom?.banner ?? "");
	const [errorMessage, setErrorMessage] = useState("");

	const uploadImage = async (e) => {
		const files = e.target.files;
		const imageUpload = "imageupload";
		const data = new FormData();
		data.append("file", files[0]);
		setImage(URL.createObjectURL(files[0]));
		data.append("upload_preset", imageUpload);
		setNewImage(data);
	};

	const closeModal = () => {
		handleClose();
		reset();
	};

	const onSubmit = async (data) => {
		setOnSubmiting(true);
		try {
			// gửi cho api
			if (newImage) {
				await fetch(`${process.env.REACT_APP_CLOUDINARY_API_LINK}/image/upload`, {
					method: "POST",
					body: newImage,
				})
					.then((res) => res.json())
					.then((d) => {
						//console.log("data", data);

						data.banner = d["secure_url"];

						setNewImage(false);
					})
					.catch((error) => {
						// console.log("error", error);
					});
			}
			const res = await postApiMethod(`classrooms/${classroom ? classroom.id : ""}`, data);
			onEditedClassRoom(res);
			handleClose();

			reset();
		} catch (error) {
			//console.log( error);
			setErrorMessage(error.message);
		}
		setOnSubmiting(false);
	};
	return (
		<div>
			<Modal show={show} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Chỉnh sửa thông tin lớp học</Modal.Title>
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
								defaultValue={classroom ? classroom.name : ""}
							/>
							{errors.name && <Form.Control.Feedback type="invalid">Bắt buộc</Form.Control.Feedback>}
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Mã lớp</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nhập mã lớp"
								{...register("code")}
								defaultValue={classroom ? classroom.code : ""}
							/>
							{errors.code && <Form.Control.Feedback type="invalid">Bắt buộc</Form.Control.Feedback>}
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Môn học</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nhập môn học"
								{...register("subject")}
								defaultValue={classroom ? classroom.subject : ""}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Mô tả lớp học</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nhập mô tả lớp học"
								{...register("description")}
								defaultValue={classroom ? classroom.description : ""}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Phòng học</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nhập phòng học"
								{...register("room")}
								defaultValue={classroom ? classroom.room : ""}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Ảnh bìa</Form.Label>
							<a href={image} alt="classroom banner cursor-pointer" target="_blank" rel="noreferrer">
								<Form.Control
									type="text"
									placeholder="Nhập phòng học"
									{...register("banner")}
									defaultValue={image ?? ""}
								/>
							</a>

							<div className="py-2">
								<input type="file" id="upload" hidden onChange={uploadImage} />
								<label htmlFor="upload" className="cursor-pointer btn btn-outline-primary">
									Tải ảnh lên
								</label>
							</div>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleClose}>
						Đóng
					</Button>
					<Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
						Chỉnh sửa
					</Button>
				</Modal.Footer>
			</Modal>
			<ErrorAlert show={errorMessage} setHide={() => setErrorMessage("")} message={errorMessage} />
		</div>
	);
};

export default EditClassRoomForm;
