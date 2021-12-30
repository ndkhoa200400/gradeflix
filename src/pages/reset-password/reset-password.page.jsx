import React from "react";
import Spining from "../../components/spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Card } from "react-bootstrap";
import * as AuthenService from "../../services/auth.service";
import { postApiMethod } from "../../api/api-handler";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "../../custome-hook";
import ErrorAlert from "../../components/alert/error-alert.component";
import InfoAlert from "../../components/alert/info-alert.component";

const ResetPasswordPage = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [showInfo, setShowInfo] = useState(false);
	const [infoMessage, setInfoMessage] = useState("");
	const [onSubmiting, setOnSubmiting] = useState(false);
	const query = useQuery();
	const navigate = useNavigate();
	const onSubmit = async (data) => {
		setOnSubmiting(true);

		if (data.password !== data.confirmedPassword) {
			setError(
				"password",
				{},
				{
					shouldFocus: true,
				}
			);
			setError("confirmedPassword", {
				message: "Mật khẩu không khớp.",
			});

			return setOnSubmiting(false);
		}
		const token = query.get("token");
		const email = query.get("email");
		try {
			const user = await postApiMethod(`users/reset-password?token=${token}`, {
				newPassword: data.password,
				email,
			});
			setInfoMessage("Đổi mật khẩu thành công");
			setShowInfo(true);
			AuthenService.saveToken(user.token);
			delete user.token;
			AuthenService.saveUserInfo(user);
		} catch (error) {
			setShowError(true);
			setErrorMessage(error.message);
		}

		setOnSubmiting(false);
	};

	const onNavigate = () => {
		setShowInfo(false);
		navigate("/");
	};
	return (
		<Container>
			<Card className="login">
				<Card.Header className="text-center bg-transparent p-3  px-lg-5 ">
					<div className="p-2 d-flex justify-content-center align-items-center">
						<img src="/logo.png" alt="" width={24} height={24} />
						<span className="mx-2">Gradeflix</span>
					</div>

					<h4>Đặt lại mật khẩu</h4>
					<p className="text-start text-muted">
						Nhập email của bạn, sau đó đường dẫn để đặt lại mật khẩu {<br></br>} sẽ được gửi đến email của bạn.
					</p>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						{onSubmiting ? <Spining isFull={false} className="mx-2" /> : null}
					</div>
				</Card.Header>
				<Card.Body>
					<Form noValidate onSubmit={handleSubmit(onSubmit)} className="px-3 py-2">
						<Form.Group className="mb-3">
							<Form.Label>Mật khẩu mới</Form.Label>
							<Form.Control
								type="password"
								placeholder="Mật khẩu mới"
								{...register("password", {
									required: "Mật khẩu không được bỏ trống",
								})}
								isInvalid={errors.password}
							/>
							{errors.password?.message && (
								<Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>
							)}
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Xác nhận mật khẩu</Form.Label>
							<Form.Control
								type="password"
								placeholder="Xác nhận mật khẩu"
								{...register("confirmedPassword", {
									required: "Xác nhậc mật khẩu không được bỏ trống",
								})}
								isInvalid={errors.confirmedPassword}
							/>
							{errors.confirmedPassword?.message && (
								<Form.Control.Feedback type="invalid">{errors.confirmedPassword?.message}</Form.Control.Feedback>
							)}
						</Form.Group>
						<Button variant="primary" type="submit" className="w-100 my-2">
							Gửi yêu cầu
						</Button>
						<Link to="/login" className="my-3 w-100 d-block text-center">
							Đăng nhập
						</Link>
						<Link to="/signup" className="mb-1 w-100 d-block text-center">
							Tạo tài khoản
						</Link>
					</Form>
				</Card.Body>
			</Card>
			<ErrorAlert show={showError} setHide={() => setShowError(false)} message={errorMessage} />
			<InfoAlert show={showInfo} setHide={onNavigate} message={infoMessage} />
		</Container>
	);
};

export default ResetPasswordPage;
