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

function EmployeeDashboard() {
  const { pending, tasks, error } = useSelector((state) => state.Tasks)
  const { id: empId, Position: positionId } = useSelector(
    (state) => state.Auth.authicatedUser
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPositionWiseTask(positionId))
  }, [dispatch, positionId])

  const handleClick = (id) => {
    const insertData = {
      empId: Number(empId),
      taskId: id,
      isActive: "1",
    }
    dispatch(addAssignTask(insertData))
  }

  const columns = [
    { field: "taskId", headerName: "task ID", width: 90 },
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
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            // rows={filteredTasksByPosition}
            rows={tasks}
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
