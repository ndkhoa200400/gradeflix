import React from "react";
import { Link } from "react-router-dom";
import { getApiMethod } from "../../api/api-handler";
import dayjs from "dayjs";
import { Dropdown } from "react-bootstrap";

const NotificationItem = ({ notification, updateNotification }) => {
	const markRead = async () => {
		try {
			const newNotification = await getApiMethod(`notifications/${notification.id}/mark-read`);
			updateNotification(newNotification);
		} catch (error) {
			console.log(error);
		}
	};

	const now = dayjs();

	const dayDifference =
		now.diff(dayjs(notification.createdAt), "year") > 1
			? `${now.diff(dayjs(notification.createdAt), "year")} năm trước`
			: now.diff(dayjs(notification.createdAt), "minute") < 1
			? `Vừa xong`
			: now.diff(dayjs(notification.createdAt), "minute") < 60
			? `${now.diff(dayjs(notification.createdAt), "minute")} phút trước`
			: now.diff(dayjs(notification.createdAt), "hour") < 24
			? `${now.diff(dayjs(notification.createdAt), "hour")} giờ trước`
			: now.diff(dayjs(notification.createdAt), "week") < 4
			? `${now.diff(dayjs(notification.createdAt), "week")} tuần trước`
			: `${now.diff(dayjs(notification.createdAt), "month")} tháng trước`;

	return (
		<Dropdown.Item
			className={`d-flex notification-item row m-0 p-2 py-3 align-items-center  ${notification.isRead ? "text-muted" : " fw-bold"}`}
		>
			<Link className="col-10  text-dark" onClick={markRead} to={notification.link}>
				<div className="notification-content">{notification.content}</div>
				{!notification.isRead ? (
					<span className="fs-6 text  text-primary"> {dayDifference}</span>
				) : (
					<span className="fs-6 text"> {dayDifference}</span>
				)}
			</Link>

			{!notification.isRead ? (
				<div className="col align-items-center d-flex justify-content-center" onClick={markRead}>
					<div
						className=" rounded rounded-circle bg-primary cursor-pointer"
						style={{ height: "12px", width: "12px" }}
					></div>
				</div>
			) : null}
		</Dropdown.Item>
	);
};

export default NotificationItem;
