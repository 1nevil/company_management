import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteEmp, fetchEmp } from "../../../../Slices/EmployeeSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PositionForm from "./PositionForm";

function Position() {
  //   const dispatch = useDispatch();
  //   const employeess = useSelector((state) => state.Employee.employees);

  //   const handleDelete = (id, name) => {
  //     dispatch(deleteEmp(id));
  //     notify(name);
  //   };

  const handleEdit = (id) => {
    alert(id);
  };

  //   useEffect(() => {
  //     dispatch(fetchEmp());
  //   }, [dispatch]);

  //   const notify = (name) => toast(name + "is deleted !");

  const columns = [
    {
      field: "PositionName",
      headerName: "PositionName",
      width: 140,
    },
    {
      field: "Duration",
      headerName: "Duration",
      width: 140,
    },
    {
      field: "Unit",
      headerName: "Unit",
      width: 140,
    },
    {
      field: "Unitname",
      headerName: "Unitname",
      width: 140,
    },
    {
      field: "Rate",
      headerName: "Rate",
      width: 140,
    },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row.Positionid)}
            title="Edit"
          >
            <Edit />
          </IconButton>
          <IconButton
            // onClick={() =>
            //   handleDelete(params.row.employeeId, params.row.employeeName)
            // }
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
      <Box>
        <ToastContainer />
        <PositionForm></PositionForm>
        <Typography
          variant="h6"
          component="h6"
          textAlign="center"
          color="primary"
          mb={2}
        >
          Position
        </Typography>
        <DataGrid
          rows={""}
          getRowId={(row) => row.Positionid}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 15, 10, 25, 50, 100, 200]}
        />
      </Box>
    </>
  );
}

export default Position;
