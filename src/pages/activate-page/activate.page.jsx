import React, { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postApiMethod } from "../../api/api-handler";
import * as AuthenService from "../../services/auth.service";

import ErrorAlert from "../../components/alert/error-alert.component";
import InfoAlert from "../../components/alert/info-alert.component";
import TopNavigation from "../../components/top-nav/top-nav.component";
import { useQuery } from "../../custome-hook";

const Activation = () => {
	const query = useQuery();
	const navigate = useNavigate();
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [error, setError] = useState(null);
	const [showInfo, setShowInfo] = useState(false);
	const [infoMessage, setInfoMessage] = useState("");

	const activate = async () => {
		try {
			const token = query.get("token");
			const email = query.get("email");
			const user = await postApiMethod(`/users/activate?token=${token}&email=${email}`);
			AuthenService.saveUserInfo(user);
			setShowInfo(true);
			setInfoMessage("Tài khoản đã kích hoạt thành công");
		} catch (error) {
			setErrorMessage(error.message);
			setError(error);

			setShowError(true);
		}
	};

	// Kiểm tra lỗi, nếu status code trả về 403 nghĩa là đã kích hoạt
	// Đưa về trang chủ
	const onCheckError = () => {
		if (error.statusCode === 403) {
			return navigate("/");
		}
		setShowError(false);
	};
	const onNavigate = () => {
		setShowInfo(false);
		navigate("/");
	};
	return (
		<div>
			<TopNavigation title={"Tham gia lớp học của bạn"} />
			<Container className=" text-center">
				<Card className="invitation">
					<Card.Header variant="top" className="p-4">
						<div className="p-2 d-flex justify-content-center align-items-center">
							<img src="/logo.png" alt="" width={24} height={24} />
							<span className="mx-2">Gradeflix</span>
						</div>

						<div className="text-muted">Lớp học trực tuyến, kết nối mọi người với nhau.</div>
					</Card.Header>
					<Card.Body className="p-4">
						<Card.Title>Kích hoạt tài khoản</Card.Title>
						<p>Mời bạn ấn vào nút sao để kích hoạt tài khoản</p>
						<Button variant="primary" className="cursor-pointer" onClick={activate}>
							Kích hoạt
						</Button>
					</Card.Body>
				</Card>
			</Container>
			<ErrorAlert show={showError} setHide={onCheckError} message={errorMessage} />
			<InfoAlert show={showInfo} setHide={onNavigate} message={infoMessage} />
		</div>
	);
};

export default Activation;
