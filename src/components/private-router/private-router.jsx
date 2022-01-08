import React from "react";
import * as AuthService from "../../services/auth.service";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { savePreUrl } from "../../services/location.service";
import { useSocket } from "../../custome-hook";
import { useEffect } from "react";
function PrivateRoute({ children }) {
	const location = useLocation();
	const socket = useSocket();
	const navigate = useNavigate();
	const auth = AuthService.isLoggedIn();
	var user = AuthService.getUserInfo();
	useEffect(() => {
		const getAuth = async () => {
			if (auth) {
				socket.addNewUser(user);
			}
		};
		return getAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth]);

	useEffect(() => {
		if (socket?.socket) {
			socket.socket.on("accountLocked", () => {
				AuthService.logOut();
				socket.logOut();
				navigate("/locked");
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket.socket]);

	savePreUrl(`${location.pathname}${location.search}`);
	if (!auth) {
		return <Navigate to="/login" />;
	}
	if (user?.role === "ADMIN") return <Navigate to="/admin/accounts" />;
	if (!user?.activated && location.pathname !== "/activation-request" && location.pathname !== "/activate") {
		return <Navigate to="/activation-request" />;
	}
	return children;
}

export default PrivateRoute;
