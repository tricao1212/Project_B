import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/Login";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Users from "../pages/admin/Users";
import Trees from "../pages/admin/Trees";
import ProtectedRoute from "../middlewares/ProtectedRoute";
import HomeAdmin from "../pages/admin/HomeAdmin";
import Home from "../pages/main/Home";
import TypeTrees from "../pages/admin/TypeTrees";
import Assignments from "../pages/admin/Assignments";
import Map from "../pages/admin/Map";
import ResponsiveAppBar from "../pages/Test";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/test",
    element: <ResponsiveAppBar />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <HomeAdmin />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "trees",
        element: <Trees />,
      },
      {
        path: "types",
        element: <TypeTrees />,
      },
      {
        path: "assignments",
        element: <Assignments />,
      },
      {
        path: "map",
        element: <Map />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
