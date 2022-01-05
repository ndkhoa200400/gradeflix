import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const ErrorPage = ({ errorMessage, navigateLink = "/" }) => {
	const navigate = useNavigate();

	return (
		<Container className="h-100vh w-100 d-flex justify-content-center align-items-center">
			<Card className="error-card p-4 border border-danger">
				<Card.Body>
					<h3 className="text-danger">{errorMessage}</h3>
					<p>Vui lòng thử lại sau</p>
					<Button variant="outline-danger" onClick={() => navigate(navigateLink, { replace: true })}>
						Quay lại trang chủ
					</Button>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default ErrorPage;
