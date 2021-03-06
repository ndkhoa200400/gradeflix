import React from "react";
import { Image } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import * as AuthenService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../custome-hook";
import { savePreUrl } from "../../services/location.service";

const Avatar = () => {
  const navigate = useNavigate();
	const socket = useSocket()
  const user = AuthenService.getUserInfo();
  const avatar = user.avatar ?? "/default-avatar.png";

  const logout = () => {
    AuthenService.logOut();
		socket.logOut()
		savePreUrl('/')
    navigate("/login");
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="light"
        data-bs-toggle="dropdown"
        className="btn btn-transparent bg-body avatar-dropdown"
      >
        <Image
          src={avatar}
          width={40}
          height={40}
          roundedCircle
					style={{objectFit:"cover"}}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item type="button" onClick={()=>navigate('/me')}>
          Thông tin cá nhân
        </Dropdown.Item>
        <Dropdown.Item type="button" onClick={logout}>
          Đăng xuất
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Avatar;
