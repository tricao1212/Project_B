import DashboardSidebar from "../../components/AsideAdmin";
import { Outlet } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loading from "../../components/Loading";
const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const render = (
    <div className="flex h-screen">
      <DashboardSidebar />
      <main className="w-full overflow-y-auto">
        <header className="mx-5 border-b-2 sticky top-0 z-50 bg-white p-5">
          <div className="flex flex-row justify-end">
            <div>
              <h1 className="text-lg font-mono">
                {user?.fullName.toUpperCase()}
              </h1>
              <p>manager</p>
            </div>
            <AccountBoxIcon sx={{ fontSize: 50 }} />
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
