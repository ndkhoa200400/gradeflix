import React from 'react'
import * as AuthService from '../../services/auth.service'
import { Navigate, useLocation } from 'react-router-dom'
import { savePreUrl } from '../../services/location.service';
function PrivateRoute({ children }) {
    const location = useLocation()
    const auth = AuthService.isLoggedIn();
    if (auth){
      return children;
    }
    savePreUrl(location.pathname)
    return <Navigate to="/login" />;
  }

export default PrivateRoute