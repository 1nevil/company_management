import { Box } from "@mui/system";

import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  getTaskFromHistoryUsingEmpId,
  updateTaskWithCompeletedate,
} from "../../Slices/AssignToTask";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function TaskIsActive(params) {
  const activeTask = useSelector((state) => state.AssignToTask.tasks);
  console.log(activeTask);
  const { id: empId } = useSelector((state) => state.Auth.authicatedUser);

  const dispatch = useDispatch();
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
          to={`/employee/TaskIsActiveDeatils/${params.row.taskId}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },
  ];

  useEffect(() => {
    //1 is postion id for validation
    //task ID : for getting task
    dispatch(getTaskFromHistoryUsingEmpId(empId));
    console.log();
  }, [dispatch, empId]);

  return (
    <div>
      {/* {JSON.stringify(task)} */}

      <Box>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          rows={activeTask}
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
    </div>
  );
}
export default TaskIsActive;
