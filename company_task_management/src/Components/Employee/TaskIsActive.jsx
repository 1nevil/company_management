import { Box } from "@mui/system"

import { Link } from "react-router-dom"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  getTaskFromHistoryUsingEmpId,
  // updateTaskWithCompeletedate,
} from "../../Slices/AssignToTask"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Alert } from "@mui/material"

function TaskIsActive(params) {
  const { pendding, tasks, error } = useSelector((state) => state.AssignToTask)
  console.table(tasks)
  const { id: empId } = useSelector((state) => state.Auth.authicatedUser)

  const dispatch = useDispatch()
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
          to={`/employee/TaskIsActiveDeatils/${params.row.taskId}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },
  ]

  useEffect(() => {
    //1 is postion id for validation
    //task ID : for getting task
    dispatch(getTaskFromHistoryUsingEmpId(empId))
  }, [dispatch, empId])

  return (
    <div>
      {error ? (
        <>
          <Alert severity="error">{error}</Alert>
        </>
      ) : (
        <Box>
          <DataGrid
            loading={pendding}
            slots={{ toolbar: GridToolbar }}
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
export default TaskIsActive
