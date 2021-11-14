import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { postApiMethod } from "../../api/api-handler";
import FacebookLogin from "react-facebook-login";
import * as AuthenService from "../../services/auth.service";
///users/login
const LoginPage = () => {
  const responseFacebook = (response) => {
    console.log(response);
    // setData(response);
    //setPicture(response.picture.data.url);
    if (response.accessToken) {
      //  setLogin(true);
    } else {
      //  setLogin(false);
    }
  };
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    console.log(email + " " + password);
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      return;
    }
    setValidated(true);
    try {
      // gửi cho api
      const data = { email, password };
      const res = await postApiMethod("users/login", data);

      console.log(res);
      AuthenService.saveToken(res.token);
      delete res.token;
      AuthenService.saveUserInfo(res);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
    event.preventDefault();
  };
  return (
    <Container>
      <Card className="login">
        <Card.Header className="text-center bg-transparent p-3  px-lg-5 ">
          <div className="p-2 d-flex justify-content-center align-items-center">
            <img src="/logo.png" alt="" width={24} height={24} />
            <span className="mx-2">Gradeflix</span>
          </div>
          <h2>Chào mừng bạn quay lại</h2>
          <h4>Đăng nhập</h4>
        </Card.Header>
        <Card.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="px-3 py-2"
          >
            <Form.Group className="mb-3" controlId="validationCustom05">
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
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

            <Button variant="primary" type="submit" className="w-100 mt-2 mb-3">
              Đăng nhập
            </Button>
            <div className="w-100 text-center mb-4 h-25">
              <FacebookLogin
                appId="612167976904652"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile"
                callback={responseFacebook}
                icon="fa-facebook"
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
