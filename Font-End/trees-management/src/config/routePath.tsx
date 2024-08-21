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
import HomeManager from "../pages/manager/HomeManager";
import ListStaffs from "../pages/manager/ListStaffs";
import AssignmentsManager from "../pages/manager/AssignmentsManager";
import HomeStaff from "../pages/staff/HomeStaff";
import MapTasks from "../pages/staff/MapTasks";
import ToDoList from "../pages/staff/ToDoList";
import TreesStaff from "../pages/staff/TreesStaff";
import TreesMa from "../pages/manager/Trees";
import MapManager from "../pages/manager/MapManager";
import AssignmentHistory from "../pages/manager/AssignmentHistory";

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
        path: "listStaffs",
        element: <ListStaffs />,
      },
      {
        path: "trees",
        element: <Trees />,
      },
      {
        path: "treesManager",
        element: <TreesMa />,
      },
      {
        path: "listtrees",
        element: <TreesStaff />,
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
        path: "assignHistory",
        element: <AssignmentHistory />,
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
        path: "mapManager",
        element: <MapManager />,
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
