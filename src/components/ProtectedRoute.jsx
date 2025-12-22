import React, {useEffect} from 'react'
import { Outlet , Navigate, useLocation} from 'react-router-dom'
// import { useAuth } from './store/auth-context'
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './store/auth-slice';

export default function ProtectedRoute() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const location = useLocation();  // we can know the whta is path used tryint to access

      useEffect(() => {

        const skipRedirectPath = 
        sessionStorage.getItem("skipRedirectPath") === "true";
    if(!isAuthenticated && location.pathname !== "/login" && !skipRedirectPath) {
      sessionStorage.setItem("redirectPath", location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  return  isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
}
