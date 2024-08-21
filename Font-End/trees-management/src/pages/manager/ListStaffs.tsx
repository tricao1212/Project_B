import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loading from "../../components/Loading";
import { ColTable } from "../../interfaces/ColTable";
import {
  Avatar,
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
import { UserRes } from "../../interfaces/Response/User/UserRes";
import { getAllUser } from "../../services/UserApi";
import { formatDateOnly } from "../../utils/formatDate";
import { getUserRoleName } from "../../utils/getUSerRole";
import { useQuery } from "@tanstack/react-query";
import StaffDetails from "../../components/StaffDetails";

const ListStaffs = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [staffAvailable, setStaffAvailable] = useState<number>(0);
  const [busyStaff, setBusyStaff] = useState<number>(0);

  const columns: ColTable[] = [
    { title: "Avatar", map: "avatar" },
    { title: "Full Name", map: "fullName" },
    { title: "Phone", map: "phone" },
    { title: "Date Of Birth", map: "dob" },
  ];

  const fetchStaff = async () => {
    const res = (await getAllUser(token)).data;
    const temp = res.filter((staff: UserRes) => staff.role === 2);
    let a = 0;
    let b = 0;
    temp.filter((s: UserRes) =>
      s.assignments.length > 0 ? (b = b + 1) : (a = a + 1)
    );
    setStaffAvailable(a);
    setBusyStaff(b);
    return temp;
  };

  const {
    data: staffs = [],
    isLoading,
    isError,
  } = useQuery<UserRes[]>({
    queryKey: ["staffs"],
    queryFn: () => fetchStaff(),
  });

  const removeDiacritics = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(removeDiacritics(event.target.value).toLowerCase());
  };

  const handleFilter = (type: string) => {
    setFilterType(type);
    setPage(0); // Reset page when filter changes
  };

  const filteredData = staffs.filter((row) => {
    const searchValue = removeDiacritics(
      `${row.fullName} ${row.dob} ${row.phone} ${getUserRoleName(row.role)}`
    ).toLowerCase();
    const matchesSearchTerm = searchValue.includes(searchTerm);
    const matchesFilterType =
      filterType === "all" ||
      (filterType === "available" && row.assignments.length === 0) ||
      (filterType === "staffBusy" && row.assignments.length > 0);

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
        <h1 className="text-2xl font-bold">List Staffs</h1>
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
            All staffs{" "}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-300 text-white text-sm">
              {staffs.length}
            </span>
          </Button>
          <Button
            sx={{
              backgroundColor:
                filterType === "available" ? "yellow" : "transparent",
              color: filterType === "available" ? "black" : "inherit",
              border: "1px solid",
              borderColor: "currentColor",
              borderRadius: "0.25rem",
              "&:hover": {
                backgroundColor:
                  filterType === "available" ? "darkyellow" : "transparent",
              },
              display: "flex",
              alignItems: "center",
              gap: "0.5rem", // Consistent spacing between text and the counter
            }}
            size="small"
            onClick={() => handleFilter("available")}
          >
            Available staffs{" "}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-300 text-white text-sm">
              {staffAvailable}
            </span>
          </Button>
          <Button
            sx={{
              backgroundColor:
                filterType === "staffBusy" ? "yellow" : "transparent",
              color: filterType === "staffBusy" ? "black" : "inherit",
              border: "1px solid",
              borderColor: "currentColor",
              borderRadius: "0.25rem",
              "&:hover": {
                backgroundColor:
                  filterType === "staffBusy" ? "darkyellow" : "transparent",
              },
              display: "flex",
              alignItems: "center",
              gap: "0.5rem", // Consistent spacing between text and the counter
            }}
            size="small"
            onClick={() => handleFilter("staffBusy")}
          >
            Busy staffs{" "}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-300 text-white text-sm">
              {busyStaff}
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
                  className="uppercase"
                  align="center"
                >
                  Information
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowindex) => {
                  return (
                    <TableRow hover tabIndex={-1} key={rowindex}>
                      {columns.map((column) => {
                        let value;

                        if (column.map === "dob") {
                          var temp = row[column.map as keyof UserRes] as string;
                          temp
                            ? (value = formatDateOnly(new Date(temp)))
                            : (value = row[column.map as keyof UserRes]);
                        } else {
                          value = row[column.map as keyof UserRes];
                        }

                        return (
                          <TableCell key={column.map} align="center">
                            <div className="flex justify-center items-center">
                              {column.map === "avatar" ? (
                                <Avatar
                                  alt="avatar"
                                  src={
                                    row.avatar
                                      ? "http://localhost:2024/images/" +
                                        row.avatar
                                      : ""
                                  }
                                  sx={{ width: 56, height: 56 }}
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
                        <StaffDetails user={row} />
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

export default ListStaffs;
