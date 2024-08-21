import HomeIcon from "@mui/icons-material/Home";
import ForestIcon from "@mui/icons-material/Forest";
import PeopleIcon from "@mui/icons-material/People";
import ParkIcon from '@mui/icons-material/Park';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MapIcon from '@mui/icons-material/Map';
import { Aside } from "../interfaces/Aside";

const asideAdminItems : Aside[] = [
  { title: "Home", icon: <HomeIcon />, link: "" },
  { title: "Trees", icon: <ParkIcon />, link: "trees" },
  { title: "Users", icon: <PeopleIcon />, link: "users" },
  { title: "Species", icon: <ForestIcon />, link: "types" },
  { title: "Tasks", icon: <AssignmentIcon />, link: "assignments" },
  { title: "Tasks History", icon: <AssignmentIcon />, link: "assignHistory" },
  { title: "Map", icon: <MapIcon />, link: "map" },
];

export { asideAdminItems };
