import DashboardPage from "@/ui/pages/dashboard/dashboard-page";
import HomePage from "@/ui/pages/home/home-page";
import LoginPage from "@/ui/pages/login/login-page";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "./auth";

const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  {
    Component: AuthRoute,
    children: [
      { path: "/login", Component: LoginPage },
      { path: "/dashboard", Component: DashboardPage },
    ],
  },
  { path: "*", element: <Navigate to="/" /> },
]);

export default router;
