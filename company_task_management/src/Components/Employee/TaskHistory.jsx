import {
  Checkbox,
  Divider,
  Grid,
  Typography,
  Button,
  Modal,
  Box,
  IconButton,
} from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTaskUsingEmpId } from "../../Slices/TaskSlice"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { getTaskFromHistoryByEmpId } from "../../Slices/AssignToTask"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"

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
  const { pendding, taskHistory } = useSelector((state) => state.AssignToTask)
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
    { field: "empTaskHistoryId", headerName: "empTaskHistoryId", width: 100 },
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
          to={`/employee/TaskDetail/${params.row.empTaskHistoryId}`}
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
        // 0 means not approved
        params.row.isApprove === "0" ? (
          <Button
            startIcon={<ThumbDownOffAltIcon />}
            variant="contained"
            color="error"
            onClick={() => handleOpen(params.row.message)}
          >
            disapproved
          </Button>
        ) : (
          <Button
            startIcon={<DoneAllIcon />}
            variant="contained"
            color="success"
          >
            approved
          </Button>
        ),
    },
  ]

  return (
    <Box>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        loading={pendding}
        rows={taskHistory}
        columns={columns}
        getRowId={(row) => row.empTaskHistoryId}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100, 200]}
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
