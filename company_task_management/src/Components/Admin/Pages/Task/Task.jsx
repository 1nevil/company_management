import React, { useEffect } from "react"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Delete, Edit } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
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
import CheckList from "./Checklist"
import { useFormik } from "formik"
import { EmployeeSchema } from "../../../Validation/validationSchema"
import { useDispatch, useSelector } from "react-redux"
import { getAllTasks } from "../../../../Slices/TaskSlice"

function Task() {
  const [open, setOpen] = React.useState(false)
  const [openchecklist, setopenchecklist] = React.useState(false)
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

  const handleClose = () => {
    setOpen(false)
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

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      //initialValues: initValue,
      validationSchema: EmployeeSchema,
      onSubmit: (data) => {
        alert("Form Submitted!")
        console.log(data)
      },
    }
  )
  const handleopenchecklist = () => {
    setopenchecklist(true)
  }

  const handleClosechecklist = () => {
    setopenchecklist(false)
  }

  const columns = [
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
    {
      field: "TaskDetail",
      headerName: "TaskDetail",
      description: "TaskDetail",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link to={`/admin/AdminTaskDeatil/${params.row.taskId}`}>
          {/* <IconButton onClick={handleopenchecklist} title="AdminTask Deatil"> */}
          <VisibilityIcon></VisibilityIcon>
          {/* </IconButton> */}
        </Link>
      ),
    },
    {
      field: "taskName",
      headerName: "Task Name",
      width: 150,
      editable: true,
    },
    {
      field: "instructions",
      headerName: "Instructions",
      width: 200,
      editable: true,
    },
    {
      field: "durationNum",
      headerName: "Duration Day",
      width: 150,
      editable: true,
      textAlign: "center",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
      editable: true,
    },
    {
      field: "endDate",
      headerName: "End Date Increase Time",
      width: 200,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      editable: true,
    },
    {
      field: "taskStatus",
      headerName: "Task Status",
      width: 150,
      editable: true,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 120,
      editable: true,
    },

    {
      field: "set_Reminder",
      headerName: "Set Reminder",
      width: 150,
      editable: true,
    },
    {
      field: "chainId",
      headerName: "Team Name",
      width: 150,
      editable: true,
    },
  ]

  const handleDelete = (id) => {
    alert(id)
  }

  const handleEdit = (id) => {
    alert(id)
  }

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
                pageSize: 50,
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
