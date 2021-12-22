import React from 'react'
import * as AuthService from '../../services/auth.service'
import { Navigate, useLocation } from 'react-router-dom'
import { savePreUrl } from '../../services/location.service';
import { useSocket } from '../../custome-hook';
import { useEffect } from 'react';
function PrivateRoute({ children }) {
	const location = useLocation()
	const socket = useSocket()

	const auth = AuthService.isLoggedIn();

	useEffect(() => {
		if (auth) {
			const user = AuthService.getUserInfo()
			socket.addNewUser(user)
		}
	}, [auth, socket]
	)
	savePreUrl(location.pathname)
	return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute
