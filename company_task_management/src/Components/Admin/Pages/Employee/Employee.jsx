import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Typography } from "@mui/material";
import EmployeeForm from "./EmployeeForm";
import axios from "axios";

function Employee() {
  const [key, setKeys] = useState([]);
  const [employees, setEmployees] = useState([]);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get("http://localhost:5036/api/Employees");
      const data = await res.data;
      if (res.data.length === 0) {
        console.log("Response data is empty");
        return;
      }
      setEmployees(data);
      console.log(data);
      const test = res.data[0];
      setKeys(Object.keys(test));
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  useEffect(() => {
    fetchEmployee();
  }, []);
  const handleDelete = (id) => {
    alert(id);
  };

  const handleEdit = (id) => {
    alert(id);
  };

  const columns = [
    ...key.map((k) => ({
      field: k,
      headerName: k,
      width: 140,
    })),
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row.employeeId)}
            title="Edit"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.employeeId)}
            title="Delete"
          >
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <EmployeeForm></EmployeeForm>
      <Typography
        variant="h6"
        component="h6"
        textAlign="center"
        color="primary"
        mb={2}
      >
        Employees
      </Typography>
      <Box sx={{ height: 400, width: "auto" }}>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          rows={employees}
          getRowId={(row) => row.employeeId}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}

export default Employee;
