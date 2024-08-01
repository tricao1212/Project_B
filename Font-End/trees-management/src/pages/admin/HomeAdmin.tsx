import { useEffect, useState } from "react";
import { getAllUserService } from "../../services/Users/getAllUserService";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { IUserRes } from "../../interfaces/Response/IUserRes";
import { getAll } from "../../services/TreeApi";
import { ITree } from "../../interfaces/Response/ITreeeRes";
import Loading from "../../components/Loading";

const HomeAdmin = () => {
  const [totalUsers, setTotalUsers] = useState<IUserRes[]>();
  const [totalTrees, setTotalTrees] = useState<ITree[]>();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const users = async () => {
      const res = await getAllUserService(token);
      setTotalUsers(res.data);
    };

    const trees = async () => {
      const res = await getAll();
      setTotalTrees(res.data);
    };

    users();
    trees();
  }, []);

  const render = (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Users:</h2>
          <p>{totalUsers?.length} users in system.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total trees:</h2>
          <p>{totalTrees?.length} trees in system.</p>
        </div>

      </div>
    </div>
  );

  return (
    <>
    {totalUsers === null && totalTrees === null ? <Loading/> : render}
    </>
  )
};

export default HomeAdmin;
