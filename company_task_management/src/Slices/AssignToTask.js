import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetTaskAssignDataToChecker,
  GetTaskHistoryByEmpID,
  GetTaskHistoryUsingEmpID,
  approveDisapproveTask,
  getCompletedTaskForChecker,
  updateTaskSubmission,
  getCheckerTaskHistory,
  getTaskHistoryDetailsByIdforChecker,
} from "./AssignToTaskApi";

const initialState = {
  pendding: false,
  tasks: [],
  taskHistory: [],
  taskGuidlinesChecker: {},
  error: null,
  getHistoryDetail: {
    messages: [],
    employee: null,
    taskDetails: null,
    guidelines: null,
    checklist: null,
    empTaskHistory: null,
  },
};

export const updateTaskWithCompeletedate = createAsyncThunk(
  "tasks/updateTaskSubmission",
  async (updatedAssign) => {
    console.log(updatedAssign);
    const response = await updateTaskSubmission(updatedAssign);

    return response.data;
  }
);

export const getCompletedTaskDataForChecker = createAsyncThunk(
  "tasks/getCompletedTaskDataForChecker",
  async (postionId, { rejectWithValue }) => {
    try {
      const response = await getCompletedTaskForChecker(postionId);

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      if (error.response) {
        const errorMessage = error.response.data;
        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
    // console.log(taskId);
    // console.log(response.data);
  }
);

export const getTaskAssignDataForChecker = createAsyncThunk(
  "tasks/checkerdata",
  async (id) => {
    const response = await GetTaskAssignDataToChecker(id);
    return response.data;
  }
);

export const getTaskFromHistoryByEmpId = createAsyncThunk(
  "tasks/getTaskFromHistoryByEmpId",
  async (empid) => {
    const response = await GetTaskHistoryByEmpID(empid);
    return response.data;
  }
);

export const getCheckerTaskHistoryByCheckerId = createAsyncThunk(
  "tasks/getCheckerTaskHistoryByCheckerId",
  async (checkerId) => {
    const response = await getCheckerTaskHistory(checkerId);
    return response.data;
  }
);
// export const getHistoryOfTaskDetailsByIdforChecker = createAsyncThunk(
//   "task/getHistoryOfTaskDetailsByIdforChecker",
//   async (taskHistoryId, { rejectWithValue }) => {
//     console.log(taskHistoryId);
//     try {
//       const response = await getTaskHistoryDetailsByIdforChecker(taskHistoryId);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       // console.log(error.response);
//       if (error.response) {
//         const errorMessage = error.response.data.message;
//         return rejectWithValue(errorMessage);
//       } else {
//         return rejectWithValue("An unexpected error occurred");
//       }
//     }
//     // console.log(taskId);
//     // console.log(response.data);
//   }
// );
export const getHistoryOfTaskDetailsByIdforChecker = createAsyncThunk(
  "tasks/getHistoryOfTaskDetailsByIdforChecker",
  async (taskHistoryId) => {
    const response = await getTaskHistoryDetailsByIdforChecker(taskHistoryId);
    console.log(response);
    return response.data;
  }
);
export const getTaskFromHistoryUsingEmpId = createAsyncThunk(
  "tasks/getTaskFromHistoryUsingEmpId",
  async (empid, { rejectWithValue }) => {
    try {
      const response = await GetTaskHistoryUsingEmpID(empid);
      return response.data;
    } catch (error) {
      // console.log(error.response);
      if (error.response) {
        const errorMessage = error.response.data.message;
        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
    // console.log(taskId);
    // console.log(response.data);
  }
);

export const approveDisapprove = createAsyncThunk(
  "empTask/approveDisapprove",
  async (empAssTask) => {
    const response = await approveDisapproveTask(empAssTask);
    return response.data.task;
  }
);

export const AssignToTaskSlice = createSlice({
  name: "AssignToTaskSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateTaskWithCompeletedate.pending, (state) => {
        state.pendding = true;
      })
      .addCase(updateTaskWithCompeletedate.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.pendding = false;
      })
      .addCase(updateTaskWithCompeletedate.rejected, (state, action) => {
        state.pendding = false;
        state.error = action.payload;
      })
      .addCase(getCompletedTaskDataForChecker.pending, (state) => {
        state.tasks = [];
        state.error = null;
        state.pendding = true;
      })
      .addCase(getCompletedTaskDataForChecker.fulfilled, (state, action) => {
        state.pendding = false;
        state.tasks = action.payload;
      })
      .addCase(getCompletedTaskDataForChecker.rejected, (state, action) => {
        state.pendding = false;
        state.error = action.payload;
      })
      //getTaskAssignDataForChecker
      .addCase(getTaskAssignDataForChecker.pending, (state) => {
        state.pendding = true;
      })
      .addCase(getTaskAssignDataForChecker.fulfilled, (state, action) => {
        state.pendding = false;
        state.taskGuidlinesChecker = action.payload;
        console.log(action);
      })
      .addCase(getTaskAssignDataForChecker.rejected, (state, action) => {
        state.pendding = false;
        state.error = action.payload;
      })
      //getTaskFromHistoryByEmpId
      .addCase(getTaskFromHistoryByEmpId.pending, (state) => {
        state.pendding = true;
      })
      .addCase(getTaskFromHistoryByEmpId.fulfilled, (state, action) => {
        state.pendding = false;
        state.taskHistory = action.payload;
      })
      .addCase(getTaskFromHistoryByEmpId.rejected, (state, action) => {
        state.pendding = false;
        state.error = action.payload;
      })
      //getTaskFromHistoryUsingEmpId
      .addCase(getTaskFromHistoryUsingEmpId.pending, (state) => {
        state.error = null;
        state.pendding = true;
      })
      .addCase(getTaskFromHistoryUsingEmpId.fulfilled, (state, action) => {
        state.pendding = false;
        state.tasks = action.payload;
      })
      .addCase(getTaskFromHistoryUsingEmpId.rejected, (state, action) => {
        state.pendding = false;
        state.error = action.payload;
      })
      //getCheckerTaskHistory
      .addCase(getCheckerTaskHistoryByCheckerId.pending, (state) => {
        state.error = null;
        state.pendding = true;
      })
      .addCase(getCheckerTaskHistoryByCheckerId.fulfilled, (state, action) => {
        state.pendding = false;
        state.taskHistory = action.payload;
      })
      .addCase(getCheckerTaskHistoryByCheckerId.rejected, (state, action) => {
        state.pendding = false;
        state.error = action.payload;
      })
      //getHistoryOfTaskDetailsByIdforChecker
      .addCase(getHistoryOfTaskDetailsByIdforChecker.pending, (state) => {
        state.pending = true;
        state.error = null;
        state.getHistoryDetail = {
          messages: [],
          employee: null,
          taskDetails: null,
          guidelines: null,
          checklist: null,
          empTaskHistory: null,
        };
      })
      .addCase(
        getHistoryOfTaskDetailsByIdforChecker.fulfilled,
        (state, action) => {
          state.pending = false;
          state.error = null;
          const payload = action.payload;

          // Log the payload to verify the structure
          console.log("Payload:", payload);

          state.getHistoryDetail.employee = payload.employee;
          state.getHistoryDetail.taskDetails = payload.task;
          state.getHistoryDetail.guidelines = payload.guidelines || [];
          state.getHistoryDetail.checklist = payload.checklist || [];
          state.getHistoryDetail.messages = payload.message
            ? payload.message.split(",")
            : [];
          state.getHistoryDetail.empTaskHistory = payload.empTaskHistory;

          // state.getHistoryDetail.
          // state.getHistoryDetail.
        }
      )
      .addCase(
        getHistoryOfTaskDetailsByIdforChecker.rejected,
        (state, action) => {
          state.pending = false;
          state.error = action.payload;
        }
      );
  },
});

export default AssignToTaskSlice.reducer;
