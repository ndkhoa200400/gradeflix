import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
//'/users/register
import { postApiMethod } from "../../api/api-handler";
import * as AuthenService from "../../services/auth.service";
import Spining from "../../components/spinning/spinning.component";
const SignupPage = () => {
  const [onSubmiting, setOnSubmiting] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setOnSubmiting(true);
    try {
      // gửi cho api
      const res = await postApiMethod("users/register", data);

      //console.log(res);
      AuthenService.saveToken(res.token);
      delete res.token;
      res.loginType = "email";
      AuthenService.saveUserInfo(res);
      navigate("/", { replace: true });
    } catch (error) {
      setError("email", {
        message: "Email đã tồn tại",
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
        <Card.Header className="text-center bg-transparent p-3 px-lg-5 ">
          <div className="p-2 d-flex justify-content-center align-items-center">
            <img src="/logo.png" alt="" width={24} height={24} />
            <span className="mx-2">Gradeflix</span>
          </div>
          <h2>Chào mừng bạn tới Gradeflix</h2>
          <h4>Tạo tài khoản</h4>
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
            className="px-3 py-2"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
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
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Họ và tên"
                required
                {...register("fullname", {
                  required: "Họ và tên không được bỏ trống",
                })}
                isInvalid={errors.fullname}
              />

              {errors.fullname?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors.fullname?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBirthday">
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control type="date"
              {...register("birthday", {
              })}  />
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
