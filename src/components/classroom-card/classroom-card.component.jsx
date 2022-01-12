import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as AuthenService from "../../services/auth.service";
const ClassroomCard = ({ classroom }) => {
	const maxLength = 80;
	classroom.description =
		classroom?.description?.length > maxLength
			? classroom.description.substring(0, maxLength) + "..."
			: classroom.description;
	const user = AuthenService.getUserInfo();
	const isHost = classroom.hostId === user.id;
	const image = classroom?.host?.avatar ?? "./default-avatar.png";
	const navigate = useNavigate();
	return classroom ? (
		<div className="card classroom-item m-3" onClick={() => navigate("/classrooms/" + classroom.id + "/tab-detail")}>
			<div className="header d-flex flex-column justify-content-between">
				<img src={classroom.banner} alt="classroom banner" className="classroom-banner img-fluid card-img-top" />
				<div className="dark-overlay"></div>

				<Link
					className="classroom-name font-weight-bold text-truncate"
					to={"/classrooms/" + classroom.id + "/tab-detail"}
				>
					<span>{classroom.name}</span>
					<br />
					<span className="classroom-subject">{classroom.subject}</span>
				</Link>

				{!isHost && <div className="classroom-host">{classroom?.host?.fullname ?? ""}</div>}
			</div>

			<div className="card-body">{classroom.description}</div>
			{<img src={image} className="host-avatar rounded rounded-circle" alt="host" style={{ objectFit: "cover" }}></img>}
		</div>
	) : null;
};

export default ClassroomCard;
