import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getAllUser } from "../../services/UserApi";
import { UserRes } from "../../interfaces/Response/User/UserRes";
import Loading from "../../components/Loading";
import PeopleIcon from "@mui/icons-material/People";
import { useQuery } from "@tanstack/react-query";
import { AssignmentRes } from "../../interfaces/Response/Assignment/AssignmentRes";
import { getAllAssignment, getHistory } from "../../services/AssignmentApi";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState } from "react";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import { BarChart } from "@mui/x-charts/BarChart";
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

const HomeManager = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [onProgress, setOnProgress] = useState<number>(0);
  const [finished, setFinished] = useState<number>(0);
  const [overdue, setOverdue] = useState<number>(0);
  const now = Date.now();
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

    const overDue = res.filter((p: AssignmentRes) => {
      const temp1 = new Date(p.deadLine).getTime() < now;
      return temp1;
    });

    const fin = (await getHistory(token)).data;
    setOnProgress(onPro.length - overDue.length);
    setFinished(fin.length);
    setOverdue(overDue.length);
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

  //chart

  if (staffLoading || assignLoading) return <Loading />;
  if (staffError || assignError) return <div>Error loading data</div>;

  const render = (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-5">
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
          <h2 className="text-lg font-semibold mb-2">Total Tasks:</h2>
          <AssignmentIcon style={{ color: "orange", fontSize: "40px" }} />
          <p>
            <span className="font-bold text-[25px] text-orange-400">
              {assignments.length} tasks
            </span>{" "}
            in system.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            Total Tasks On Progress:
          </h2>
          <DataUsageIcon style={{ color: "blue", fontSize: "40px" }} />
          <p>
            <span className="font-bold text-[25px] text-blue-300">
              {onProgress} task
            </span>{" "}
            in system.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            Total Tasks Overdue:
          </h2>
          <AssignmentLateIcon
            style={{ color: "red", fontSize: "40px" }}
          />
          <p>
            <span className="font-bold text-[25px] text-red-500">
              {overdue} tasks
            </span>{" "}
            in system.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  mt-5">
        <div>
          <h1 className="text-2xl font-bold mb-4">Task statistics by staff:</h1>
          <BarChart
            height={300}
            yAxis={[
              {
                label: "Total taks",
              },
            ]}
            series={[
              {
                data: staffs.map((staff) =>
                  staff.assignments.reduce(
                    (total, assignment) =>
                      total +
                      assignment.workContent.filter((work) => work.status === 0)
                        .length,
                    0
                  )
                ),
                label: "on progress",
              },
              {
                data: staffs.map((staff) =>
                  staff.assignments.reduce(
                    (total, assignment) =>
                      total +
                      assignment.workContent.filter((work) => work.status === 1)
                        .length,
                    0
                  )
                ),
                label: "finished",
              },
            ]}
            xAxis={[{ data: staffs.map((x) => x.fullName), scaleType: "band" }]}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Assignments summary:</h1>
          <BarChart
            height={300}
            yAxis={[
              {
                label: "Total assignments",
              },
            ]}
            series={[
              {
                data: [onProgress, finished, overdue],
              },
            ]}
            xAxis={[
              {
                data: ["on progress", "finished", "overdue"],
                scaleType: "band",
              },
            ]}
          />
        </div>
      </div>
      <div>
        {/* <div>
          <h1 className="text-2xl font-bold mb-4">
            Statistics on job completion rate:
          </h1>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </div> */}
      </div>
    </div>
  );

  return <>{render}</>;
};

export default HomeManager;
