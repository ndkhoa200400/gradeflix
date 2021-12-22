import React from "react";
import { Link } from "react-router-dom";


const NotificationItem = ({ notification }) => {

	return (
		<Link

			to={notification.link}>
			<div className={`notification d-flex flex-column text-dark ${notification.isRead ? 'text-muted' : ' fw-bold'}`}>
				<div className="notification-content">
					{notification.content}
				</div>
				<div className="d-flex justify-content-between align-items-center">
					{notification.createdAt}
					{!notification.isRead ? (
						<div className="rounded rounded-circle bg-primary" style={{ height: '12px', width: '12px' }}>
						</div>
					) : null}
				</div>



			</div>
		</Link>

	)
}

export default NotificationItem
