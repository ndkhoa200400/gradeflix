import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import TopNavigation from "../../components/top-nav/top-nav.component";
import "./style.css";
const Profile = ({}) => {
  return (
    <div>
      <TopNavigation title="Gradeflix" titleLink="/" />
      <Container className="mt-5 text-center">
        <div
          id="profile"
          className="row justify-content-around align-items-center"
        >
          <div className="avatar col-lg-5 text-center">
            <img
              src="https://source.unsplash.com/random/300x300"
              alt=""
              className="d-block img-fluid rounded rounded-circle m-auto mb-4"
              width="300"
              height="300"
            />
            <Button variant="outline-primary" type="button" className="d-block m-auto px-4 py-2">
              Thay đổi ảnh
            </Button>
          </div>

          <Form className="form-profile col-lg-7">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value="nguyendangkhoa200400@gmail.com"
              />
            </Form.Group>

            <Form.Group  className="mb-3"controlId="formFullname">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                value="Nguyễn Đăng Khoa"
              />
            </Form.Group>

            <Button variant="outline-primary" type="submit" className='px-4 py-2'>
              Lưu
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};
export default Profile;
