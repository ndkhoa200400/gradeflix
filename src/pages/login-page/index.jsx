import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Card } from "react-bootstrap";
import "./Login.css";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { postApiMethod } from "../../api/api-handler";
import GoogleLogin from "react-google-login";
import * as AuthenService from "../../services/auth.service";
import Spining from "../../components/spinning/spinning.component";
import { loadPreUrl, savePreUrl } from "../../services/location.service";
const client_id = process.env.REACT_APP_CLIENT_GOOGLE;
///users/login
const LoginPage = () => {
	const preUrl = loadPreUrl() ? loadPreUrl() : "/";
	const [onSubmiting, setOnSubmiting] = useState(false);
	const responseGoogle = async (response) => {
		//console.log(response);
		setOnSubmiting(true);
		try {
			// gửi cho api
			const res = await postApiMethod("users/login-with-google", {
				token: response.tokenId,
			});

			// console.log(res);
			AuthenService.saveToken(res.token);
			delete res.token;
			res.loginType = "google";
			AuthenService.saveUserInfo(res);
			navigate(preUrl, { replace: true });
			savePreUrl("/");
		} catch (error) {
			//  console.log(error);
		}
		setOnSubmiting(false);
	};
	const responseGoogleFail = (response) => {
		// console.log(response);
	};
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	console.log(navigate);
	const onSubmit = async (data) => {
		setOnSubmiting(true);
		try {
			// gửi cho api
			const res = await postApiMethod("users/login", data);

			//console.log(res);
			AuthenService.saveToken(res.token);
			delete res.token;
			res.loginType = "email";
			AuthenService.saveUserInfo(res);

			navigate(preUrl, { replace: true });
			savePreUrl("/");
		} catch (error) {
			setError("email", {
				message: "Email hoặc mật khẩu không đúng",
			});
			setError("password", {
				message: "Email hoặc mật khẩu không đúng",
			});
			//console.log(error);
		}
		setOnSubmiting(false);
	};
	const auth = AuthenService.isLoggedIn();
	return auth ? (
		<Navigate to="/" />
	) : (
		<Container>
			<Card className="login">
				<Card.Header className="text-center bg-transparent p-3  px-lg-5 ">
					<div className="p-2 d-flex justify-content-center align-items-center">
						<img src="/logo.png" alt="" width={24} height={24} />
						<span className="mx-2">Gradeflix</span>
					</div>
					<h2>Chào mừng bạn quay lại</h2>
					<h4>Đăng nhập</h4>
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
					<Form
						noValidate
						onSubmit={handleSubmit(onSubmit)}
						className="px-3 py-2"
					>
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
								<Form.Control.Feedback type="invalid">
									{errors.email?.message}
								</Form.Control.Feedback>
							)}
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
								<Form.Control.Feedback type="invalid">
									{errors.password?.message}
								</Form.Control.Feedback>
							)}
						</Form.Group>

						<Button variant="primary" type="submit" className="w-100 mt-2 mb-3">
							Đăng nhập
						</Button>
						<div className="w-100 text-center mb-4 h-25">
							<GoogleLogin
								clientId={client_id}
								buttonText="Đăng nhập với Google"
								onSuccess={responseGoogle}
								onFailure={responseGoogleFail}
								cookiePolicy={"single_host_origin"}
							/>
						</div>

						<Link to="/signup" className="m-auto w-100 d-block text-center">
							Tạo tài khoản
						</Link>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
};
export default LoginPage;
