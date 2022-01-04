import { Dropdown, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as AuthenService from "../../services/auth.service";
import { useSocket } from "../../custome-hook";
const AdminAvatar = () => {
	const navigate = useNavigate();
	const socket = useSocket();
	const logout = () => {
		AuthenService.logOut();
		socket.logOut();
		navigate("/login", { replace: true });
	};
	return (
		<Dropdown>
			<Dropdown.Toggle
				variant="light"
				data-bs-toggle="dropdown"
				className="btn btn-transparent bg-body avatar-dropdown"
			>
				<Image src="/admin_avatar.png" width={40} height={40} roundedCircle className="img-fluid border border-dark" />
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item type="button" onClick={logout}>
					Đăng xuất
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};
export default AdminAvatar;
