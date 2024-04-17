import { Delete, Edit } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckList from "../Admin/Pages/Task/Checklist";
import MyButton from "../Layout/MyButton";

function CheckTaskList() {
  const [open , setOpen] = React.useState(false);
  const [openchecklist, setopenchecklist] = React.useState(false);

  const handleopenchecklist = () => {
    setopenchecklist(true);
  };
  const handleDisapprove = () =>{
    setOpen(true);
  }
  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "TaskList",
      headerName: "TaskList",
      width: 590,
      editable: true,
    },
  
    {
      field: "checklist",
      headerName: "CheckList",
      description: "Team details",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        // <Link to={`CheckList/${params.row.id}`}>
        <IconButton onClick={handleopenchecklist} title="Check List">
          <VisibilityIcon></VisibilityIcon>
        </IconButton>
        // </Link>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDisapprove(params.row.id)} title="Edit">
            <CancelOutlinedIcon sx={{ color: "red" }} />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            title="Delete"
          >
            <CheckCircleOutlinedIcon sx={{ color: "green" }} />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = (id) => {
    alert(id);
  };

  const handleEdit = (id) => {
    alert(id);
  };

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
      <Dialog open={open}>
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent>
        <TextField
              size="small"
              label="Remarks"
              name="taskName"
              multiline 
              fullWidth
              rows={3}
              //value={formData.taskName}
              // onChange={handleChange}
              // onBlur={handleBlur}
            />

        <MyButton type="submit" fullWidth={true} >
          Submit
        </MyButton>
        
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CheckTaskList;
