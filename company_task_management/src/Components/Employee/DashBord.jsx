import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { fetchChainMater } from "../../Slices/ChainSliceMaster";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

function EmployeeDashboard() {
  const [TaskDetails, setTaskDetails] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClick = (id) => {
    alert(id);
  };

  const handleOpenChainDetail = () => {
    setTaskDetails(true);
  };

  const handleCloseChainDetail = () => {
    setTaskDetails(false);
  };

  // const handleDelete = () => {}

  const columns = [
    { field: "taskId", headerName: "task ID", width: 90 },
    {
      field: "TaskName",
      headerName: "Task Name",
      width: 500,
      editable: true,
    },
    {
      field: "seeDetails",
      headerName: "See Details",
      description: "Task details",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link
          style={{ color: "gray" }}
          to={`/employee/EmpTaskDetail/${params.row.taskId}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },
    {
      field: "SelectTask",
      headerName: "Select Task",
      description: "Select Task",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <IconButton onClick={() => handleClick(params.row.taskId)} title="Edit">
          <CheckCircleOutlinedIcon sx={{ color: "green" }} />
        </IconButton>
      ),
    },
  ];
  const Tasks = [
    {
      taskId: 1,
      TaskName: "Task 1",
    },
  ];
  return (
    <Box>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={Tasks}
        columns={columns}
        getRowId={(row) => row.taskId}
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
      {/* <ChainDetailsForm
        handleCloseDetails={handleCloseChainDetail}
        chainDetails={TaskDetails}
        chainId={selectedRow}
      /> */}
    </Box>
  );
}

export default EmployeeDashboard;
