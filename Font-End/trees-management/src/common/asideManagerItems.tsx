import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ParkIcon from '@mui/icons-material/Park';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MapIcon from '@mui/icons-material/Map';
import { Aside } from "../interfaces/Aside";

const asideManagerItems : Aside[] = [
  { title: "Home", icon: <HomeIcon />, link: "manager" },
  { title: "Trees", icon: <ParkIcon />, link: "trees" },
  { title: "Staffs", icon: <PeopleIcon />, link: "staffs" },
  { title: "Assignments", icon: <AssignmentIcon />, link: "assignmentsManager" },
  { title: "Map", icon: <MapIcon />, link: "map" },
];

export { asideManagerItems };
