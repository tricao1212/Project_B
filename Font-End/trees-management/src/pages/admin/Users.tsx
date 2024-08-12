import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loading from "../../components/Loading";
import { ColTable } from "../../interfaces/ColTable";
import {
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
import { UserRes } from "../../interfaces/Response/User/UserRes";
import { deleteUser, getAllUser } from "../../services/UserApi";
import AddUserDialogForm from "../../components/AddUserDialogForm";
import EditUserDialogForm from "../../components/EditUserDialogForm";
import { formatDateOnly } from "../../utils/formatDate";
import { getUserRoleName } from "../../utils/getUSerRole";
import { Role } from "../../interfaces/Enum/Role";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Users = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const { showToast } = useToast();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const columns: ColTable[] = [
    { title: "Avatar", map: "avatar" },
    { title: "Full Name", map: "fullName" },
    { title: "Phone", map: "phone" },
    { title: "Date Of Birth", map: "dob" },
    { title: "Role", map: "role" },
  ];
  
  const queryClient = useQueryClient();
  
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<UserRes[]>({
    queryKey: ["users"],
    queryFn: () => getAllUser(token).then((res) => res.data),
  });


  const mutation = useMutation({
    mutationFn: async (userId: string) => await deleteUser(userId, token),
    onSuccess: async (data) => {
      if (data.isSuccess) {
        await queryClient.invalidateQueries({ queryKey: ["users"] });
        showToast("Successful!", "success");
      } else {
        showToast(data.message, "error");
      }
    },
    onError: (error) => {
      showToast(error.message || "Failed to delete user", "error");
    },
  });

  const removeDiacritics = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(removeDiacritics(event.target.value));
  };

  const filteredData = users.filter((row) => {
    return columns.some((column) => {
      const value = row[column.map as keyof UserRes];
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
        <h1 className="text-2xl font-bold">Users Management</h1>
        <AddUserDialogForm handleFecth={refetch} />
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

                        if (column.map === "dob") {
                          var temp = row[column.map as keyof UserRes] as string;
                          temp
                            ? (value = formatDateOnly(new Date(temp)))
                            : (value = row[column.map as keyof UserRes]);
                        } else if (column.map === "role") {
                          value = getUserRoleName(
                            row[column.map as keyof UserRes] as Role
                          );
                        } else {
                          value = row[column.map as keyof UserRes];
                        }

                        return (
                          <TableCell key={column.map} align="center">
                            <div className="flex justify-center items-center">
                              {column.map === "avatar" ? (
                                <img
                                  src={
                                    value
                                      ? `http://localhost:2024/images/${value}`
                                      : ""
                                  }
                                  alt={`${value} image`}
                                  className="w-36 h-20"
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
                        <EditUserDialogForm user={row} handleFetch={refetch} />
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

export default Users;
