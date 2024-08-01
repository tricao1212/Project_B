import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/Login";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Users from "../pages/admin/Users";
import Trees from "../pages/admin/Trees";
import ProtectedRoute from "../middlewares/ProtectedRoute";
import HomeAdmin from "../pages/admin/HomeAdmin";
import Test from "../Test";
import Home from "../pages/main/Home";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
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
        path: "test",
        element: <Test />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
