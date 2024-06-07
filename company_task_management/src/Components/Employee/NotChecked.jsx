import { Alert, Box, Typography } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Visibility from "@mui/icons-material/Visibility"
import { useDispatch, useSelector } from "react-redux"
import { NotCheckedByCheckerData } from "../../Slices/AssignToTask"

function NotChecked() {
  const dispatch = useDispatch()
  const { pendding, taskCompletedButNotChecked, error } = useSelector(
    (state) => state.AssignToTask
  )
  const { id: empId } = useSelector((state) => state.Auth.authicatedUser)

  console.log("🚀 ~ NotChecked ~ error:", error)
  useEffect(() => {
    dispatch(NotCheckedByCheckerData(Number(empId)))
  }, [dispatch, empId])

  const columns = [
    {
      field: "taskName",
      headerName: "Task Name",
      width: 250,
      editable: true,
    },
    {
      field: "assignedAt",
      headerName: "Assign At",
      width: 250,
      editable: true,
    },
    {
      field: "completedAt",
      headerName: "Completed At",
      width: 250,
      editable: true,
    },
    // {
    //   field: "seeDetails",
    //   headerName: "See Details",
    //   description: "Task details",
    //   sortable: false,
    //   width: 120,
    //   renderCell: (params) => (
    //     <Link
    //       style={{ color: "gray" }}
    //       to={`/employee/TaskIsActiveDeatils/${params.row.taskId}`}
    //     >
    //       <Visibility />
    //     </Link>
    //   ),
    // },
  ]

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Your Not Checked Task.
      </Typography>
      {error !== null ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box>
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            loading={pendding}
            rows={taskCompletedButNotChecked}
            columns={columns}
            getRowId={(row) => row.empTaskId}
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
        </Box>
      )}
      {/* <ChainDetailsForm
          handleCloseDetails={handleCloseChainDetail}
          chainDetails={TaskDetails}
          chainId={selectedRow}
        /> */}
    </>
  )
}

export default NotChecked
