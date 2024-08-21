import { TreeRes } from "../../interfaces/Response/Tree/TreeRes";
import { getAllTree } from "../../services/TreeApi";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TreeMapStaff from "./TreeMapStaff";

const MapTasks = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const fetchTreeTask = async () => {
    const res = (await getAllTree()).data;
    const trees = res as TreeRes[];
    if (user) {
      const filteredTrees = trees.filter((tree: TreeRes) => {
        return tree.assignments?.some(
          (assignment) => assignment.userId === user.id
        );
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
        // Check if none of the assignments for this tree have the userId
        return !tree.assignments?.some(
          (assignment) => assignment.userId === user.id
        );
      });
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
    data: trees = [],
    isLoading,
    isError,
  } = useQuery<TreeRes[]>({
    queryKey: ["trees"],
    queryFn: () => fetchTree(),
  });

  const render = (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Trees Map</h1>
      <TreeMapStaff
        initialTrees={trees}
        taskTrees={treesTask}
        handleFetch={refetch}
        areaCenter={[11.052829, 106.666128]} // Center of EIU
        areaSize={[0.01, 0.01]} // Approximately 11km x 11km at this latitude
        minZoom={17}
        maxZoom={18}
      />
    </div>
  );

  return (
    <>
      {isLoading && taskLoading ? (
        <Loading />
      ) : isError && taskError ? (
        <div>Error, please try again</div>
      ) : (
        render
      )}
    </>
  );
};

export default MapTasks;
