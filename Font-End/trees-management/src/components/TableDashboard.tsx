import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Role } from "../interfaces/Enum/Role";
import { getUserRoleName } from "../utils/getUSerRole";
import { ColTable } from "../interfaces/ColTable";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteConfirm from "./DeleteConfirm";
import { formatDateOnly } from "../utils/formatDate";

interface Generic<T> {
  col: ColTable[];
  data: T[];
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
}
export default function TableDashboard<T>({
  col,
  data,
  onDelete,
  onEdit,
}: Generic<T>): React.ReactElement {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((row) => {
    return col.some((column) => {
      const value = row[column.map as keyof T];
      return value
        ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false;
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

  return (
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
        sx={{ maxHeight: 500, border: "1px solid grey", borderRadius: "10px" }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          className="justify-center items-center flex"
        >
          <TableHead>
            <TableRow>
              {col.map((column) => (
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowindex}>
                    {col.map((column) => {
                      let value;
                      if (column.map === "role") {
                        value = getUserRoleName(
                          row[column.map as keyof T] as Role
                        );
                      } else if (column.map === "dob") {
                        var temp = row[column.map as keyof T] as string;
                        temp
                          ? (value = formatDateOnly(new Date(temp)))
                          : (value = row[column.map as keyof T]);
                      } else {
                        value = row[column.map as keyof T];
                      }
                      return (
                        <TableCell key={column.map} align="center">
                          <div className="flex justify-center items-center">
                            {column.map === "avatar" ||
                            column.map === "image" ? (
                              <img
                                src={
                                  value
                                    ? `http://localhost:2024/images/${value}`
                                    : ""
                                }
                                alt={`${value} image`}
                                className="w-36"
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
                      <IconButton
                        color="primary"
                        onClick={() => onEdit(row)}
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <DeleteConfirm data={row} handleDelete={onDelete} />
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
  );
}
