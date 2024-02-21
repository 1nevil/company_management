import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddTask from "../Components/AddTask";
import AddIcon from "@mui/icons-material/Add";
function Task() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Task",
      headerName: "Task",
      width: 150,
      editable: true,
    },
    {
      field: "Department",
      headerName: "Department",
      width: 150,
      editable: true,
    },
    {
      field: "SubDepartment",
      headerName: "SubDepartment",
      width: 150,
      editable: true,
    },
    {
      field: "Instruction",
      headerName: "Instruction",
      width: 150,
      editable: true,
    },
    {
      field: "Team",
      headerName: "Team",
      width: 150,
      editable: true,
    },
    {
      field: "Action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)} title="Edit">
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            title="Delete"
          >
            <Delete sx={{ color: "red" }} />
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
    <>
      <Button
        sx={{ margin: "1rem 0" }}
        variant="contained"
        onClick={handleClickOpen("body")}
      >
        <AddIcon />
        Add Task
      </Button>
      <Dialog
        maxWidth="md"
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{ width: "100%" }}
      >
        <DialogTitle
          id="scroll-dialog-title"
          textAlign="center"
          color="primary"
        >
          Add Task
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <AddTask></AddTask>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ height: "450px" }}
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
          pageSizeOptions={[5, 10, 25, 50, 100, 200]}
        />
      </div>
    </>
  );
}

export default Task;
