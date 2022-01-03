import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getApiMethod } from "../../api/api-handler";

import ErrorAlert from "../../components/alert/error-alert.component";
import InfoAlert from "../../components/alert/info-alert.component";
import TopNavigation from "../../components/top-nav/top-nav.component";

const ActivationRequest = () => {
	const navigate = useNavigate();
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [error, setError] = useState(null);
	const [showInfo, setShowInfo] = useState(false);
	const [infoMessage, setInfoMessage] = useState("");

	const requestActivation = async () => {
		try {
			await getApiMethod(`/users/activation-request`);

			setShowInfo(true);
			setInfoMessage("Đã gửi tới địa chỉ email của bạn. Vui lòng kiểm tra email.");
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
						<Card.Title>Xác minh email của bạn</Card.Title>
						<p>Chúng tôi sẽ gửi cho bạn đường dẫn qua email để xác minh tài khoản của bạn</p>
						<Form>
							<Button variant="primary" className="cursor-pointer" onClick={requestActivation}>
								Xác minh địa chỉ email
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</Container>
			<ErrorAlert show={showError} setHide={onCheckError} message={errorMessage} />
			<InfoAlert show={showInfo} setHide={onNavigate} message={infoMessage} />
		</div>
	);
};

export default ActivationRequest;
