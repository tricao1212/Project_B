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
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

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

  //charts
  const speciesList = types.map((t) => t.listTrees.length);
  const speciesListname = types.map((t) => t.name);
  const treeCountByYear = trees.reduce<Map<number, number>>((acc, tree) => {
    acc.set(tree.plantYear, (acc.get(tree.plantYear) || 0) + 1);
    return acc;
  }, new Map<number, number>());
  const year = [...treeCountByYear.keys()];
  year.sort((a, b) => a - b);
  const totalEachYear = year.map((x) => treeCountByYear.get(x) ?? 0);
  //
  
  if (userLoading || treeLoading || typesLoading) return <Loading />;
  if (userError || treeError || typesError)
    return <div>Error loading data</div>;

  const render = (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
            <span className="font-bold text-[25px] text-green-400">
              {trees.length} trees
            </span>{" "}
            in system.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total species:</h2>
          <ForestIcon style={{ color: "green", fontSize: "40px" }} />
          <p>
            <span className="font-bold text-[25px] text-orange-500">
              {types.length} species
            </span>{" "}
            in system.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            Total trees planted this year:
          </h2>
          <GrassIcon style={{ color: "green", fontSize: "40px" }} />
          <p>
            <span className="font-bold text-[25px] text-blue-400">
              {totalPlantThisYear.length} trees
            </span>{" "}
            planted this year.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  mt-5">
        <div>
        <h1 className="text-2xl font-bold mb-4">Total trees each specie:</h1>
          <BarChart
            height={300}
            yAxis={[
              {
                label: "Total trees",
              },
            ]}
            series={[{ data: speciesList }]}
            xAxis={[{ data: speciesListname, scaleType: "band" }]}
          />
        </div>
        <div>
        <h1 className="text-2xl font-bold mb-4">Total trees planted each year:</h1>
          <LineChart
            yAxis={[
              {
                label: "Total trees",
              },
            ]}
            xAxis={[
              {
                dataKey: "year",
                scaleType: 'band',
                valueFormatter: (value) => value.toString(),
                data: year,
              },
            ]}
            series={[
              {
                data: totalEachYear, label: 'Total trees planted'
              },
            ]}
            height={300}
          />
        </div>
      </div>
    </div>
  );

  return <>{render}</>;
};

export default HomeAdmin;
