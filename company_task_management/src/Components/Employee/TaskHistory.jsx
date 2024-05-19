import {
  Checkbox,
  Divider,
  Grid,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTaskUsingEmpId } from "../../Slices/TaskSlice"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { getTaskFromHistoryByEmpId } from "../../Slices/AssignToTask"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #333333",
  boxShadow: 24,
  p: 4,
}

function TaskHistory(params) {
  const historytasksByEmpId = useSelector((state) => state.AssignToTask.tasks)
  const dispatch = useDispatch()
  const { id: empId } = useSelector((state) => state.Auth.authicatedUser)
  const [open, setOpen] = useState(false)
  const [disapprovalMessage, setDisapprovalMessage] = useState("")

  useEffect(() => {
    dispatch(getTaskFromHistoryByEmpId(empId))
  }, [dispatch, empId])

  const handleOpen = (message) => {
    setDisapprovalMessage(message)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setDisapprovalMessage("")
  }

  const columns = [
    { field: "empTaskHistoryId", headerName: "TaskHistory Id", width: 90 },
    {
      field: "taskName",
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
          to={`/employee/TaskDetail/${params.row.taskId}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },
    {
      field: "isApprove",
      headerName: "Disapproval Message",
      description: "Show disapproval message if not approved",
      sortable: false,
      width: 200,
      renderCell: (params) =>
        params.row.isApprove === "0" ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpen(params.row.message)}
          >
            View Disapproval
          </Button>
        ) : null,
    },
  ]

  return (
    <Box>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={historytasksByEmpId}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box>
          {" "}
          <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
              Disapproval Message
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {disapprovalMessage}
            </Typography>
            <Button onClick={handleClose} sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
export default TaskHistory
