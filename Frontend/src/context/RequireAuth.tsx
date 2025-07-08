import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/HomePage/Loader";
import { JSX } from "react";

interface RequireAuthProps {
    children: JSX.Element;
}


export const RequireAuth = ({ children }: RequireAuthProps) => {
    const { authed, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loader />;

    if (!authed) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
