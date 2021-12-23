import React, { useState } from "react";
import { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { getApiMethod } from "../../api/api-handler";
import { useSocket } from "../../custome-hook";
import NotificationItem from "./notification-item.component";

const NotificationList = () => {
	const [notificationList, setNotificationList] = useState([]);
	const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

	const socket = useSocket();

	useEffect(() => {
		if (socket?.socket) {
			socket.socket.on("notification", (notification) => {
				setNotificationList((prev) => [notification, ...prev]);
			});
		}
	}, [socket.socket]);

	const updateNotifications = (newNotification) => {
		const newNotificationList = [...notificationList];

		for (const noti of newNotificationList) {
			if (noti.id === newNotification.id) {
				Object.assign(noti, newNotification);
				break;
			}
		}
		setNotificationList(newNotificationList);
	};
	const getNotifications = async () => {
		try {
			const notifications = await getApiMethod(`notifications`);

			setNotificationList(notifications);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		return getNotifications();
	}, []);

	useEffect(() => {
		if (notificationList) {
			const unreadNotifications = notificationList.filter((noti) => !noti.isRead).length;

			setUnreadNotificationCount(unreadNotifications);
		}
	}, [notificationList]);
	return (
		<div className="">
			<Dropdown align="end" className="mx-2" onToggle={() => setUnreadNotificationCount("0")}>
				<Dropdown.Toggle
					variant="secondary"
					className="btn btn-add-classroom rounded rounded-circle overflow-hidden "
					id="notification-toggle"
				>
					<i className="fas fa-bell"></i>
					{Number(unreadNotificationCount) > 0 ? (
						<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
							{unreadNotificationCount}
						</span>
					) : null}
				</Dropdown.Toggle>
				<Dropdown.Menu style={{ width: "350px" }} className=" notification-list">
					<h3 className="px-3 pt-2">Thông báo</h3>

					{notificationList && notificationList.length ? (
						notificationList.map((notification, idx) => (
							<NotificationItem key={idx} notification={notification} updateNotification={updateNotifications} />
						))
					) : (
						<Dropdown.ItemText className="p-3 text-center">Chưa có thông báo</Dropdown.ItemText>
					)}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default NotificationList;
