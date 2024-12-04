import DashboardPage from "@/ui/pages/dashboard/dashboard-page";
import HomePage from "@/ui/pages/home/home-page";
import LoginPage from "@/ui/pages/login/login-page";
import {
  Navigate,
  Outlet,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { useVerifyAuth } from "../queries/auth/verify-auth";

const InitPage = () => {
  const { data } = useVerifyAuth();
  return data ? <DashboardPage /> : <HomePage />;
};

const AuthRoute = () => {
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

const router = createBrowserRouter([
  { path: "/", Component: InitPage },
  {
    Component: AuthRoute,
    children: [{ path: "/login", Component: LoginPage }],
  },
  { path: "*", element: <Navigate to="/" /> },
]);

export default router;
