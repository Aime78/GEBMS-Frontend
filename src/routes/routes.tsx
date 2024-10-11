import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../layout/AppLayout/AppLayout";
import { EducationPage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
      {
        path: "/expenditure",
        element: <h1>Expenditure</h1>,
      },
      {
        path: "/education",
        element: <EducationPage/>,
      },
    ],
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;