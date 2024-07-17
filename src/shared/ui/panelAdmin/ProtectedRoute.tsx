import { useAppSelector } from "@/app";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const theme = useAppSelector((state) => state.theme);
  if (!theme.getIsLogin) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};
