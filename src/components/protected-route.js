import { useState } from "react"
import { Navigate, Outlet } from "react-router";

export const ProtectedRoutes = () => {


    const [isLoggedIn] = useState(localStorage.getItem('authToken'));

    return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />;

}