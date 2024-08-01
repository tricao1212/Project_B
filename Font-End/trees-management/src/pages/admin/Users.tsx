import { useEffect, useState } from "react";
import { IUserRes } from "../../interfaces/Response/IUserRes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getAllUserService } from "../../services/Users/getAllUserService";
import Loading from "../../components/Loading";

const Users = () => {
  const [users, setUsers] = useState<IUserRes[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof IUserRes>('userName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const { token } = useSelector((state: RootState) => state.auth);

  // Mock data - replace this with your actual data fetching logic
  useEffect(() => {
    const users = async () => {
      const res = await getAllUserService(token);
      setUsers(res.data);
    };
    users();
  }, []);

  // Search functionality
  const filteredUsers = users.filter(user =>
    Object.values(user).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sorting functionality
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
  
    if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? -1 : 1;
    if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? 1 : -1;
  
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
  
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (column: keyof IUserRes) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const render = (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>
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
            {['avatar','user name', 'name', 'dob', 'phone', 'role'].map((column) => (
              <th
                key={column}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(column as keyof IUserRes)}
              >
                {column}
                {sortColumn === column && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <tr key={user.userName} className="bg-white sm:hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 sm:table-cell">{user.avatar}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{user.userName}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{user.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{user.dob}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{user.role === 1? "staff" : "manager"}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {Array.from({ length: Math.ceil(sortedUsers.length / usersPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
    {users ? render : <Loading/>}
    </>
  )
}

export default Users
