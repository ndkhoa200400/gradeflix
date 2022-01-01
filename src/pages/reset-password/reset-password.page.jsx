import React, { useEffect } from 'react'
import Spining from "../../components/spinning/spinning.component";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Card } from "react-bootstrap";
import * as AuthenService from "../../services/auth.service";
import { postApiMethod } from "../../api/api-handler";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useState } from 'react';
import { useQuery } from '../../custome-hook';


const ResetPasswordPage = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();
	const [onSubmiting, setOnSubmiting] = useState(false);
	const query = useQuery()


	const onSubmit = async (data) => {
		setOnSubmiting(true);
		setOnSubmiting(false);
	};

	useEffect(() => {
		if (query)
		{
			const code = query.get('code')
			console.log(code)
		}
	}, [query])

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

					<h4>Đặt lại mật khẩu</h4>
					<p className="text-start text-muted">Nhập email của bạn, sau đó đường dẫn để đặt lại mật khẩu  {<br></br>} sẽ được gửi đến email của bạn.</p>
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
		</Container>
	);
}

export default ResetPasswordPage
