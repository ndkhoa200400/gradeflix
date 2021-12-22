import React, { useState } from "react"
import { Dropdown } from "react-bootstrap"
import NotificationItem from "./notification-item.component"


const NotificationList = () => {
	const [notificationList, setNotificationList] = useState([{
		content: "Hello from the other side",
		createdAt: "2021-12-30",
		link: "http://localhost:3000/classrooms/MAonpCqc/tab-detail",
		isRead: true
	},
	{
		content: "Hello from the other side",
		createdAt: "2021-12-29",
		link: "http://localhost:3000/classrooms/MAonpCqc/tab-detail",
		isRead: false
	}])
	return (

		<Dropdown className="mx-2">
			<Dropdown.Toggle
				variant="secondary"
				className="btn btn-add-classroom rounded rounded-circle overflow-hidden "
				data-bs-toggle="dropdown"
				id="addClassroomBtn"
			>
				<i className="fas fa-bell"></i>
			</Dropdown.Toggle>
			<Dropdown.Menu style={{ width: '300px' }}>
				{notificationList && notificationList.length ?
					notificationList.map((notification) => (
						<NotificationItem notification={notification} />
					)) : (
						<Dropdown.ItemText className="p-3 text-center">
							Chưa có thông báo
						</Dropdown.ItemText>
					)}
				{/* <Dropdown.Item type="button" >
					Thêm lớp học
				</Dropdown.Item>
				<Dropdown.Item type="button">
					Tham gia lớp học
				</Dropdown.Item> */}
			</Dropdown.Menu>
		</Dropdown>)

}

export default NotificationList
