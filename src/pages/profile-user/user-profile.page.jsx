import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import TopNavigation from "../../components/top-nav/top-nav.component";
import Spining from "../../components/spinning/spinning.component";
import { getApiMethod } from "../../api/api-handler";
import "./style.css";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
const UserProfile = () => {
	const param = useParams();
	const [image, setImage] = useState("/default-avatar.png");
	const [user, setUser] = useState(null);
	useEffect(() => {
		const getUser = async () => {
			const user = await getApiMethod(`users/${param.id}`);

			setUser(user);
			if (user.avatar) setImage(user.avatar);

			// setValue("birthday", dayjs(user.birthday).format("YYYY-MM-DD"));
			// setValue("fullname", user.fullname);
			// setValue("studentId", user.studentId);
		};
		return getUser();
	}, [param.id]);
	return user ? (
		<div>
			<TopNavigation title="Gradeflix" titleLink="/" />
			<Container className="my-5 ">
				<div id="profile" className="row justify-content-center align-items-center">
					<div className="avatar col-lg-5 text-center">
						<img src={image} alt="" className="d-block rounded rounded-circle m-auto mb-4" width="300" height="300" />
					</div>
					<Card className="col-lg-5 p-0 user-information">
						<Card.Header>
							<Card.Title>Thông tin cá nhân</Card.Title>
						</Card.Header>
						<Card.Body>
							<Card>
								<Card.Header as="h5">Email</Card.Header>
								<Card.Body>
									<Card.Text>{user.email}</Card.Text>
								</Card.Body>
							</Card>

							<Card>
								<Card.Header as="h5">Họ và tên</Card.Header>
								<Card.Body>
									<Card.Text>{user.fullname}</Card.Text>
								</Card.Body>
							</Card>

							<Card>
								<Card.Header as="h5">Ngày sinh</Card.Header>
								<Card.Body>
									<Card.Text>{dayjs(user.birthday).format("YYYY-MM-DD")}</Card.Text>
								</Card.Body>
							</Card>

							<Card>
								<Card.Header as="h5">Mã số sinh viên</Card.Header>
								<Card.Body>
									<Card.Text>{user.studentId}</Card.Text>
								</Card.Body>
							</Card>
						</Card.Body>
					</Card>
				</div>
			</Container>
		</div>
	) : (
		<Spining isFull={true} />
	);
};
export default UserProfile;
