import { verifyAuthApi } from "@/data/repositories/auth";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useVerifyAuth = () => {
  return useQuery({
    queryFn: verifyAuthApi,
    queryKey: ["auth", "verify"],
    select: (data) => data,
  });
};

export const AuthRoute = () => {
  const location = useLocation();
  const { data, isPending } = useVerifyAuth();

  if (isPending) return <></>;

  if (location.pathname === "/login") {
    if (data) return <Navigate to="/dashboard" />;
    return <Outlet />;
  }

  if (data) return <Outlet />;
  return <Navigate to="/login" />;
};
