import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  GetTaskAssignDataToChecker,
  GetTaskHistoryByEmpID,
  GetTaskHistoryUsingEmpID,
  approveDisapproveTask,
  getCompletedTaskForChecker,
  updateTaskSubmission,
  NotCheckedByChecker,
  getFileFromHistoryToCarryForward,
} from "./AssignToTaskApi"

const initialState = {
  pendding: false,
  tasks: [],
  taskHistory: [],
  checkerTaskList: [],
  taskCompletedButNotChecked: [],
  taskGuidlinesChecker: {},
  lastFileDetailHistory: {},
  error: null,
}

export const updateTaskWithCompeletedate = createAsyncThunk(
  "tasks/updateTaskSubmission",
  async (updatedAssign) => {
    console.log(updatedAssign)
    const response = await updateTaskSubmission(updatedAssign)

    return response.data
  }
)

export const getCompletedTaskDataForChecker = createAsyncThunk(
  "tasks/getCompletedTaskDataForChecker",
  async (empId, { rejectWithValue }) => {
    try {
      const response = await getCompletedTaskForChecker(empId)

      return response.data
    } catch (error) {
      console.log(error.response.data)
      if (error.response) {
        const errorMessage = error.response.data
        return rejectWithValue(errorMessage)
      } else {
        return rejectWithValue("An unexpected error occurred")
      }
    }
    // console.log(taskId);
    // console.log(response.data);
  }
)

export const getTaskAssignDataForChecker = createAsyncThunk(
  "tasks/checkerdata",
  async (id) => {
    const response = await GetTaskAssignDataToChecker(id)
    return response.data
  }
)

export const getTaskFromHistoryByEmpId = createAsyncThunk(
  "tasks/getTaskFromHistoryByEmpId",
  async (empid) => {
    const response = await GetTaskHistoryByEmpID(empid)
    return response.data
  }
)

export const getTaskFromHistoryUsingEmpId = createAsyncThunk(
  "tasks/getTaskFromHistoryUsingEmpId",
  async (empid, { rejectWithValue }) => {
    try {
      const response = await GetTaskHistoryUsingEmpID(empid)
      return response.data
    } catch (error) {
      // console.log(error.response);
      if (error.response) {
        const errorMessage = error.response.data.message
        return rejectWithValue(errorMessage)
      } else {
        return rejectWithValue("An unexpected error occurred")
      }
    }
    // console.log(taskId);
    // console.log(response.data);
  }
)

export const getFileFromHistoryToSendNextEmployee = createAsyncThunk(
  "tasks/lastFileDetailHistory",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await getFileFromHistoryToCarryForward(taskId)
      return response.data
    } catch (error) {
      // console.log(error.response);
      if (error.response) {
        const errorMessage = error.response.data.message
        return rejectWithValue(errorMessage)
      } else {
        return rejectWithValue("An unexpected error occurred")
      }
    }
    // console.log(taskId);
    // console.log(response.data);
  }
)

export const NotCheckedByCheckerData = createAsyncThunk(
  "tasks/NotCheckedByCheckerData",
  async (empid, { rejectWithValue }) => {
    try {
      const response = await NotCheckedByChecker(empid)
      return response.data
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data
        return rejectWithValue(errorMessage)
      } else {
        return rejectWithValue("An unexpected error occurred")
      }
    }
    // console.log(taskId);
    // console.log(response.data);
  }
)

export const approveDisapprove = createAsyncThunk(
  "empTask/approveDisapprove",
  async (empAssTask) => {
    const response = await approveDisapproveTask(empAssTask)
    console.log(response.data.empTaskAssignment.empTaskId)
    return response.data.empTaskAssignment.empTaskId
  }
)

export const AssignToTaskSlice = createSlice({
  name: "AssignToTaskSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateTaskWithCompeletedate.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(updateTaskWithCompeletedate.fulfilled, (state, action) => {
        state.employees = action.payload
        state.pendding = false
      })
      .addCase(updateTaskWithCompeletedate.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(getCompletedTaskDataForChecker.pending, (state) => {
        state.tasks = []
        state.error = null
        state.pendding = true
      })
      .addCase(getCompletedTaskDataForChecker.fulfilled, (state, action) => {
        state.pendding = false
        state.checkerTaskList = action.payload
      })
      .addCase(getCompletedTaskDataForChecker.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      //getTaskAssignDataForChecker
      .addCase(getTaskAssignDataForChecker.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(getTaskAssignDataForChecker.fulfilled, (state, action) => {
        state.pendding = false
        state.taskGuidlinesChecker = action.payload
        console.log(action)
      })
      .addCase(getTaskAssignDataForChecker.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      //getTaskFromHistoryByEmpId
      .addCase(getTaskFromHistoryByEmpId.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(getTaskFromHistoryByEmpId.fulfilled, (state, action) => {
        state.pendding = false
        state.taskHistory = action.payload
      })
      .addCase(getTaskFromHistoryByEmpId.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      //getTaskFromHistoryUsingEmpId
      .addCase(getTaskFromHistoryUsingEmpId.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(getTaskFromHistoryUsingEmpId.fulfilled, (state, action) => {
        state.pendding = false
        state.tasks = action.payload
      })
      .addCase(getTaskFromHistoryUsingEmpId.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      //Not checked By checker data
      .addCase(NotCheckedByCheckerData.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(NotCheckedByCheckerData.fulfilled, (state, action) => {
        state.pendding = false
        state.taskCompletedButNotChecked = action.payload
      })
      .addCase(NotCheckedByCheckerData.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(approveDisapprove.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(approveDisapprove.fulfilled, (state, action) => {
        state.pendding = false
        state.taskCompletedButNotChecked =
          state.taskCompletedButNotChecked.filter(
            (task) => task.AssignToTaskSlice !== action.payload
          )
      })
      .addCase(approveDisapprove.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(getFileFromHistoryToSendNextEmployee.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(
        getFileFromHistoryToSendNextEmployee.fulfilled,
        (state, action) => {
          state.pendding = false
          const lastFileHistory = action.payload.length - 1
          state.lastFileDetailHistory = action.payload[lastFileHistory]
        }
      )
      .addCase(
        getFileFromHistoryToSendNextEmployee.rejected,
        (state, action) => {
          state.pendding = false
          state.error = action.payload
        }
      )
  },
})

export default AssignToTaskSlice.reducer
