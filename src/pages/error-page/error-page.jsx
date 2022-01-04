import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const ErrorPage = ({ errorMessage }) => {
  const navigate = useNavigate();
  return (
    <Container className="h-100vh d-flex justify-content-center align-items-center">
      <Card className="error-card p-4 ">
        <Card.Body>
          <h3>{errorMessage}</h3>
          <p>Vui lòng thử lại sau</p>
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/", { replace: true })}
          >
            Quay lại trang chủ
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ErrorPage;
