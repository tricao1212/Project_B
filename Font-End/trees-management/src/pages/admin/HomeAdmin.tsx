import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getAllUser } from "../../services/UserApi";
import { getAllTree } from "../../services/TreeApi";
import { getAllTypeTree } from "../../services/TypeTreeApi";
import { UserRes } from "../../interfaces/Response/User/UserRes";
import { TreeRes } from "../../interfaces/Response/Tree/TreeRes";
import { TypeTreeRes } from "../../interfaces/Response/TypeTree/TypeTreeRes";
import Loading from "../../components/Loading";
import PeopleIcon from "@mui/icons-material/People";
import ForestIcon from "@mui/icons-material/Forest";
import GrassIcon from "@mui/icons-material/Grass";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const HomeAdmin = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [totalPlantThisYear, setTotalPlantThisYear] = useState<TreeRes[]>([]);
  const currentYear = new Date().getFullYear();

  const fetchAndCalTrees = async () => {
    const res = (await getAllTree()).data;
    setTotalPlantThisYear(
      res.filter((x: TreeRes) => x.plantYear == currentYear)
    );
    return res;
  };

  const {
    data: users = [],
    isLoading: userLoading,
    isError: userError,
  } = useQuery<UserRes[]>({
    queryKey: ["users"],
    queryFn: () => getAllUser(token).then((res) => res.data),
  });

  const {
    data: trees = [],
    isLoading: treeLoading,
    isError: treeError,
  } = useQuery<TreeRes[]>({
    queryKey: ["trees"],
    queryFn: fetchAndCalTrees,
  });

  const {
    data: types = [],
    isLoading: typesLoading,
    isError: typesError,
  } = useQuery<TypeTreeRes[]>({
    queryKey: ["types"],
    queryFn: () => getAllTypeTree().then((res) => res.data),
  });

  if (userLoading || treeLoading || typesLoading) return <Loading />;
  if (userError || treeError || typesError)
    return <div>Error loading data</div>;

  const render = (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Users:</h2>
          <PeopleIcon style={{ color: "green", fontSize: "40px" }} />
          <p>
            <span className="font-bold text-[25px]">{users.length} users</span>{" "}
            in system.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total trees:</h2>
          <ForestIcon style={{ color: "green", fontSize: "40px" }} />
          <p>
            <span className="font-bold text-[25px]">{trees.length} trees</span>{" "}
            in system.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total types:</h2>
          <ForestIcon style={{ color: "green", fontSize: "40px" }} />
          <p>
            <span className="font-bold text-[25px]">{types.length} types</span>{" "}
            in system.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            Total trees planted this year:
          </h2>
          <GrassIcon style={{ color: "green", fontSize: "40px" }} />
          <p>
            <span className="font-bold text-[25px]">
              {totalPlantThisYear.length} trees
            </span>{" "}
            planted this year.
          </p>
        </div>
      </div>
    </div>
  );

  return <>{render}</>;
};

export default HomeAdmin;
