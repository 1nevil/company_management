import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Paper,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

function CheckTaskList() {
  const [open, setOpen] = useState(false);
  const [openchecklist, setOpenChecklist] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenChecklist = () => {
    setOpenChecklist(true);
  };

  const handleCloseChecklist = () => {
    setOpenChecklist(false);
  };

  const handleDisapprove = (TaskId) => {
    setOpen(true);
    setSelectedTask(TaskId);
  };
  
 
  const handleSubmit = () => {
    setOpen(false);
    setSelectedTask(null);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };
  const handleApprove = (TaskId) => {
    alert(TaskId);
  };

  const handleEdit = (TaskId) => {
    alert(TaskId);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "TaskName",
      headerName: "TaskName",
      width: 590,
      editable: true,
    },
    {
      field: "Position",
      headerName: "Position",
      width: 160,
      editable: true,
    },
    {
      field: "checklist",
      headerName: "CheckList",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link
          style={{ color: "gray" }}
          to={`/Checker/CheckerTaskDetails/${params.row.id}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },
    {
      field: "Disapprove",
      headerName: "Disapprove",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDisapprove(params.row.id)} title="Edit">
            <CancelOutlinedIcon sx={{ color: "red" }} />
          </IconButton>
          </>
      ),
    },
  
          {
      field: "Approve",
      headerName: "Approve",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleApprove(params.row.id)} title="Delete">
            <CheckCircleOutlinedIcon sx={{ color: "green" }} />
          </IconButton>
        </>
      ),
    },
  ];
  

 

  const Tasks = [
    { id: 1, Category: "Snow" },
    { id: 2, Category: "Lannister" },
    { id: 3, Category: "Lannister" },
  ];

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ height: "450px" }}
          xs={12}
          sm={6}
          md={7}
          rows={Tasks}
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
      </div>
      
      <Box sx={{display: 'flex',flexWrap: 'wrap','& > :not(style)': { m: 5, width: 1000,height: 1000 }, }}>
        
        <Dialog open={open}>
          <DialogTitle>Remarks</DialogTitle>
          <DialogContent>
            <TextField
              size="small"
              label=""
              name="taskName"
              multiline 
              fullWidth
              rows={6}
            />
       <Box sx={{display:'flex', mt: 2,justifyContent:"center" }} >
        <Button
         variant="contained"
          onClick={handleSubmit} 
          color="primary"
          sx={{ width: '300px' }}
          >
          Submit
        </Button>
        </Box>
        <Box sx={{display:'flex', mt: 2,justifyContent:"right" }} >
            <Button onClick={handleClose}>Close</Button>
            </Box>
          </DialogContent>
        </Dialog> 

       
      </Box>
    </div>
  );
}

export default CheckTaskList;
