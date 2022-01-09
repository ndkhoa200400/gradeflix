import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import TopNavigation from "../../components/top-nav/top-nav.component";
import { useForm } from "react-hook-form";
import Spinning from "../../components/spinning/spinning.component";
import * as AuthenService from "../../services/auth.service";

import { postApiMethod } from "../../api/api-handler";
import dayjs from "dayjs";

import "./style.css";
import ErrorAlert from "../../components/alert/error-alert.component";
import InfoAlert from "../../components/alert/info-alert.component";
const Profile = () => {
	const { register, handleSubmit, setValue } = useForm();
	const {
		register: registerPassword,
		handleSubmit: handleSumitPassword,
		formState: { errors },
	} = useForm();

	const [showChangePassword, setShowChangePassword] = useState(false);
	const [onSubmiting, setOnSubmiting] = useState(false);
	const [newImage, setNewImage] = useState(null);
	const [image, setImage] = useState("/default-avatar.png");
	const [user, setUser] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [infoMessage, setInfoMessage] = useState("");
	const loginEmail = AuthenService.getUserInfo().loginType === "email";
	useEffect(() => {
		const user = AuthenService.getUserInfo();

		if (user.avatar) setImage(user.avatar);
		setUser(user);
		setValue("birthday", dayjs(user.birthday).format("YYYY-MM-DD"));
		setValue("fullname", user.fullname);
		setValue("studentId", user.studentId);
	}, [setValue]);

	const uploadImage = async (e) => {
		const files = e.target.files;
		const imageUpload = "imageupload";
		const data = new FormData();
		data.append("file", files[0]);
		setImage(URL.createObjectURL(files[0]));
		data.append("upload_preset", imageUpload);
		setNewImage(data);
	};

	const changePassword = async (data) => {
		try {
			const res = await postApiMethod("users/me/password", data);
			AuthenService.saveToken(res.token);
			setInfoMessage("Đổi mật khẩu thành công");
		} catch (error) {
			//console.log("error", error);
			if (error.statusCode === 401) {
				setErrorMessage(error.message);
			}
			setErrorMessage("Có lỗi xảy ra, vui lòng thử lại");
		}
	};

	const saveInfo = async (userBody) => {
		setOnSubmiting(true);
		try {
			if (newImage) {
				const res = await fetch(`${process.env.REACT_APP_CLOUDINARY_API_LINK}/image/upload`, {
					method: "POST",
					body: newImage,
				});
				const data = await res.json();

				userBody.avatar = data["secure_url"];
				setNewImage(false);
			}
			const res = await postApiMethod("users/me", userBody);

			setUser(res);
			AuthenService.saveUserInfo(res);

			setInfoMessage("Đổi thông tin thành công!");
		} catch (error) {
			setErrorMessage(error.message);
		}
		setOnSubmiting(false);
	};
	return user ? (
		<div>
			<TopNavigation title="Gradeflix" titleLink="/" />
			<Container className="my-5 ">
				<div id="profile" className="row justify-content-center ">
					<div className="avatar col-lg-5 text-center">
						<img src={image} alt="" className="d-block rounded rounded-circle m-auto mb-4" width="300" height="300" />
						<input type="file" id="upload" hidden onChange={uploadImage} />
						<label htmlFor="upload" className="cursor-pointer btn btn-outline-primary mb-3">
							Tải ảnh lên
						</label>
					</div>
					<Card className="col-lg-5 p-0">
						<Card.Header>
							<Card.Title>Thông tin cá nhân</Card.Title>
						</Card.Header>
						<Card.Body>
							<Form className="form-profile" onSubmit={handleSubmit(saveInfo)}>
								<Form.Group className="mb-3" controlId="formEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" placeholder="Nhập email" value={user.email} disabled={true} />
								</Form.Group>

								<Form.Group className="mb-3" controlId="formFullname">
									<Form.Label>Họ và tên</Form.Label>
									<Form.Control
										type="text"
										placeholder="Nhập họ và tên"
										{...register("fullname", { required: true })}
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formBirthday">
									<Form.Label>Ngày sinh</Form.Label>
									<Form.Control
										type="date"
										// value={user.birthay ?? undefined}

										// onChange={(e)=>user.birthay=e.target.value}
										{...register("birthday", { required: true })}
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formStudentId">
									<Form.Label>Mã số sinh viên</Form.Label>
									<Form.Control
										type="text"
										placeholder="Nhập mã số sinh viên"
										// onChange={(e)=>user.birthay=e.target.value}
										{...register("studentId")}
									/>
								</Form.Group>
								<div className="d-flex">
									<Button variant="outline-primary" type="submit" className="px-4 py-2">
										Lưu
									</Button>
									{onSubmiting ? <Spinning isFull={false} className="mx-2" /> : null}
								</div>
							</Form>

							<hr></hr>
							{loginEmail ? (
								<Button
									variant="outline-primary"
									className="px-3 py-2 text-left"
									onClick={() => setShowChangePassword(!showChangePassword)}
								>
									Đổi mật khẩu
								</Button>
							) : null}

							<Form
								className={`form-profile my-3 ${showChangePassword ? "" : "d-none"}`}
								onSubmit={handleSumitPassword(changePassword)}
							>
								<Form.Group className="mb-3" controlId="formOldPassword">
									<Form.Label>Mật khẩu cũ</Form.Label>
									<Form.Control
										type="password"
										placeholder="Nhập mật khẩu cũ"
										{...registerPassword("oldPassword", { required: true })}
										isInvalid={errors.oldPassword}
									/>
								</Form.Group>

								<Form.Group className="mb-3" controlId="formNewPassword">
									<Form.Label>Mật khẩu mới</Form.Label>
									<Form.Control
										type="password"
										placeholder="Nhập mật khẩu mới"
										{...registerPassword("newPassword", { required: true })}
										isInvalid={errors.newPassword}
									/>
								</Form.Group>
								<div className="d-flex">
									<Button variant="outline-primary" type="submit" className="px-4 py-2">
										Lưu
									</Button>
									{onSubmiting ? <Spinning isFull={false} className="mx-2" /> : null}
								</div>
							</Form>
						</Card.Body>
					</Card>
				</div>
				<ErrorAlert show={errorMessage} setHide={() => setErrorMessage("")} message={errorMessage} />
				<InfoAlert show={infoMessage} setHide={() => setInfoMessage("")} message={infoMessage} />
			</Container>
		</div>
	) : (
		<Spinning isFull={true} />
	);
};
export default Profile;
