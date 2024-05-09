import { Checkbox, Divider, Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskUsingEmpId } from "../../Slices/TaskSlice";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getTaskFromHistoryByEmpId } from "../../Slices/AssignToTask";

function TaskHistory(params) {
  const historytasksByEmpId = useSelector((state) => state.AssignToTask.tasks);
  const dispatch = useDispatch();
  const { id: empId } = useSelector((state) => state.Auth.authicatedUser);

  useEffect(() => {
    dispatch(getTaskFromHistoryByEmpId(empId));
  }, [dispatch, empId]);
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
  ];
  return (
    <Box>
      {/* {JSON.stringify(historytasksByEmpId)} */}
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
      {/* <ChainDetailsForm
        handleCloseDetails={handleCloseChainDetail}
        chainDetails={TaskDetails}
        chainId={selectedRow}
      /> */}
    </Box>
  );
}
export default TaskHistory;
