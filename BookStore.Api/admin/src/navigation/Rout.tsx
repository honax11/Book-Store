import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from 'shared/services/TokenService';

export const Rout = () => {
    const isAdmin = getUser();
    return isAdmin.accessToken && isAdmin.refreshToken ? <Outlet /> : <Navigate to={"/login"} />
};