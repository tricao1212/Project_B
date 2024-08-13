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
import HomeManager from "../pages/manager/HomeManager";
import Staffs from "../pages/manager/Staffs";
import AssignmentsManager from "../pages/manager/AssignmentsManager";
import HomeStaff from "../pages/staff/HomeStaff";
import MapTasks from "../pages/staff/MapTasks";
import ToDoList from "../pages/staff/ToDoList";

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
        path: "manager",
        element: <HomeManager />,
      },
      {
        path: "staff",
        element: <HomeStaff />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "staffs",
        element: <Staffs />,
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
        path: "assignmentsManager",
        element: <AssignmentsManager />,
      },
      {
        path: "todolist",
        element: <ToDoList />,
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "mapTask",
        element: <MapTasks />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
