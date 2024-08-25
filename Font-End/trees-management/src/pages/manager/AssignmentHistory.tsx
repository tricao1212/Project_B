import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ColTable } from "../../interfaces/ColTable";
import { useToast } from "../../components/Toastify";
import { useState } from "react";
import { deleteAssignment, getHistory } from "../../services/AssignmentApi";
import {
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { AssignmentRes } from "../../interfaces/Response/Assignment/AssignmentRes";
import DeleteConfirm from "../../components/DeleteConfirm";
import AddAssignmentDialogForm from "../../components/AddAssignmentDialogForm";
import { TreeRes } from "../../interfaces/Response/Tree/TreeRes";
import { UserRes } from "../../interfaces/Response/User/UserRes";
import { getAllUser } from "../../services/UserApi";
import { getAllTree } from "../../services/TreeApi";
import { WorkContentRes } from "../../interfaces/Response/WorkContent/WorkContentRes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { formatDateOnly, formatDateTime } from "../../utils/formatDate";

type IdToNameMap = Map<string, string>;

const AssignmentsManager = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { showToast } = useToast();
  const [usernames, setUsernames] = useState<Map<string, string>>(new Map());
  const [treenames, setTreenames] = useState<Map<string, string>>(new Map());
  const now = Date.now();

  const columns: ColTable[] = [
    { title: "Tree", map: "treeId" },
    { title: "Staff", map: "userId" },
    { title: "Created By", map: "createdBy" },
    { title: "List works", map: "workContent" },
    { title: "Created At", map: "createdAt" },
    // { title: "Due", map: "deadLine" },
    { title: "Finished At", map: "finishedAt" },
    { title: "Confirmed At", map: "updatedAt" },
  ];

  const fetchTrees = async () => {
    const res = await getAllTree();
    const treeMap: IdToNameMap = new Map(
      res.data.map((tree: TreeRes) => [
        tree.id,
        tree.name + " " + "(" + tree.treeCode + ")",
      ])
    );
    setTreenames(treeMap);
    return res.data;
  };

  const fecthUsers = async () => {
    const res = await getAllUser(token);
    const userMap: IdToNameMap = new Map(
      res.data.map((user: UserRes) => [user.id, user.fullName])
    );
    setUsernames(userMap);
    return res.data;
  };

  const {
    data: assignments = [],
    isLoading: assignmentLoading,
    isError: assignmentError,
    refetch,
  } = useQuery<AssignmentRes[]>({
    queryKey: ["assignments"],
    queryFn: () => getHistory(token).then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (assignmentId: string) =>
      await deleteAssignment(assignmentId, token),
    onSuccess: async (data) => {
      if (data.isSuccess) {
        await queryClient.invalidateQueries({ queryKey: ["assignments"] });
        showToast("Successful!", "success");
      } else {
        showToast(data.message, "error");
      }
    },
    onError: (error) => {
      showToast(error.message || "Failed to delete assignment", "error");
    },
  });

  const {
    data: trees = [],
    isLoading: treeLoading,
    isError: treeError,
  } = useQuery<TreeRes[]>({
    queryKey: ["trees"],
    queryFn: () => fetchTrees(),
  });

  const {
    data: users = [],
    isLoading: userLoading,
    isError: userError,
  } = useQuery<UserRes[]>({
    queryKey: ["users"],
    queryFn: () => fecthUsers(),
  });

  const removeDiacritics = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    const cleanedSearchTerm = removeDiacritics(searchValue).toLowerCase();
    setSearchTerm(cleanedSearchTerm);
  };

  const filteredData = assignments.filter((row) => {
    const treeName = treenames.get(row.treeId);
    const userName = usernames.get(row.userId);
    const content = (row.workContent || []).map((wc) => wc.content).join(" ");

    const searchValue = removeDiacritics(
      `${treeName} ${userName} ${content} ${row.createdBy}`
    ).toLowerCase();

    // Filter based on search term and filter type
    const matchesSearchTerm = searchValue.includes(searchTerm);

    return matchesSearchTerm;
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const render = (
    <div className="container mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Tasks History</h1>
        <AddAssignmentDialogForm
          trees={trees}
          users={users}
          handleFecth={refetch}
        />
      </div>
      <div>
        <div className="mx-auto mb-4">
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </div>
        <TableContainer
          sx={{
            maxHeight: 500,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            className="justify-center items-center flex"
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.title}
                    style={{ backgroundColor: "#BBF7D0", fontWeight: "bold" }}
                    className="uppercase"
                    align="center"
                  >
                    {column.title}
                  </TableCell>
                ))}
                <TableCell
                  style={{ backgroundColor: "#BBF7D0", fontWeight: "bold" }}
                  align="center"
                  className="uppercase"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowindex) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={rowindex}
                    >
                      {columns.map((column) => {
                        let value;

                        if (column.map === "workContent") {
                          value = row[
                            column.map as keyof AssignmentRes
                          ] as WorkContentRes[];
                        } else if (column.map === "treeId") {
                          value = treenames.get(
                            row[column.map as keyof AssignmentRes] as string
                          );
                        } else if (column.map === "userId") {
                          value = usernames.get(
                            row[column.map as keyof AssignmentRes] as string
                          );
                        } else if (column.map === "createdAt") {
                          value = formatDateTime(
                            new Date(
                              row[column.map as keyof AssignmentRes] as Date
                            )
                          );
                        } else if (column.map === "deadLine") {
                          value = formatDateTime(
                            new Date(
                              row[column.map as keyof AssignmentRes] as Date
                            )
                          );
                        } else if (column.map === "updatedAt") {
                          value = formatDateTime(
                            new Date(
                              row[column.map as keyof AssignmentRes] as Date
                            )
                          );
                        } else if (column.map === "finishedAt") {
                          value = formatDateTime(
                            new Date(
                              row[column.map as keyof AssignmentRes] as Date
                            )
                          );
                        } else {
                          value = row[column.map as keyof AssignmentRes];
                        }

                        return (
                          <TableCell key={column.map} align="center">
                            <div className="flex justify-center items-center">
                              {column.map === "workContent" ? (
                                <div className="text-left">
                                  {(value as WorkContentRes[]).map(
                                    (item, index) => (
                                      <div key={index} className="mb-1">
                                        {index + 1}. {item.content}{" "}
                                        {item.status === 0 ? (
                                          <span>onProgress</span>
                                        ) : (
                                          <span className="text-green-500 bg-green-200 rounded-xl p-1 px-2">
                                            Finished
                                          </span>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              ) : value ? (
                                column.map === "deadLine" ? (
                                  <span
                                    className={
                                      new Date((value as Date)).getTime() < now
                                        ? "text-red-500"
                                        : "text-blue-500"
                                    }
                                  >
                                    {formatDateOnly(value as Date)}
                                  </span>
                                ) : (
                                  value.toString()
                                )
                              ) : (
                                "-"
                              )}
                            </div>
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <DeleteConfirm
                          handleDelete={() => mutation.mutate(row.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
  if (userLoading || treeLoading || assignmentLoading) return <Loading />;
  if (userError || treeError || assignmentError)
    return <div>Error loading data</div>;

  return <>{render}</>;
};

export default AssignmentsManager;
