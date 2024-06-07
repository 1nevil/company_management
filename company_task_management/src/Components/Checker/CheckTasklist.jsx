import React, { useEffect, useState } from "react"
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Button,
  Skeleton,
  Typography,
} from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateapprovedTask } from "../../Slices/TaskSlice"
import {
  approveDisapprove,
  getCompletedTaskDataForChecker,
} from "../../Slices/AssignToTask"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"

function CheckTaskList() {
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()
  const { pendding, checkerTaskList, error } = useSelector(
    (state) => state.AssignToTask
  )
  const { id: employeeId, Position: positionId } = useSelector(
    (state) => state.Auth.authicatedUser
  )
  useEffect(() => {
    dispatch(getCompletedTaskDataForChecker(positionId))
  }, [dispatch, positionId])

  const handleDisapprove = (TaskId) => {
    setOpen(true)
    console.log(TaskId)
    setSelectedTask(TaskId)
  }

  const handleDisapproveSubmit = () => {
    dispatch(
      approveDisapprove({
        TaskAssId: selectedTask,
        CheckerId: employeeId,
        IsApprove: false,
        Message: message,
      })
    )
    setOpen(false)
    setSelectedTask(null)
  }
  const handleClose = () => {
    setOpen(false)
    setSelectedTask(null)
  }

  const handleApprove = (empTaskId) => {
    dispatch(
      approveDisapprove({
        TaskAssId: empTaskId,
        CheckerId: employeeId,
        IsApprove: true,
      })
    )

    // if (rowData) {
    //   const taskId = rowData.taskId
    //   dispatch(updateapprovedTask(taskId))
    // } else {
    //   console.error("Row data not found for empTaskId:", empTaskId)
    // }
  }

  const columns = [
    { field: "empTaskId", headerName: "ID", width: 90 },
    {
      field: "taskName",
      headerName: "TaskName",
      width: 590,
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
          to={`/Checker/CheckerTaskDetails/${params.row.empTaskId}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },
    {
      field: "Disapprove",
      headerName: "Disapprove",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDisapprove(params.row.empTaskId)}
          title="Disapprove"
        >
          <CancelOutlinedIcon sx={{ color: "red" }} />
        </IconButton>
      ),
    },
    {
      field: "Approve",
      headerName: "Approve",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleApprove(params.row.empTaskId)}
          title="Approve"
        >
          <CheckCircleOutlinedIcon sx={{ color: "green" }} />
        </IconButton>
      ),
    },
  ]

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <WarningAmberIcon color="error" sx={{ mr: 1 }} />
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Box>
    )
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        loading={pendding}
        rows={checkerTaskList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        components={{
          Toolbar: GridToolbar,
        }}
        getRowId={(row) => row.empTaskId}
        pagination
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Dialog open={open}>
          <DialogTitle>Remarks</DialogTitle>
          <DialogContent>
            <TextField
              size="small"
              label=""
              name="taskName"
              multiline
              required
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              rows={6}
            />
            <Box sx={{ display: "flex", mt: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={handleDisapproveSubmit}
                color="primary"
                sx={{ width: "300px" }}
              >
                Submit
              </Button>
            </Box>
            <Box sx={{ display: "flex", mt: 2, justifyContent: "right" }}>
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  )
}

export default CheckTaskList
