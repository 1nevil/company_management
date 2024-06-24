import React, { useEffect } from "react"
import Box from "@mui/material/Box"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Link } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useSelector, useDispatch } from "react-redux"
import { IconButton } from "@mui/material"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import { addAssignTask, getPositionWiseTask } from "../../Slices/TaskSlice"
import Alert from "@mui/material/Alert"
import AdminCard from "../Layout/AdminCard"
import { Grid } from "@mui/material"
import {
  getemployeeDashBoardDatas,
  incrementNotApproveTaskEmployee,
} from "../../Slices/DashboardSlice.js"
import { toast } from "react-toastify"

const LinkStyle = {
  textDecoration: "none",
}

function EmployeeDashboard() {
  const { pending, tasks, error } = useSelector((state) => state.Tasks)
  const { activeTask, notCheckedTask, disapprovedTask, approvedTaskCount } =
    useSelector((state) => state.DashBord.employeeDashBoard)

  const { id: empId, Position: positionId } = useSelector(
    (state) => state.Auth.authicatedUser
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPositionWiseTask(positionId))
    dispatch(getemployeeDashBoardDatas(empId))
  }, [dispatch, empId, positionId])

  const successfullyPickTask = () => toast.success("Task Picked successfully..")

  const handleClick = (id) => {
    const insertData = {
      empId: Number(empId),
      taskId: id,
      isActive: "1",
    }
    dispatch(addAssignTask(insertData)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(incrementNotApproveTaskEmployee())
        successfullyPickTask()
      }
    })
  }

  const columns = [
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
  ]

  return (
    <Box>
      {error === "Their is not task for Your Position!!!" ? (
        <Box mb={1}>
          {" "}
          <Alert severity="warning">{error}</Alert>{" "}
        </Box>
      ) : (
        <>
          {error !== null && <Alert severity="error">{error}</Alert>}
          <Grid container columnSpacing={2} rowSpacing={2} mt={1} mb={2}>
            <Grid item xs={12} sm={6}>
              <Link to="/employee/TaskIsActive" style={LinkStyle}>
                <AdminCard
                  name="Active Tasks"
                  value={activeTask}
                  textColor="green"
                />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link to="/employee/TaskHistory" style={LinkStyle}>
                <AdminCard name="Approved Tasks" value={approvedTaskCount} />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link to="/employee/TaskHistory" style={LinkStyle}>
                <AdminCard
                  name="Disapproved Tasks"
                  value={disapprovedTask}
                  textColor="red"
                />
              </Link>
            </Grid>{" "}
            <Grid item xs={12} sm={6}>
              <Link to="/employee/notChecked" style={LinkStyle}>
                <AdminCard name="Not checked Task" value={notCheckedTask} />
              </Link>
            </Grid>{" "}
          </Grid>
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            // rows={filteredTasksByPosition}
            rows={tasks}
            loading={pending}
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
        </>
      )}

      {/* <ChainDetailsForm
        handleCloseDetails={handleCloseChainDetail}
        chainDetails={TaskDetails}
        chainId={selectedRow}
      /> */}
    </Box>
  )
}

export default EmployeeDashboard
