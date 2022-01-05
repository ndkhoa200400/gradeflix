import { NavLink } from "react-router-dom";
import { Row, Container, Nav } from "react-bootstrap";

const Tab = ({ id, classroom }) => {
	const urlTab1 = "/classrooms/" + id + "/tab-detail";
	const urlTab2 = "/classrooms/" + id + "/tab-people";
	const urlTab3 = "/classrooms/" + id + "/tab-my-info";
	const urlTab4 = "/classrooms/" + id + "/tab-grade";
	const urlTab5 = "/classrooms/" + id + "/tab-review-grade";
	return (
		<Container>
			<Row className="py-3">
				<Nav justify variant="pills" defaultActiveKey={urlTab1}>
					<Nav.Item>
						<NavLink to={urlTab1} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
							Thông tin chung
						</NavLink>
					</Nav.Item>
					<Nav.Item>
						<NavLink to={urlTab2} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
							Danh sách
						</NavLink>
					</Nav.Item>
					{classroom && (classroom.user.userRole === "HOST" || classroom.user.userRole === "TEACHER") ? (
						<Nav.Item>
							<Nav.Item>
								<NavLink to={urlTab4} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
									Bảng điểm
								</NavLink>
							</Nav.Item>
						</Nav.Item>
					) : null}
					{classroom && classroom.user.userRole === "STUDENT" ? (
						<Nav.Item>
							<NavLink to={urlTab3} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
								Thông tin của tôi
							</NavLink>
						</Nav.Item>
					) : null}
					<Nav.Item>
						<NavLink to={urlTab5} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
							Phúc Khảo
						</NavLink>
					</Nav.Item>
				</Nav>
			</Row>
		</Container>
	);
};

export default Tab;
