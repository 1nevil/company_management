import React, { useEffect } from "react"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"

import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import AddTask from "./AddTask"
import AddIcon from "@mui/icons-material/Add"
import MyButton from "../../../Layout/MyButton"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { deleteTask, getAllTasks } from "../../../../Slices/TaskSlice"
import { Button, IconButton } from "@mui/material"
import useAlert from "../../../../Hooks/useAlert"
import { Delete } from "@mui/icons-material"

function Task() {
  const deleteTaskAlert = useAlert(deleteTask, "task deleted Successfully...")
  const [open, setOpen] = React.useState(false)
  const [scroll, setScroll] = React.useState("paper")
  const dispatch = useDispatch()
  const allTask = useSelector((state) => state.Tasks.tasks)

  useEffect(() => {
    dispatch(getAllTasks())
  }, [dispatch])

  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = (reason, event) => {
    if (event === "backdropClick") {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const columns = [
    {
      field: "taskName",
      headerName: "Task Name",
      width: 500,
      editable: true,
    },
    {
      field: "taskStatus",
      headerName: "Task Status",
      width: 200,
      editable: true,
    },
    {
      field: "TaskDetail",
      headerName: "TaskDetail",
      description: "TaskDetail",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link
          to={`/admin/AdminTaskDeatil/${params.row.taskId}`}
          style={{ color: "gray" }}
        >
          {/* <IconButton onClick={handleopenchecklist} title="AdminTask Deatil"> */}
          <VisibilityIcon></VisibilityIcon>
          {/* </IconButton> */}
        </Link>
      ),
    },
    {
      field: "task Checklist",
      headerName: "Task Checklist",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link to={`/admin/checklists/${params.row.taskId}`}>
          <VisibilityIcon></VisibilityIcon>
        </Link>
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
          {/* <IconButton onClick={() => handleEdit(params.row.id)} title="Edit">
            <Edit />
          </IconButton> */}
          <IconButton
            onClick={() => deleteTaskAlert(params.row.taskId)}
            title="Delete"
          >
            <Delete sx={{ color: "red" }} />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <>
      <MyButton
        variant="contained"
        fullWidth={false}
        onSmash={handleClickOpen("body")}
      >
        <AddIcon />
        Add Task
      </MyButton>
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
            <AddTask handleCloseForm={handleClose}></AddTask>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <div style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={allTask} // Pass sorted rows to DataGrid
          getRowId={(row) => row.taskId}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          pageSizeOptions={[50, 75, 100, 200]}
        />
      </div>
    </>
  )
}

export default Task
