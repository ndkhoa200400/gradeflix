import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
//'/users/register
import { postApiMethod } from "../../api/api-handler";
import * as AuthenService from "../../services/auth.service";
const SignupPage = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const name = event.target.elements.name.value;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      return;
    }
    setValidated(true);
    try {
      const data = { fullname: name, email, password };
      // gửi cho api
      const res = await postApiMethod("users/register", data);

      console.log(res);
      AuthenService.saveToken(res.token);
      delete res.token;
      AuthenService.saveUserInfo(res);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Container>
      <Card className="login">
        <Card.Header className="text-center bg-transparent p-3 px-lg-5 ">
          <div className="p-2 d-flex justify-content-center align-items-center">
            <img src="/logo.png" alt="" width={24} height={24} />
            <span className="mx-2">Gradeflix</span>
          </div>
          <h2>Chào mừng bạn tới Gradeflix</h2>
          <h4>Tạo tài khoản</h4>
        </Card.Header>
        <Card.Body>
          <Form
            className="px-3 py-2"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                name="email"
              />
              <Form.Control.Feedback type="invalid">
                Email không đúng định dạng
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Họ và tên"
                required
                name="name"
              />

              <Form.Control.Feedback type="invalid">
                Không được bỏ trống
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control
                type="date"
               
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                required
                name="password"
              />
              <Form.Control.Feedback type="invalid">
                Không được bỏ trống
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-2 mb-4">
              Đăng ký
            </Button>

            <Link to="/login" className="m-auto w-100 d-block text-center">
              Đăng nhập
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default SignupPage;
