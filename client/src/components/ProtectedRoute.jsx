// Import required modules
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    // Get the currently authenticated user from global states
    const { user } = useSelector((state) => state.user);
    return (user ? <Outlet /> : <Navigate to={"/sign-in"} />);
};