import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ParkIcon from '@mui/icons-material/Park';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MapIcon from '@mui/icons-material/Map';
import { Aside } from "../interfaces/Aside";

const asideManagerItems : Aside[] = [
  { title: "Home", icon: <HomeIcon />, link: "" },
  { title: "Trees", icon: <ParkIcon />, link: "trees" },
  { title: "Staffs", icon: <PeopleIcon />, link: "users" },
  { title: "Assignments", icon: <AssignmentIcon />, link: "assignments" },
  { title: "Map", icon: <MapIcon />, link: "map" },
];

export { asideManagerItems };
