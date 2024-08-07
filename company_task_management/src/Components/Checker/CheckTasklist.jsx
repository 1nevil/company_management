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
  Alert,
  Grid,
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
import AdminCard from "../Layout/AdminCard"
import {
  getCheckerDashBoardDatas,
  incrementApproveTaskChecker,
  incrementNotApproveTaskChecker,
} from "../../Slices/DashboardSlice"

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

  const { notApprovedTaskCount, approvedTaskCount } = useSelector(
    (state) => state.DashBord.checkerDashBoard
  )

  useEffect(() => {
    dispatch(getCompletedTaskDataForChecker(positionId))
    dispatch(getCheckerDashBoardDatas(employeeId))
  }, [dispatch, employeeId, positionId])

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
    dispatch(incrementNotApproveTaskChecker())
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
    dispatch(incrementApproveTaskChecker())

    // if (rowData) {
    //   const taskId = rowData.taskId
    //   dispatch(updateapprovedTask(taskId))
    // } else {
    //   console.error("Row data not found for empTaskId:", empTaskId)
    // }
  }

  const columns = [
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
          to={`/Checker/checkerhistory/${params.row.empTaskId}`}
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

  // if (error) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         mt: 3,
  //       }}
  //     >
  //       <Alert severity="error" sx={{ width: "100%" }}>
  //         {error}
  //       </Alert>
  //     </Box>
  //   )
  // }
  const LinkStyle = {
    textDecoration: "none",
  }

  return (
    <>
      <Grid container columnSpacing={2} rowSpacing={2} mt={1} mb={2}>
        <Grid item xs={12} sm={6}>
          <Link to="/checker/CheckerTaskIsActive" style={LinkStyle}>
            <AdminCard
              name="Not Approved Task"
              value={notApprovedTaskCount}
              textColor="red"
            />
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/checker/CheckerTaskIsActive" style={LinkStyle}>
            <AdminCard
              name="Approved Task"
              value={approvedTaskCount}
              textColor="green"
            />
          </Link>
        </Grid>
      </Grid>
      {error || checkerTaskList.length < 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Box>
      ) : (
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
      )}
    </>
  )
}

export default CheckTaskList
