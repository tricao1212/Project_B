import { useState } from "react";
import { TreeRes } from "../../interfaces/Response/Tree/TreeRes";
import { getAllTree } from "../../services/TreeApi";
import Loading from "../../components/Loading";
import { ColTable } from "../../interfaces/ColTable";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TreeAssignment } from "../../interfaces/Response/Tree/TreeAssignment";
import TreeDetails from "./TreeDetails";

const TreesStaff = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [treeTask, setTreeTask] = useState<number>();
  const { user } = useSelector((state: RootState) => state.auth);

  const columns: ColTable[] = [
    { title: "Image", map: "image" },
    { title: "Name", map: "name" },
    { title: "Tree Code", map: "treeCode" },
    { title: "Type", map: "typeTree" },
    { title: "Height", map: "heigh" },
    { title: "Plant Year", map: "plantYear" },
  ];

  const fetchTree = async () => {
    const res = (await getAllTree()).data;
    const treesWithAssignments = res.filter((tree: TreeRes) => 
      tree.assignments.some((assignment: TreeAssignment) => assignment.userId === user?.id)
    );
    setTreeTask(treesWithAssignments.length);
    return res;
  };

  const {
    data: trees = [],
    isLoading: treeLoading,
    isError: treeError,
  } = useQuery<TreeRes[]>({
    queryKey: ["trees"],
    queryFn: () => fetchTree(),
  });

  const removeDiacritics = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(removeDiacritics(event.target.value));
  };

  const handleFilter = (type: string) => {
    setFilterType(type);
    setPage(0); // Reset page when filter changes
  };

  const filteredData = trees.filter((row) => {
    const searchValue = removeDiacritics(
      `${row.name} ${row.treeCode} ${row.age} ${row.heigh} ${row.diameter} ${row.plantYear} ${row.typeTree} `
    ).toLowerCase();
    const matchesSearchTerm = searchValue.includes(searchTerm);
    const matchesFilterType =
      filterType === "all" ||
      (filterType === "haveTask" && 
        row.assignments.some((assignment: TreeAssignment) => assignment.userId === user?.id))
      
        
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
        <h1 className="text-2xl font-bold">List Trees</h1>
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
            All trees{" "}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-300 text-white text-sm">
              {trees.length}
            </span>
          </Button>
          <Button
            sx={{
              backgroundColor:
                filterType === "haveTask" ? "yellow" : "transparent",
              color: filterType === "haveTask" ? "black" : "inherit",
              border: "1px solid",
              borderColor: "currentColor",
              borderRadius: "0.25rem",
              "&:hover": {
                backgroundColor:
                  filterType === "haveTask" ? "darkyellow" : "transparent",
              },
              display: "flex",
              alignItems: "center",
              gap: "0.5rem", // Consistent spacing between text and the counter
            }}
            size="small"
            onClick={() => handleFilter("haveTask")}
          >
            Trees have task{" "}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-300 text-white text-sm">
              {treeTask}
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
                  Details
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
                        column.map == "heigh"
                          ? (value = row[column.map as keyof TreeRes] + " cm")
                          : (value = row[column.map as keyof TreeRes]);
                        return (
                          <TableCell key={column.map} align="center">
                            <div className="flex justify-center items-center">
                              {column.map === "image" ? (
                                <img
                                  src={
                                    value
                                      ? `http://localhost:2024/images/${value}`
                                      : ""
                                  }
                                  alt={`${value} image`}
                                  className="w-36 h-20 rounded"
                                />
                              ) : value ? (
                                value.toString()
                              ) : (
                                "-"
                              )}
                            </div>
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <TreeDetails tree={row} assignments={row.assignments} />
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

  if (treeLoading) return <Loading />;
  if (treeError) return <div>Error loading data</div>;

  return <>{render}</>;
};

export default TreesStaff;
