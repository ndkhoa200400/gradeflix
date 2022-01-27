import React, { useState } from "react";
import { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { getApiMethod } from "../../api/api-handler";
import { useSocket } from "../../custome-hook";
import NotificationItem from "./notification-item.component";
import InfiniteScroll from "react-infinite-scroll-component";
const NotificationList = () => {
	const [notificationList, setNotificationList] = useState(null);
	const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
	const [notificationItems, setNotificationItems] = useState([]);
	const [pageIndex, setPageIndex] = useState(1);
	const pageSize = 10;

	const socket = useSocket();

	useEffect(() => {
		if (socket?.socket) {
			socket.socket.on("notification", (notification) => {
				setNotificationList((prev) => [notification, ...prev]);
			});
		}
	}, [socket.socket]);

	const markAllRead = async () => {
		try {
			await getApiMethod("notifications/mark-all-read");
			// setNotificationList(newNotifications);
			const params = { pageIndex: 1, pageSize: (pageSize * (pageIndex - 1)) }
			const notifications = await getApiMethod(`notifications`, params);

			setNotificationList(notifications);
			setNotificationItems(notifications.items)
		} catch (error) {
			console.log("error", error);
		}
	};

	const updateNotifications = (newNotification) => {
		const newNotificationItems = [...notificationItems];

		for (const noti of newNotificationItems) {
			if (noti.id === newNotification.id) {
				Object.assign(noti, newNotification);
				break;
			}
		}
		setNotificationItems(newNotificationItems);
	};
	const getNotifications = async () => {
		try {
			const params = { pageIndex, pageSize }
			const notifications = await getApiMethod(`notifications`, params);

			setNotificationList(notifications);
			setNotificationItems([...notificationItems, ...notifications.items])
			setPageIndex(pageIndex + 1)
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => getNotifications()
		// eslint-disable-next-line react-hooks/exhaustive-deps
		, []);

	useEffect(() => {
		if (notificationItems) {
			const unreadNotifications = notificationItems.filter((noti) => !noti.isRead).length;

			setUnreadNotificationCount(unreadNotifications);
		}
	}, [notificationItems]);
	return (
		<div className="">
			<Dropdown align="end" className="mx-3" onToggle={() => setUnreadNotificationCount("0")}>
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
				<Dropdown.Menu variant="secondary" style={{ width: "350px" }} className=" notification-list" id="notification-list">
					<div className=" px-3 py-2 notification-header d-flex justify-content-between align-items-center">
						<div className=" fs-2">Thông báo</div>
						<div className="text-primary cursor-pointer" onClick={markAllRead}>
							Đọc hết
						</div>
					</div>

					{notificationList && notificationItems?.length ? (
						// notificationItems.map((notification, idx) => (
						// 	<NotificationItem key={idx} notification={notification} updateNotification={updateNotifications} />
						// ))
						<InfiniteScroll
							dataLength={notificationItems.length}
							next={() => setTimeout(getNotifications, 500)}
							hasMore={notificationList.hasNextPage}

							loader={
								<div className="text-center w-100">
									<p className="text-muted">Đang tải thêm...</p>
								</div>}
							scrollableTarget="notification-list"
						>
							{notificationItems.map((notification, idx) => (
								<NotificationItem key={idx} notification={notification} updateNotification={updateNotifications} />
							))}
						</InfiniteScroll>
					) : (
						<Dropdown.ItemText className="p-3 text-center">Chưa có thông báo</Dropdown.ItemText>
					)}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default NotificationList;
