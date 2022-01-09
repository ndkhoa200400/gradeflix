import React, { useState } from "react";
import { postApiMethod } from "../../api/api-handler";
import Spinning from "../spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import ErrorAlert from "../alert/error-alert.component";

const CreateInviteForm = ({ show, handleClose, idClass, role }) => {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
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
			data.userEmails = getValues("userEmails").split(/[,  ;]/);
			//console.log(data)
			// gửi cho api
			await postApiMethod("classrooms/" + idClass + "/send-invitation?role=" + role, data);

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
					<Modal.Title>{role === "TEACHER" ? "Mời giáo viên" : "Mời học sinh"}</Modal.Title>
					{onSubmiting ? <Spinning isFull={false} className="mx-2" /> : null}
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-4">
							<Form.Label> Email</Form.Label>
							<Form.Control
								as="textarea"
								rows="3"
								{...register("userEmails", {
									required: true,
								})}
								isInvalid={errors.userEmails}
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
						Mời
					</Button>
				</Modal.Footer>
			</Modal>
			<ErrorAlert show={errorMessage} setHide={() => setErrorMessage("")} message={errorMessage} />
		</div>
	);
};

export default CreateInviteForm;
