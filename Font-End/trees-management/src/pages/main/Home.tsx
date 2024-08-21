import TreeMap from "../../components/TreeMap";
import { TreeRes } from "../../interfaces/Response/Tree/TreeRes";
import { getAllTree } from "../../services/TreeApi";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeAuth } from "../../redux/Slices/authSlice";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { getUserRoleName } from "../../utils/getUSerRole";
import TreeMapStaff from "../staff/TreeMapStaff";
import TreeMapManager from "../manager/TreeMapManager";

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const fetchTreeTask = async () => {
    const res = (await getAllTree()).data;
    const trees = res as TreeRes[];
    if (user) {
      const filteredTrees = trees.filter((tree: TreeRes) => {
        if (tree.assignments) {
          // Filter assignments by userId and isConfirm
          const matchingAssignments = tree.assignments.filter(
            (assignment) => assignment.userId === user.id
          );
          return matchingAssignments.length > 0;
        }
        return false;
      });
      return filteredTrees;
    }
    return [];
  };

  const fetchTree = async () => {
    const res = (await getAllTree()).data;
    const trees = res as TreeRes[];
    if (user) {
      const filteredTrees = trees.filter((tree: TreeRes) => {
        return tree.assignments?.every(
          (assignment) =>
            assignment.userId !== user.id
        );
      });
      console.log(filteredTrees);
      return filteredTrees;
    }
    return [];
  };

  const {
    data: treesTask = [],
    isLoading: taskLoading,
    isError: taskError,
    refetch,
  } = useQuery<TreeRes[]>({
    queryKey: ["treesTask"],
    queryFn: () => fetchTreeTask(),
  });

  const {
    data: treesStaff = [],
    isLoading: staffLoading,
    isError: staffError,
  } = useQuery<TreeRes[]>({
    queryKey: ["treesStaff"],
    queryFn: () => fetchTree(),
  });

  const {
    data: trees = [],
    isLoading,
    isError,
  } = useQuery<TreeRes[]>({
    queryKey: ["trees"],
    queryFn: () => getAllTree().then((res) => res.data),
  });

  const handleLogout = () => {
    dispatch(removeAuth());
  };

  const render = (
    <div className="mx-auto min-h-screen flex flex-col bg-green-200">
      <div className="container mx-auto flex-grow mb-5">
        <header className="p-5 bg-green-100 mb-5 rounded-lg flex items-center justify-between">
          <a href="/">
            <img className="w-52 cursor-pointer" src={logo} alt="Logo" />
          </a>
          {user === null ? (
            <a href="/login">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
                Login
              </button>
            </a>
          ) : (
            <>
              <div className="hidden md:flex items-center space-x-4">
                <a href="/dashboard">
                  <button className="px-4 py-2 rounded hover:shadow-md group border-b">
                    <CategoryIcon className="group-hover:text-green-500 transition-colors duration-300" />
                    <span className="ml-2 group-hover:text-green-500 transition-colors duration-300">
                      Dashboard
                    </span>
                  </button>
                </a>
                <button
                  className="px-4 py-2 rounded hover:shadow-md group border-b"
                  onClick={handleLogout}
                >
                  <LogoutIcon className="group-hover:text-green-500 transition-colors duration-300" />
                  <span className="ml-2 group-hover:text-green-500 transition-colors duration-300">
                    Logout
                  </span>
                </button>
              </div>
              <div className="flex flex-row items-start">
                <div>
                  <h2 className="font-bold text-lg">{user.fullName}</h2>
                  <h2 className="text-base">{getUserRoleName(user.role)}</h2>
                </div>
                <IconButton
                  onClick={handleClick}
                  size="large"
                  disabled={!isSmallScreen}
                  sx={{ pointerEvents: !isSmallScreen ? "none" : "auto" }}
                >
                  <Avatar
                    alt="avatar"
                    src={`http://localhost:2024/images/${user.avatar}`}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      width: "150px",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <a href="/dashboard" className="flex items-center">
                      <CategoryIcon className="mr-2" />
                      Dashboard
                    </a>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                  >
                    <LogoutIcon className="mr-2" />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}
        </header>
        {user?.role === 2 ? (
          <TreeMapStaff
            initialTrees={treesStaff}
            taskTrees={treesTask}
            handleFetch={refetch}
            areaCenter={[11.052829, 106.666128]} // Center of EIU
            areaSize={[0.007, 0.007]} // Approximately 11km x 11km at this latitude
            minZoom={17}
            maxZoom={18}
          />
        ) : user?.role === 1 ? (
          <TreeMapManager
            initialTrees={trees.filter((t) =>
              t.assignments?.length ? false : true
            )}
            taskTrees={trees.filter((t) =>
              t.assignments?.length ? true : false
            )}
            areaCenter={[11.052829, 106.666128]} // Center of EIU
            areaSize={[0.007, 0.007]} // Approximately 11km x 11km at this latitude
            minZoom={17}
            maxZoom={18}
          />
        ) : (
          <TreeMap
            initialTrees={trees}
            areaCenter={[11.052829, 106.666128]} // Center of EIU
            areaSize={[0.007, 0.007]} // Approximately 11km x 11km at this latitude
            minZoom={17}
            maxZoom={18}
          />
        )}
      </div>
      <footer className="container mx-auto p-5 bg-green-100 rounded-t-lg">
        <div className="mx-auto flex flex-col md:flex-row">
          <div className="text-left">
            <img className="w-52" src={logo} alt="Logo" />
            <h1 className="font-bold text-lg">
              Trees Management System for Eastern International University
            </h1>
            <p>
              <span className="font-bold">Address: </span>Nam kỳ khởi nghĩa,
              Thành phố mới, Bình Dương
            </p>
            <p>
              <span className="font-bold">Email: </span>EIU@edu.vn
            </p>
            <p>
              <span className="font-bold">Tel: </span>0123456789
            </p>
          </div>
        </div>
        <hr className="my-2" />
        <p className="text-sm">
          © 2024 Trees Management System. All rights reserved.
        </p>
      </footer>
    </div>
  );

  return (
    <>
      {isLoading || staffLoading || taskLoading ? (
        <Loading />
      ) : isError || staffError || taskError ? (
        <div>Error, please try again</div>
      ) : (
        render
      )}
    </>
  );
};

export default Home;
