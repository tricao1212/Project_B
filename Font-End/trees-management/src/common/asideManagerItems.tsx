import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ParkIcon from '@mui/icons-material/Park';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MapIcon from '@mui/icons-material/Map';
import { Aside } from "../interfaces/Aside";

const asideManagerItems : Aside[] = [
  { title: "Home", icon: <HomeIcon />, link: "manager" },
  { title: "Trees", icon: <ParkIcon />, link: "treesManager" },
  { title: "Staffs", icon: <PeopleIcon />, link: "listStaffs" },
  { title: "Tasks", icon: <AssignmentIcon />, link: "assignmentsManager" },
  { title: "Tasks History", icon: <AssignmentIcon />, link: "assignHistory" },
  { title: "Map", icon: <MapIcon />, link: "mapManager" },
];

export { asideManagerItems };
