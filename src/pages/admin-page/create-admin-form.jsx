import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { postApiMethod } from "../../api/api-handler";
import ErrorAlert from "../../components/alert/error-alert.component";
import InfoAlert from "../../components/alert/info-alert.component";
import Spining from "../../components/spinning/spinning.component";

export const CreateAdminForm = ({ show, handleClose, adminAccounts, setAdminAccounts }) => {
	const [onSubmiting, setOnSubmiting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [errorMessage, setErrorMessage] = useState("");
	const [infoMessage, setInfoMessage] = useState("");

	const onSubmit = async (data) => {
		setOnSubmiting(true);
		try {
			// gửi cho api
			const newAdmin = await postApiMethod("admin/accounts", data);
			setAdminAccounts([...adminAccounts, newAdmin]);
			handleClose();
			setInfoMessage("Tạo tài khoản thành công");
		} catch (error) {
			setErrorMessage(error.message);
		}
		setOnSubmiting(false);
	};
	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Tạo tài khoản Admin</Modal.Title>
					{onSubmiting ? <Spining isFull={false} className="mx-2" /> : null}
				</Modal.Header>
				<Modal.Body>
					<Form className="px-3 py-2" noValidate onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="Email"
								{...register("email", {
									required: "Email không được bỏ trống",
									pattern: {
										value:
											/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message: "Email không đúng định dạng",
									},
								})}
								isInvalid={errors.email}
							/>
							{errors.email?.message && (
								<Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
							)}
						</Form.Group>
						<Form.Group className="mb-3" controlId="name">
							<Form.Label>Họ và tên</Form.Label>
							<Form.Control
								type="text"
								placeholder="Họ và tên"
								required
								{...register("fullname", {
									required: "Họ và tên không được bỏ trống",
								})}
								isInvalid={errors.fullname}
							/>

							{errors.fullname?.message && (
								<Form.Control.Feedback type="invalid">{errors.fullname?.message}</Form.Control.Feedback>
							)}
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBirthday">
							<Form.Label>Ngày sinh</Form.Label>
							<Form.Control type="date" {...register("birthday", {})} />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Mật khẩu</Form.Label>
							<Form.Control
								type="password"
								placeholder="Mật khẩu"
								{...register("password", {
									required: "Mật không được bỏ trống",
								})}
								isInvalid={errors.password}
							/>
							{errors.password?.message && (
								<Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
							)}
						</Form.Group>
						<Modal.Footer>
							<Button variant="outline-secondary" onClick={handleClose}>
								Đóng
							</Button>
							<Button variant="outline-primary" type="submit">
								Tạo tài khoản
							</Button>
						</Modal.Footer>
					</Form>
				</Modal.Body>
			</Modal>
			<ErrorAlert show={errorMessage} setHide={() => setErrorMessage("")} message={errorMessage} />
			<InfoAlert show={infoMessage} setHide={() => setInfoMessage("")} message={infoMessage} />
		</div>
	);
};

export default CreateAdminForm;
