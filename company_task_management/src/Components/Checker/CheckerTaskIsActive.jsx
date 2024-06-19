import { Box } from "@mui/system"

import { Link } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  getCheckerTaskHistoryByCheckerId,
  getTaskFromHistoryUsingEmpId,
  // updateTaskWithCompeletedate,
} from "../../Slices/AssignToTask"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Alert } from "@mui/material"

function CheckerTaskIsActive() {
  const { pendding, taskHistory, error } = useSelector(
    (state) => state.AssignToTask
  )
  console.table(taskHistory)
  const { id: checkerId } = useSelector((state) => state.Auth.authicatedUser)

  const dispatch = useDispatch()
  const columns = [
    {
      field: "empTaskHistoryId",
      headerName: "empTaskHistoryId",
      width: 200,
      editable: true,
    },
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
          to={`/Checker/CheckerTaskIsActiveDeatils/${params.row.empTaskHistoryId}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },
  ]

  useEffect(() => {
    //1 is postion id for validation
    //task ID : for getting task
    dispatch(getCheckerTaskHistoryByCheckerId(checkerId))
  }, [dispatch, checkerId])

  return (
    <div>
      {/* {JSON.stringify(task)} */}
      {error ? (
        <Alert  severity="error">
          {error}
        </Alert>
      ) : (
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
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
          {/* <ChainDetailsForm
          handleCloseDetails={handleCloseChainDetail}
          chainDetails={TaskDetails}
          chainId={selectedRow}
        /> */}
        </Box>
      )}
    </div>
  )
}
export default CheckerTaskIsActive
