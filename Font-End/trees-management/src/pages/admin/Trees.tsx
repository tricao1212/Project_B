import { useState } from "react";
import { TreeRes } from "../../interfaces/Response/Tree/TreeRes";
import { TypeTreeRes } from "../../interfaces/Response/TypeTree/TypeTreeRes";
import { getAllTree, softDeleteTree } from "../../services/TreeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getAllTypeTree } from "../../services/TypeTreeApi";
import AddTreeDialogForm from "../../components/AddTreeDialogForm";
import Loading from "../../components/Loading";
import { ColTable } from "../../interfaces/ColTable";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteConfirm from "../../components/DeleteConfirm";
import { useToast } from "../../components/Toastify";
import EditTreeDialogForm from "../../components/EditTreeDialogForm";
import TreeDetails from "../../components/TreeDetails";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Trees = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { showToast } = useToast();
  const [selectedType, setSelectedType] = useState<string>("");

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value as string);
  };

  const columns: ColTable[] = [
    { title: "Image", map: "image" },
    { title: "Name", map: "name" },
    { title: "Tree Code", map: "treeCode" },
    { title: "Specie", map: "typeTree" },
    { title: "Height", map: "heigh" },
    { title: "Plant Year", map: "plantYear" },
  ];

  const {
    data: trees = [],
    isLoading: treeLoading,
    isError: treeError,
  } = useQuery<TreeRes[]>({
    queryKey: ["trees"],
    queryFn: () => getAllTree().then((res) => res.data),
  });

  const {
    data: types = [],
    isLoading: typeLoading,
    isError: typeError,
  } = useQuery<TypeTreeRes[]>({
    queryKey: ["types"],
    queryFn: () => getAllTypeTree().then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (treeId: string) => await softDeleteTree(treeId, token),
    onSuccess: async (data) => {
      if (data.isSuccess) {
        await queryClient.invalidateQueries({ queryKey: ["trees"] });
        showToast("Successful!", "success");
      } else {
        showToast(data.message, "error");
      }
    },
    onError: (error) => {
      showToast(error.message || "Failed to delete tree", "error");
    },
  });

  const removeDiacritics = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(removeDiacritics(event.target.value));
  };

  const filteredData = trees.filter((row) => {
    const searchValue = removeDiacritics(
      `${row.name} ${row.treeCode} ${row.age} ${row.heigh} ${row.diameter} ${row.plantYear} ${row.typeTree} `
    ).toLowerCase();
    const matchesSearchTerm = searchValue.includes(searchTerm);
    const type = selectedType === "" ? true : selectedType === row.typeTree;
    return matchesSearchTerm && type;
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
        <h1 className="text-2xl font-bold">Trees Management</h1>
        <AddTreeDialogForm trees={trees} data={types} />
      </div>
      <div>
        <div className="mb-4 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FormControl sx={{ width: 300 }}>
            <InputLabel>Search by species</InputLabel>
            <Select
              value={selectedType}
              onChange={handleTypeChange}
              label="Selecet type tree"
              variant="outlined"
            >
              <MenuItem value="">-</MenuItem>
              {types.map((type) => (
                <MenuItem key={type.id} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <TableContainer
          sx={{
            maxHeight: "500px",
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
                        <TreeDetails
                          tree={row}
                          assignments={[]}
                        />
                        <EditTreeDialogForm
                          tree={row}
                          typeTreeOptions={types}
                        />
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

  if (typeLoading || treeLoading) return <Loading />;
  if (typeError || treeError) return <div>Error loading data</div>;

  return <>{render}</>;
};

export default Trees;
