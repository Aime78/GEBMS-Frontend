import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "../layout/AppLayout/AppLayout";
import { EducationPage } from "../pages";
import EdExpRequests from "../pages/education/EdExpRequests/EdExpRequests";
import HealthPage from "../pages/health/HealthPage";
import HealthExpRequest from "../pages/health/HealthExpRequest/HealthExpRequest";
import DefensePage from "../pages/defense/DefensePage";
import DefenseExpRequest from "../pages/defense/DefenseExpRequest/DefenseExpRequest";
import InfrastructurePage from "../pages/infrastructure/InfrastructurePage";
import InfrastructureExpRequest from "../pages/infrastructure/InfrastructureExpRequest/InfrastructureExpRequest";
import LoginPage from "../pages/login/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import PrivateRoutes from "./PrivateRoutes";
import UsersPage from "../pages/users/UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,

    children: [
      {
        path: "/",
  
        element: <PrivateRoutes />,
        children: [
          {
            path: '/',
            loader: () => {
                throw redirect('/dashboard');
            },
            element: <Outlet />,
        },
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/expenditure",
            element: <h1>Expenditure</h1>,
          },
          {
            path: "/education",
            element: <EducationPage />,
          },
          {
            path: "/education/expenditure-requests",
            element: <EdExpRequests />,
          },
          {
            path: "/health",
            element: <HealthPage />,
          },
          {
            path: "/health/expenditure-requests",
            element: <HealthExpRequest />,
          },
          {
            path: "/defense",
            element: <DefensePage />,
          },
          {
            path: "/defense/expenditure-requests",
            element: <DefenseExpRequest />,
          },
          {
            path: "/infrastructure",
            element: <InfrastructurePage />,
          },
          {
            path: "/infrastructure/expenditure-requests",
            element: <InfrastructureExpRequest />,
          },
          {
            path: "/users",
            element: <UsersPage/>
          }
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
