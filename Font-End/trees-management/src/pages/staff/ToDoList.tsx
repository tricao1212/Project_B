import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ColTable } from "../../interfaces/ColTable";
// import { useToast } from "../../components/Toastify";
import { useEffect, useState } from "react";
import { getAllAssignment } from "../../services/AssignmentApi";
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
import { TreeRes } from "../../interfaces/Response/Tree/TreeRes";
import { getAllTree } from "../../services/TreeApi";
import { WorkContentRes } from "../../interfaces/Response/WorkContent/WorkContentRes";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { formatDateOnly, formatDateTime } from "../../utils/formatDate";
import UpdateStatusTask from "../../components/UpdateStatusTask";
import SendRequestConfirm from "../../components/SendRequestConfirm";

type IdToNameMap = Map<string, string>;

const ToDoList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [treenames, setTreenames] = useState<Map<string, string>>(new Map());
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentTree, setCurrentTree] = useState<Map<string, string>>(
    new Map()
  );
  const now = Date.now();

  const columns: ColTable[] = [
    { title: "Tree", map: "treeId" },
    { title: "List works", map: "workContent" },
    { title: "Created By", map: "createdBy" },
    { title: "Created At", map: "createdAt" },
    { title: "Deadline", map: "deadLine" },
  ];

  const fecthTask = async () => {
    const res = (await getAllAssignment()).data;
    if (user) {
      const temp = res.filter((x: AssignmentRes) => x.userId === user.id);
      return temp;
    }
  };

  const {
    data: assignments = [],
    isLoading: assignmentLoading,
    isError: assignmentError,
    refetch,
  } = useQuery<AssignmentRes[]>({
    queryKey: ["assignments"],
    queryFn: () => fecthTask(),
  });

  const fetchTrees = async () => {
    const res = await getAllTree();
    const treeMap: IdToNameMap = new Map(
      res.data.map((tree: TreeRes) => [
        tree.id,
        tree.name + " " + "(" + tree.treeCode + ")",
      ])
    );
    const treeMap1: IdToNameMap = new Map(
      res.data.map((tree: TreeRes) => [tree.id, tree.image])
    );
    setTreenames(treeMap);
    setCurrentTree(treeMap1);
    return res.data;
  };

  useEffect(() => {
    fetchTrees();
  }, []);

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
    const content = (row.workContent || []).map((wc) => wc.content).join(" ");

    const searchValue = removeDiacritics(
      `${treeName} ${content}`
    ).toLowerCase();

    return searchValue.includes(searchTerm);
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
        <h1 className="text-2xl font-bold">To do list</h1>
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
                <TableCell
                  style={{ backgroundColor: "#BBF7D0", fontWeight: "bold" }}
                  align="center"
                  className="uppercase"
                >
                  Image
                </TableCell>
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
                      <TableCell align="center">
                        <div className="flex justify-center items-center">
                          <img
                            src={`http://localhost:2024/images/${currentTree.get(
                              row.treeId
                            )}`}
                            alt={`image`}
                            className="w-36 h-20 rounded"
                          />
                        </div>
                      </TableCell>
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
                        } else if (column.map === "createdAt") {
                          value = formatDateTime(
                            new Date(
                              row[column.map as keyof AssignmentRes] as string
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
                                          <span className="text-blue-500 bg-blue-200 rounded-xl p-1 px-2">
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
                        {new Date(row.deadLine).getTime() > now ? (
                          row.isRequest ? (
                            "waiting for confirmation"
                          ) : row.workContent.every((x) => x.status === 1) ? (
                            <SendRequestConfirm
                              assignmentId={row.id}
                              handleFetch={refetch}
                            />
                          ) : (
                            <UpdateStatusTask
                              assignment={row}
                              handleFetch={refetch}
                            />
                          )
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
  if (assignmentLoading) return <Loading />;
  if (assignmentError) return <div>Error loading data</div>;

  return <>{render}</>;
};

export default ToDoList;
