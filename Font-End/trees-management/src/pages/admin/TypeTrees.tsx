import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ColTable } from "../../interfaces/ColTable";
import { useToast } from "../../components/Toastify";
import { useState } from "react";
import { TypeTreeRes } from "../../interfaces/Response/TypeTree/TypeTreeRes";
import {
  createTypeTree,
  getAllTypeTree,
  softDeleteTypeTree,
} from "../../services/TypeTreeApi";
import { TypeTreeReq } from "../../interfaces/Request/TypeTree/TypeTreeReq";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import EditTypeTreeDialogForm from "../../components/EditTypeTreeDialogForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const TypeTrees = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { showToast } = useToast();

  const columns: ColTable[] = [{ title: "Type", map: "name" }];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    data: types = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<TypeTreeRes[]>({
    queryKey: ["types"],
    queryFn: () => getAllTypeTree().then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const { mutate: createMutate } = useMutation({
    mutationFn: async (typeTreeReq: TypeTreeReq) =>
      await createTypeTree(typeTreeReq, token),
    onSuccess: async (data) => {
      if (data.isSuccess) {
        await queryClient.invalidateQueries({ queryKey: ["types"] });
        showToast("Successful!", "success");
        setName("");
      } else {
        showToast(data.message, "error");
      }
    },
    onError: (error) => {
      showToast(error.message || "Failed to delete type", "error");
    },
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const typeTreeReq: TypeTreeReq = {
      name: name,
    };
    createMutate(typeTreeReq);
    handleClose();
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (typeId: string) =>
      await softDeleteTypeTree(typeId, token),
    onSuccess: async (data) => {
      if (data.isSuccess) {
        await queryClient.invalidateQueries({ queryKey: ["types"] });
        showToast("Successful!", "success");
      } else {
        showToast(data.message, "error");
      }
    },
    onError: (error) => {
      showToast(error.message || "Failed to delete type", "error");
    },
  });

  const removeDiacritics = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(removeDiacritics(event.target.value));
  };

  const filteredData = types.filter((row) => {
    return columns.some((column) => {
      const value = row[column.map as keyof TypeTreeRes];
      const cleanValue = value
        ? removeDiacritics(value.toString()).toLowerCase()
        : "";
      return value ? cleanValue.includes(searchTerm.toLowerCase()) : false;
    });
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
        <h1 className="text-2xl font-bold">Type Tree Management</h1>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add new type
        </Button>
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleFormSubmit,
          }}
        >
          <DialogTitle>Add new type</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Type name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Dialog>
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
            border: "1px solid grey",
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
                    style={{ backgroundColor: "#F3F4F6", fontWeight: "bold" }}
                    className="uppercase"
                    align="center"
                  >
                    {column.title}
                  </TableCell>
                ))}
                <TableCell
                  style={{ backgroundColor: "#F3F4F6", fontWeight: "bold" }}
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
                        value = row[column.map as keyof TypeTreeRes];

                        return (
                          <TableCell key={column.map} align="center">
                            <div className="flex justify-center items-center">
                              {value ? value.toString() : "-"}
                            </div>
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <EditTypeTreeDialogForm
                          type={row}
                          handleFetch={refetch}
                        />
                        <DeleteConfirm
                          handleDelete={() => deleteMutate(row.id)}
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

export default TypeTrees;
