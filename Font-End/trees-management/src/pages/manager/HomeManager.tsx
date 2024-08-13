import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getAllUser } from "../../services/UserApi";
import { UserRes } from "../../interfaces/Response/User/UserRes";
import Loading from "../../components/Loading";
import PeopleIcon from "@mui/icons-material/People";
import { useQuery } from "@tanstack/react-query";
import { AssignmentRes } from "../../interfaces/Response/Assignment/AssignmentRes";
import { getAllAssignment } from "../../services/AssignmentApi";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState } from "react";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DataUsageIcon from '@mui/icons-material/DataUsage';

const HomeManager = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [onProgress, setOnProgress] = useState<number>();
  const [finished, setFinished] = useState<number>();

  const fetchStaff = async () => {
    const res = (await getAllUser(token)).data;
    const temp = res.filter((staff: UserRes) => staff.role === 2);
    return temp;
  };

  const fetchAssignment = async () => {
    const res = (await getAllAssignment()).data;
    const onPro = res.filter((p: AssignmentRes) =>
      p.workContent.some((item) => {
        return item.status === 0 ? true : false;
      })
    );
    const fin = res.length - onPro.length;
    setOnProgress(onPro.length);
    setFinished(fin);
    return res;
  };

  const {
    data: staffs = [],
    isLoading: staffLoading,
    isError: staffError,
  } = useQuery<UserRes[]>({
    queryKey: ["staffs"],
    queryFn: () => fetchStaff(),
  });

  const {
    data: assignments = [],
    isLoading: assignLoading,
    isError: assignError,
  } = useQuery<AssignmentRes[]>({
    queryKey: ["assignments"],
    queryFn: () => fetchAssignment(),
  });

  if (staffLoading || assignLoading) return <Loading />;
  if (staffError || assignError) return <div>Error loading data</div>;

  const render = (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Staffs:</h2>
          <PeopleIcon style={{ color: "green", fontSize: "40px" }} />
          <p>
            <span className="font-bold text-[25px]">
              {staffs.length} staffs
            </span>{" "}
            in system.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Assignments:</h2>
          <AssignmentIcon style={{ color: "green", fontSize: "40px" }} />
          <p>
            <span className="font-bold text-[25px]">
              {assignments.length} assignments
            </span>{" "}
            in system.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            Total Assignments On Progress:
          </h2>
          <DataUsageIcon style={{ color: "green", fontSize: "40px" }} />
          <p>
            <span className="font-bold text-[25px]">
              {onProgress} assignments
            </span>{" "}
            in system.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            Total Assignments Finished:
          </h2>
          <AssignmentTurnedInIcon style={{ color: "green", fontSize: "40px" }} />
          <p>
            <span className="font-bold text-[25px]">
              {finished} assignments
            </span>{" "}
            in system.
          </p>
        </div>
      </div>
    </div>
  );

  return <>{render}</>;
};

export default HomeManager;
