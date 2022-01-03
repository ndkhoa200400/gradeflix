import React from "react";
import * as AuthService from "../../services/auth.service";
import { Navigate, useLocation } from "react-router-dom";
import { savePreUrl } from "../../services/location.service";
import { useSocket } from "../../custome-hook";
import { useEffect } from "react";
function PrivateRoute({ children }) {
	const location = useLocation();
	const socket = useSocket();

	const auth = AuthService.isLoggedIn();
	const user = AuthService.getUserInfo();
	console.log(user);
	useEffect(() => {
		if (auth) {
			//const user = AuthService.getUserInfo();
			socket.addNewUser(user);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth]);
	savePreUrl(`${location.pathname}${location.search}`);
	var result = null;
	if (!auth) {
		return <Navigate to="/login" />;
	}
	if (user.role === "ADMIN") return <Navigate to="/admin/accounts" />;
	if (!user.activated && location.pathname !== "/activation-request" && location.pathname !== "/activate") {
		return <Navigate to="/activation-request" />;
	}
	return children;
}

export default PrivateRoute;
