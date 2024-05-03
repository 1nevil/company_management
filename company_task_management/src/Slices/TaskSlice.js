import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetTaskFromAssignTaskByEmpId,
  addTaskToAssignById,
  approvedTask,
  getTaskAndGuidlinesByTaskId,
  getTaskByPostionId,
  getTaskByTaskId,
  insertTaskData,
} from "./TaskApi";

const initialState = {
  pending: false,
  tasks: [],
  error: "",
  taskAndGuidelines: [],
};

export const insertTask = createAsyncThunk("task/insertTask", async (task) => {
  const response = await insertTaskData(task);
  return response.data;
});

//getTaskByPostionId;
export const getPositionWiseTask = createAsyncThunk(
  "task/getPositionWiseTask",
  async (positionId) => {
    const response = await getTaskByPostionId(positionId);
    console.log(positionId);
    // console.log(response.data);
    return response.data;
  }
);
// addAssignTask
export const addAssignTask = createAsyncThunk(
  "task/addAssignTask",
  async (task) => {
    const response = await addTaskToAssignById(task);
    return response.data;
  }
);

// GetTaskFromAssignTaskByEmpId
export const getTaskUsingEmpId = createAsyncThunk(
  "task/getTaskUsingEmpId",
  async (empId) => {
    const response = await GetTaskFromAssignTaskByEmpId(empId);
    console.log(empId);
    // console.log(response.data);
    return response.data;
  }
);

// getTaskByTaskId
export const getTaskUsingTaskId = createAsyncThunk(
  "task/getTaskUsingTaskId",
  async ({ positionId, taskId }, { rejectWithValue }) => {
    console.log(positionId);
    console.log(taskId);
    try {
      const response = await getTaskByTaskId(positionId, taskId);
      return response.data;
    } catch (error) {
      console.log(error.response);
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

export const getTaskDataAndGuidlinesByTaskId = createAsyncThunk(
  "task/getTaskAndGuidlinesByTaskId",
  async (taskId) => {
    const response = await getTaskAndGuidlinesByTaskId(taskId);
    return response.data;
  }
);

export const updateapprovedTask = createAsyncThunk(
  "emptask/emptaskId",
  async (emptaskId) => {
    const response = await approvedTask(emptaskId);
    return response.data;
  }
);

const TaskSlice = createSlice({
  name: "TaskSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(insertTask.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(insertTask.fulfilled, (state, action) => {
        state.pending = false;
        state.tasks.push(action.payload);
      })
      .addCase(insertTask.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      //   getTaskByPostionId
      .addCase(getPositionWiseTask.pending, (state) => {
        state.pending = true;
      })
      .addCase(getPositionWiseTask.fulfilled, (state, action) => {
        state.pending = false;
        console.log(action.payload);
        state.tasks = action.payload;
      })
      .addCase(getPositionWiseTask.rejected, (state, action) => {
        state.pending = false;
        console.log(action.payload);
        state.error = action.payload;
      })
      //addTaskToAssignById;
      .addCase(addAssignTask.pending, (state) => {
        state.pending = true;
      })
      .addCase(addAssignTask.fulfilled, (state, action) => {
        // state.pending = false;
        console.log(action.payload.taskId);
        state.tasks = state.tasks.filter(
          (t) => t.taskId !== action.payload.taskId
        );
      })
      .addCase(addAssignTask.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })

      // GetTaskFromAssignTaskByEmpId

      .addCase(getTaskUsingEmpId.pending, (state) => {
        state.pending = true;
      })
      .addCase(getTaskUsingEmpId.fulfilled, (state, action) => {
        state.pending = false;
        const taskArr = [];
        taskArr.push(action.payload);
        state.tasks = taskArr;
      })
      .addCase(getTaskUsingEmpId.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      // GetTaskFromAssignTaskByTaskId

      .addCase(getTaskUsingTaskId.pending, (state) => {
        state.pending = true;
      })
      .addCase(getTaskUsingTaskId.fulfilled, (state, action) => {
        state.pending = false;
        state.tasks = action.payload;
      })
      .addCase(getTaskUsingTaskId.rejected, (state, action) => {
        state.pending = false;
        // state.tasks = [];
        state.error = action.payload;
      })
      .addCase(getTaskDataAndGuidlinesByTaskId.pending, (state) => {
        state.pending = true;
      })
      .addCase(getTaskDataAndGuidlinesByTaskId.fulfilled, (state, action) => {
        state.pending = false;
        state.taskAndGuidelines = action.payload;
      })
      .addCase(getTaskDataAndGuidlinesByTaskId.rejected, (state, action) => {
        state.pending = false;
        // state.tasks = [];
        state.error = action.payload;
      })
      //updateapprovedTask
      .addCase(updateapprovedTask.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateapprovedTask.fulfilled, (state, action) => {
        state.pending = false;
        console.log(action.payload);
        //state.tasks.filter = action.payload;
        state.tasks = state.tasks.filter(
          (t) => t.taskId !== action.payload.taskId
        );
      })
      .addCase(updateapprovedTask.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      });
  },
});

// export const { updateFilteredTasks } = TaskSlice.actions;
export default TaskSlice.reducer;
