import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { IconButton, TextField } from "@mui/material"; // Import TextField for search input
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { Typography } from "@mui/material";
import EmployeeForm from "./EmployeeForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmp, fetchEmp } from "../../../../Slices/EmployeeSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Employee() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const employeess = useSelector((state) => state.Employee.employees) || [];

  useEffect(() => {
    dispatch(fetchEmp());
  }, [dispatch]);

  const handleDelete = (id, name) => {
    dispatch(deleteEmp(id));
    notify(name);
  };

  const handleEdit = (id) => {
    alert(id);
  };

  const notify = (name) => toast(name + " is deleted !");

  // Filtered rows based on search term
  // const filteredRows = employeess?.filter((row) =>
  //   Object.values(row).some(
  //     (value) =>
  //       value &&
  //       value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );
  const filteredRows = Array.isArray(employeess)
    ? employeess.filter((row) =>
        Object.values(row).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  // Sort filtered rows by dateOfJoining in descending order
  const sortedRows = filteredRows.sort(
    (a, b) => new Date(b.dateOfJoining) - new Date(a.dateOfJoining)
  );

  const columns = [
    {
      field: "checklist",
      headerName: "", // Empty header name
      description: "details",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <Link
          style={{ color: "gray" }}
          to={`/admin/EmployeeCard/${params.row.employeeId}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },

    {
      field: "Action",
      headerName: "",
      description: "delete",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() =>
              handleDelete(params.row.employeeId, params.row.employeeName)
            }
            title="Delete"
          >
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },

    {
      field: "employeeName",
      headerName: "Name",
      width: 140,
    },
    // {
    //   field: "dateOfJoining",
    //   headerName: "Date Of joining",
    //   width: 140,
    // },
    {
      field: "xender",
      headerName: "Gender",
      width: 140,
    },
    {
      field: "employeeEmail",
      headerName: "Email",
      width: 140,
    },
    {
      field: "employeeAge",
      headerName: "Age",
      width: 140,
    },
    {
      field: "mobileNumber",
      headerName: "MobileNumber",
      width: 140,
    },
    {
      field: "altmobileNumber",
      headerName: "Alt Mobile No",
      width: 140,
    },

    {
      field: "dob",
      headerName: "Date Of Birth",
      width: 140,
    },
    {
      field: "adharNumber",
      headerName: "Adhar Number",
      width: 140,
    },

    {
      field: "positionName",
      headerName: "Position",
      width: 140,
    },
    {
      field: "rolename",
      headerName: "Role",
      width: 140,
    },
  ];

  return (
    <>
      <Box>
        <ToastContainer />
        <EmployeeForm />

        <Box mt={2}>
          {/* Search input field */}
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Box>
        <Typography
          variant="h6"
          component="h6"
          textAlign="center"
          color="primary"
          mb={2}
        >
          Employees
        </Typography>
        <DataGrid
          rows={sortedRows} // Pass sorted rows to DataGrid
          getRowId={(row) => row.employeeId}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          }}
          pageSizeOptions={[5, 15, 10, 25, 50, 100, 200]}
        />
      </Box>
    </>
  );
}

export default Employee;
