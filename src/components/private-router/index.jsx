import React from 'react'
import * as AuthService from '../../services/auth.service'
import { Navigate } from 'react-router-dom'
function PrivateRoute({ children }) {
    const auth = AuthService.isLoggedIn();
    return auth ? children : <Navigate to="/login" />;
  }

export default PrivateRoute