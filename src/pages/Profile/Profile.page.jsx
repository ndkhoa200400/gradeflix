import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import TopNavigation from "../../components/top-nav/top-nav.component";
import { useForm } from "react-hook-form";
import Spining from "../../components/spinning/spinning.component";
import "./style.css";
const Profile = () => {
  const { register, handleSubmit } = useForm();
  const { register: registerPassword, handleSubmit: handleSumitPassword } =
    useForm();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [onSubmiting, setOnSubmiting] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [image, setImage] = useState(
    "https://source.unsplash.com/random/300x300"
  );
  const uploadImage = async (e) => {
    const files = e.target.files;

    const imageUpload = "imageupload";

    const data = new FormData();
    data.append("file", files[0]);
    setImage(URL.createObjectURL(files[0]));
    data.append("upload_preset", imageUpload);
    setNewImage(data);
  };
  const changePassword = async(data)=>{
    console.log('data', data);
  }

  const saveInfo = async (data) => {
    // console.log("data", data);
    setOnSubmiting(true);
    if (newImage) {
      await fetch(`${process.env.REACT_APP_CLOUDINARY_API_LINK}/image/upload`, {
        method: "POST",
        body: newImage,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);

          //Lấy url: data['secure_url']

          setNewImage(false);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }

    setOnSubmiting(false);
  };
  return (
    <div>
      <TopNavigation title="Gradeflix" titleLink="/" />
      <Container className="mt-5 ">
        <div id="profile" className="row justify-content-center ">
          <div className="avatar col-lg-5 text-center">
            <img
              src={image}
              alt=""
              className="d-block rounded rounded-circle m-auto mb-4"
              width="300"
              height="300"
            />
            <input type="file" id="upload" hidden onChange={uploadImage} />
            <label
              for="upload"
              className="cursor-pointer btn btn-outline-primary"
            >
              Tải ảnh lên
            </label>
          </div>
          <div className="col-lg-5">
            <Form className="form-profile" onSubmit={handleSubmit(saveInfo)}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  value="nguyendangkhoa200400@gmail.com"
                  disabled={true}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formFullname">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập họ và tên"
                  value="Nguyễn Đăng Khoa"
                  {...register("fullname", { required: true })}
                />
              </Form.Group>
              <div className="d-flex">
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="px-4 py-2"
                >
                  Lưu
                </Button>
                {onSubmiting ? (
                  <Spining isFull={false} className="mx-2" />
                ) : null}
              </div>
            </Form>

            <hr></hr>

            <Button
              variant="outline-primary"
              className="px-3 py-2 text-left"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              Đổi mật khẩu
            </Button>
            <Form
              className={`form-profile mt-3 ${
                showChangePassword ? "" : "d-none"
              }`}
              onSubmit={handleSumitPassword(changePassword)}
            >
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Mật khẩu cũ</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu cũ"
                  {...registerPassword("oldPassword", { required: true })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formFullname">
                <Form.Label>Mật khẩu mới</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  {...registerPassword("newPassword", { required: true })}
                />
              </Form.Group>
              <div className="d-flex">
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="px-4 py-2"
                >
                  Lưu
                </Button>
                {onSubmiting ? (
                  <Spining isFull={false} className="mx-2" />
                ) : null}
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Profile;
