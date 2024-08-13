import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { AssignmentRes } from "../../interfaces/Response/Assignment/AssignmentRes";
import { getAllAssignment } from "../../services/AssignmentApi";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState } from "react";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DataUsageIcon from "@mui/icons-material/DataUsage";

const HomeStaff = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [onProgress, setOnProgress] = useState<number>();
  const [finished, setFinished] = useState<number>();

  const fetchAssignment = async () => {
    const res = (await getAllAssignment()).data;

    if (user) {
      const temp = res.filter((p: AssignmentRes) => p.userId === user.id);

      const onPro = temp.filter((p: AssignmentRes) =>
        p.workContent.some((item) => {
          return item.status === 0 ? true : false;
        })
      );

      const fin = temp.length - onPro.length;
      setOnProgress(onPro.length);
      setFinished(fin);
      return temp;
    }
  };

  const {
    data: assignments = [],
    isLoading: assignLoading,
    isError: assignError,
  } = useQuery<AssignmentRes[]>({
    queryKey: ["assignments"],
    queryFn: () => fetchAssignment(),
  });

  if (assignLoading) return <Loading />;
  if (assignError) return <div>Error loading data</div>;

  const render = (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <AssignmentTurnedInIcon
            style={{ color: "green", fontSize: "40px" }}
          />
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

export default HomeStaff;
