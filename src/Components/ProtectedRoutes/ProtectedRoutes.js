import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// state={{ from: location }} replace => means return to where it was before entering this route (Back Btn)

// const ProtectedRoutes = () => {
//   const { auth } = useAuth();
//   const location = useLocation();
//   console.log(auth, "auth");

//   return auth?.user ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };

// export default ProtectedRoutes;

const ProtectedRoutes = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  // console.log(auth, "auth");

  return auth?.roles && allowedRoles?.includes(auth.roles) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
