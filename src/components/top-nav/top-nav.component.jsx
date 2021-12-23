import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../avatar-user/avatar-user.component";
import NotificationList from "../notification/notification-list.component";
const TopNavigationHome = ({ onClassCreated, onClassJoined }) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light px-3">
			<div className="container-fluid">
				<Link className="navbar-brand d-flex align-items-center" to="/">
					<img src="/logo.png" alt="" width={24} height={24} />
					<span>Gradeflix</span>
				</Link>

				<section className="utility d-flex justify-content-around">
					<NotificationList />
				</section>
			</div>
			<Avatar />
		</nav>
	);
};
export default TopNavigationHome;
