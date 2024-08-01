import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { asideItems } from "../common/asideItems";

const DashboardSidebar = () => {
  const isMdScreen = useMediaQuery("(min-width: 1080px)");
  const [expanded, setExpanded] = useState(isMdScreen);

  let pathname = useLocation().pathname;
  function activeFunct(type: string) {
    let classes =
      "flex items-center text-lg font-mono cursor-pointer p-2 hover:bg-white rounded-md";
    if (type !== "") {
      type = "/dashboard/" + type;
    } else {
      type = "/dashboard";
    }

    if (type === pathname) {
      classes += " bg-white";
    }
    return classes;
  }

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (!isMdScreen) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [isMdScreen]);

  return (
    <aside className={`border-r relative ease-in-out duration-500 ${expanded ? "w-80" : "w-20"}`}>
      <nav className="flex h-full flex-col bg-green-200 shadow-sm p-5">
        <div className="flex justify-center items-center pb-5">
          <img
            className={`overflow-hidden ease-in-out duration-500 ${
              expanded ? "w-52" : "w-0"
            }`}
            src={logo}
            alt="Logo"
          />
          <button
            onClick={() => handleExpanded()}
            className="absolute top-3 right-[-15px] cursor-pointer rounded-full bg-white hover:bg-gray-100"
          >
            {expanded ? (
              <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 30 }} />
            ) : (
              <KeyboardDoubleArrowRightIcon sx={{ fontSize: 30 }} />
            )}
          </button>
        </div>
        <div className="space-y-5">
          {asideItems.map((items, index) => (
            <Link
              key={index}
              to={items.link}
              className={activeFunct(items.link)}
            >
              {items.icon}
              <span
                className={`overflow-hidden ease-in-out duration-500 ${
                  expanded ? "ml-2" : "ml-0 w-0"
                }`}
              >
                {items.title}
              </span>
            </Link>
          ))}
        </div>

        <Link
          to={"/"}
          className="flex items-center text-lg font-mono cursor-pointer p-2 hover:bg-white rounded-md mt-auto"
        >
          <LogoutIcon />
          <span
            className={`overflow-hidden ease-in-out duration-500 ${
              expanded ? "ml-2 " : "ml-0 w-0"
            }`}
          >
            Logout
          </span>
        </Link>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
