import DashboardSidebar from "../../components/AsideAdmin";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loading from "../../components/Loading";
import { getUserRoleName } from "../../utils/getUSerRole";
import { Avatar } from "@mui/material";
import { asideAdminItems } from "../../common/asideAdminItems";
import { asideManagerItems } from "../../common/asideManagerItems";
import { asideStaffItems } from "../../common/asideStaffItems";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const render = (
    <div className="flex h-screen">
      {user?.role === 0 ? (
        <DashboardSidebar asideItems={asideAdminItems} />
      ) : user?.role === 1 ? (
        <DashboardSidebar asideItems={asideManagerItems} />
      ) : (
        <DashboardSidebar asideItems={asideStaffItems} />
      )}
      <main className="w-full overflow-y-auto bg-[#F4FDFA]">
        <header className="mx-5 border-b-2 sticky top-0 z-50 bg-white p-5">
          <div className="flex flex-row justify-between">
            <div className="flex items-center">
              <a href="/">
                <button className="px-4 py-2 bg-green-100 rounded hover:bg-green-300">
                  Home page
                </button>
              </a>
            </div>
            <div className="flex flex-row">
              <div className="px-5">
                <h1 className="text-lg font-mono">
                  <p>{user?.fullName.toUpperCase()}</p>
                </h1>
                <p>{user ? getUserRoleName(user.role) : ""}</p>
              </div>
              <Avatar
                alt="avatar"
                src={`http://localhost:2024/images/${user?.avatar}`}
              />
            </div>
          </div>
        </header>
        <div className="p-5">
          <Outlet />
        </div>
      </main>
    </div>
  );

  return <>{user === null ? <Loading /> : render}</>;
};

export default Dashboard;
