import { useEffect, useState } from "react";
import { ITree } from "../../interfaces/Response/ITreeeRes";
import { formatDate } from "../../utils/formatDate";
import AddTreeDialogForm from "../../components/AddTreeDialogForm";
import DeleteConfirm from "../../components/DeleteConfirm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useToast } from "../../components/Toastify";
import Loading from "../../components/Loading";
import { getAll, deleteTree } from "../../services/TreeApi";

const Trees = () => {
  const [trees, setTrees] = useState<ITree[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof ITree>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [treesPerPage] = useState(5);
  const { showToast } = useToast();
  const { token } = useSelector((state: RootState) => state.auth);

  const fecthTrees = async () => {
    const res = await getAll();
    setTrees(res.data);
  };

  const handleDelete = async (id: string) => {
    var res = await deleteTree(id, token);
    if (res.isSuccess === true) {
      await fecthTrees();
      showToast('Successful!', 'success');
    } else {
      showToast(`${res.message}`,'error');
    }
  };

  useEffect(() => {
    fecthTrees();
    console.log("fect");
  }, []);

  // Search functionality
  const filteredUsers = trees.filter((tree) =>
    Object.values(tree).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sorting functionality
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue === null || aValue === undefined)
      return sortDirection === "asc" ? -1 : 1;
    if (bValue === null || bValue === undefined)
      return sortDirection === "asc" ? 1 : -1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const indexOfLastUser = currentPage * treesPerPage;
  const indexOfFirstUser = indexOfLastUser - treesPerPage;
  const currenTrees = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (column: keyof ITree) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const render = (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Trees Management</h1>
        <AddTreeDialogForm handleFecth={() => fecthTrees()} />
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              {[
                "image",
                "name",
                "age",
                "heigh",
                "position",
                "description",
                "create at",
                "action",
              ].map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(column as keyof ITree)}
                >
                  {column}
                  {sortColumn === column && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currenTrees.map((tree, index) => (
              <tr key={index} className="bg-white sm:hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <img
                    src={`http://localhost:2024/images/${tree.image}`}
                    alt={`${tree.name} image`}
                    className="w-36 h-28"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {tree.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {tree.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {tree.heigh}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {tree.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {tree.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {formatDate(new Date(tree.createdAt))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <DeleteConfirm handleDelete={handleDelete} id={tree.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {Array.from(
          { length: Math.ceil(sortedUsers.length / treesPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );

  return (
    <>
      {trees ? render : <Loading/>}
    </>
  )
};

export default Trees;
