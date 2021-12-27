import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form";
import Spining from "../../components/spinning/spinning.component";

const ResetPasswordForm = ({ show, handleClose }) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();
	const [onSubmiting, setOnSubmiting] = useState(false);

	const onSubmit = async (data) => {
		setOnSubmiting(true);
		// setOnSubmiting(false);
	};


	const onHide = () => {
		setOnSubmiting(false)
		handleClose()
	}
	return (
		<Modal show={show} onHide={onHide} >

			<Modal.Header closeButton>
				<Modal.Title>Đặt lại mật khẩu</Modal.Title>
				{onSubmiting ? <Spining isFull={false} className="mx-2" /> : null}

			</Modal.Header>
			<Modal.Body>
				<p className="text-start text-muted">Nhập email của bạn, sau đó đường dẫn để đặt lại mật khẩu sẽ được gửi đến email của bạn.</p>
				<Form
					noValidate
					onSubmit={handleSubmit(onSubmit)}
					className="px-3 py-2"
				>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Nhập email để đặt lại password"
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
							<Form.Control.Feedback type="invalid">
								{errors.email?.message}
							</Form.Control.Feedback>
						)}
					</Form.Group>

					<Modal.Footer>
						<Button variant="outline-secondary" onClick={onHide}>
							Đóng
						</Button>
						<Button variant="outline-primary" type="submit">
							Gửi yêu cầu
						</Button>
					</Modal.Footer>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default ResetPasswordForm
