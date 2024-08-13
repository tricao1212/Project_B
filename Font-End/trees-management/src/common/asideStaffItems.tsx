import HomeIcon from "@mui/icons-material/Home";
import ParkIcon from '@mui/icons-material/Park';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MapIcon from '@mui/icons-material/Map';
import { Aside } from "../interfaces/Aside";

const asideStaffItems : Aside[] = [
  { title: "Home", icon: <HomeIcon />, link: "staff" },
  { title: "Trees", icon: <ParkIcon />, link: "trees" },
  { title: "To do list", icon: <AssignmentIcon />, link: "todolist" },
  { title: "Map for tasks", icon: <MapIcon />, link: "mapTask" },
];

export { asideStaffItems };