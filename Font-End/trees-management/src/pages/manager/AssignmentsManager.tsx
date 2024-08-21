import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ColTable } from "../../interfaces/ColTable";
import { useToast } from "../../components/Toastify";
import { useState } from "react";
import {
  deleteAssignment,
  getAllAssignment,
  softDeleteAssignment,
} from "../../services/AssignmentApi";
import {
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
} from "@mui/material";
import { AssignmentRes } from "../../interfaces/Response/Assignment/AssignmentRes";
import DeleteConfirm from "../../components/DeleteConfirm";
import AddAssignmentDialogForm from "../../components/AddAssignmentDialogForm";
import { TreeRes } from "../../interfaces/Response/Tree/TreeRes";
import { UserRes } from "../../interfaces/Response/User/UserRes";
import { getAllUser } from "../../services/UserApi";
import { getAllTree } from "../../services/TreeApi";
import { WorkContentRes } from "../../interfaces/Response/WorkContent/WorkContentRes";
import EditAssignmentForm from "../../components/EditAssignmentForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { formatDateOnly, formatDateTime } from "../../utils/formatDate";
import ConfirmAssignment from "../../components/ConfirmAssignment";

type IdToNameMap = Map<string, string>;

const AssignmentsManager = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { showToast } = useToast();
  const [usernames, setUsernames] = useState<Map<string, string>>(new Map());
  const [treenames, setTreenames] = useState<Map<string, string>>(new Map());
  const [filterType, setFilterType] = useState<string>("all");
  const [onProgress, setOnProgress] = useState<number>();
  const [finished, setFinished] = useState<number>();
  const [outDate, setOutDate] = useState<number>();
  const now = Date.now();

  const columns: ColTable[] = [
    { title: "Tree", map: "treeId" },
    { title: "Staff", map: "userId" },
    { title: "Created By", map: "createdBy" },
    { title: "List works", map: "workContent" },
    { title: "Created At", map: "createdAt" },
    { title: "Progress", map: "progress" },
    { title: "Deadline", map: "deadLine" },
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

  const fetchAssignment = async () => {
    try {
      const res = (await getAllAssignment()).data;

      const temp = res.filter((p: AssignmentRes) => {
        const a = p.isRequest === false;
        const b = new Date(p.deadLine).getTime() > now ? true : false;
        return a && b;
      });

      const onPro = temp.filter((p: AssignmentRes) => {
        const a = p.workContent.some((item) => {
          return item.status === 0 ? true : false;
        });
        return a;
      });

      const fineshed = res.filter((p: AssignmentRes) => {
        const a = p.isRequest === true;
        const b = new Date(p.deadLine).getTime() > now ? true : false;
        return a && b;
      });

      setOnProgress(onPro.length);
      setFinished(fineshed.length);
      setOutDate(res.length - temp.length);
      return res;
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
      throw error; // This will trigger the error state in the query
    }
  };

  const {
    data: assignments = [],
    isLoading: assignmentLoading,
    isError: assignmentError,
    refetch,
  } = useQuery<AssignmentRes[]>({
    queryKey: ["assignments"],
    queryFn: () => fetchAssignment(),
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

  const handleConfirm = async (assignment: AssignmentRes) => {
    const res = await softDeleteAssignment(assignment.id, token);
    return res;
  };

  const { mutate: confirmTation } = useMutation({
    mutationFn: handleConfirm,
    onSuccess: async (data) => {
      if (data.isSuccess) {
        await queryClient.invalidateQueries({ queryKey: ["assignments"] });
        showToast("Successful!", "success");
      } else {
        showToast(data.message, "error");
      }
    },
    onError: (error) => {
      showToast(error.message || "Failed to confirm assignment", "error");
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

  const handleFilter = (type: string) => {
    setFilterType(type);
    setPage(0); // Reset page when filter changes
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
    const matchesFilterType =
      filterType === "all" ||
      (filterType === "onprogress" &&
        (new Date(row.deadLine).getTime() > now
          ? row.workContent.some((wc) => wc.status === 0) &&
            row.isRequest === false
          : false)) ||
      (filterType === "finished" &&
        row.isRequest &&
        row.workContent.every((wc) => wc.status === 1)) ||
      (filterType === "outDate" &&
        row.isRequest === false &&
        new Date(row.deadLine).getTime() < now);

    return matchesSearchTerm && matchesFilterType;
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
        <h1 className="text-2xl font-bold">Assignments Management</h1>
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
        <div className="flex flex-col lg:flex-row space-y-2 lg:space-x-2 my-5">
          <div></div>
          <Button
            sx={{
              backgroundColor: filterType === "all" ? "yellow" : "transparent",
              color: filterType === "all" ? "black" : "inherit",
              border: "1px solid",
              borderColor: "currentColor",
              borderRadius: "0.25rem",
              "&:hover": {
                backgroundColor:
                  filterType === "all" ? "darkyellow" : "transparent",
              },
              display: "flex",
              alignItems: "center",
              gap: "0.5rem", // Consistent spacing between text and the counter
            }}
            size="small"
            onClick={() => handleFilter("all")}
          >
            All Assignments{" "}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-300 text-white text-sm">
              {assignments.length}
            </span>
          </Button>
          <Button
            sx={{
              backgroundColor:
                filterType === "onprogress" ? "yellow" : "transparent",
              color: filterType === "onprogress" ? "black" : "inherit",
              border: "1px solid",
              borderColor: "currentColor",
              borderRadius: "0.25rem",
              "&:hover": {
                backgroundColor:
                  filterType === "onprogress" ? "darkyellow" : "transparent",
              },
              display: "flex",
              alignItems: "center",
              gap: "0.5rem", // Consistent spacing between text and the counter
            }}
            size="small"
            onClick={() => handleFilter("onprogress")}
          >
            Assignments On Progress{" "}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-300 text-white text-sm">
              {onProgress}
            </span>
          </Button>
          <Button
            sx={{
              backgroundColor:
                filterType === "finished" ? "yellow" : "transparent",
              color: filterType === "finished" ? "black" : "inherit",
              border: "1px solid",
              borderColor: "currentColor",
              borderRadius: "0.25rem",
              "&:hover": {
                backgroundColor:
                  filterType === "finished" ? "darkyellow" : "transparent",
              },
              display: "flex",
              alignItems: "center",
              gap: "0.5rem", // Consistent spacing between text and the counter
            }}
            size="small"
            onClick={() => handleFilter("finished")}
          >
            Assignments Finished{" "}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-300 text-white text-sm">
              {finished}
            </span>
          </Button>
          <Button
            sx={{
              backgroundColor:
                filterType === "outDate" ? "yellow" : "transparent",
              color: filterType === "outDate" ? "black" : "inherit",
              border: "1px solid",
              borderColor: "currentColor",
              borderRadius: "0.25rem",
              "&:hover": {
                backgroundColor:
                  filterType === "outDate" ? "darkyellow" : "transparent",
              },
              display: "flex",
              alignItems: "center",
              gap: "0.5rem", // Consistent spacing between text and the counter
            }}
            size="small"
            onClick={() => handleFilter("outDate")}
          >
            Overdue Assignments{" "}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-sm">
              {outDate}
            </span>
          </Button>
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
                          value = new Date(
                            row[column.map as keyof AssignmentRes] as string
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
                                          <span
                                            className={`${
                                              filterType === "outDate"
                                                ? "text-red-500 bg-red-300 rounded-xl p-1 px-2"
                                                : "text-blue-500 bg-blue-200 rounded-xl p-1 px-2"
                                            }`}
                                          >
                                            onProgress
                                          </span>
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
                                      (value as Date).getTime() < now
                                        ? "text-red-500"
                                        : "text-blue-500"
                                    }
                                  >
                                    {formatDateOnly(value as Date)}
                                  </span>
                                ) : column.map === "progress" ? (
                                  value + "%"
                                ) : (
                                  value.toString()
                                )
                              ) : column.map === "progress" ? (
                                "0%"
                              ) : (
                                "-"
                              )}
                            </div>
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <EditAssignmentForm
                          assignment={row}
                          trees={trees}
                          users={users}
                          handleFecth={refetch}
                        />
                        <DeleteConfirm
                          handleDelete={() => mutation.mutate(row.id)}
                        />
                        {filterType === "finished" ? (
                          <ConfirmAssignment
                            handleConfirm={() => confirmTation(row)}
                          />
                        ) : (
                          ""
                        )}
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
