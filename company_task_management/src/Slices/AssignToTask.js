import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetTaskAssignDataToChecker,
  GetTaskHistoryByEmpID,
  getCompletedTaskForChecker,
  updateTaskSubmission,
} from "./AssignToTaskApi";

const initialState = {
  pendding: false,
  tasks: [],
  taskGuidlinesChecker: {},
  error: "",
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
  async () => {
    const response = await getCompletedTaskForChecker();
    return response.data;
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
        state.pendding = true;
      })
      .addCase(getCompletedTaskDataForChecker.fulfilled, (state, action) => {
        state.pendding = false;
        state.tasks = action.payload;
        console.log(action);
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
        state.tasks = action.payload;
        console.log(state.tasks);
      })
      .addCase(getTaskFromHistoryByEmpId.rejected, (state, action) => {
        state.pendding = false;
        state.error = action.payload;
      });
  },
});

export default AssignToTaskSlice.reducer;
