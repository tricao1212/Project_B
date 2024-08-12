import TreeMap from "../../components/TreeMap";
import { TreeRes } from "../../interfaces/Response/Tree/TreeRes";
import { getAllTree } from "../../services/TreeApi";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const Map = () => {
  const {
    data: trees = [],
    isLoading,
    isError,
  } = useQuery<TreeRes[]>({
    queryKey: ["trees"],
    queryFn: () => getAllTree().then((res) => res.data),
  });

  const render = (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Trees Map</h1>
      <TreeMap
        initialTrees={trees}
        areaCenter={[11.052829, 106.666128]} // Center of EIU
        areaSize={[0.01, 0.01]} // Approximately 11km x 11km at this latitude
        minZoom={17}
        maxZoom={18}
      />
    </div>
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Error, please try again</div>
      ) : (
        render
      )}
    </>
  );
};

export default Map;
