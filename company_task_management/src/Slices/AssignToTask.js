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
  getCheckerTaskHistory,
  getTaskHistoryDetailsByIdforChecker,
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
  getHistoryDetail: {
    messages: [],
    employee: null,
    taskDetails: null,
    guidelines: null,
    checklist: null,
    empTaskHistory: null,
  },
}

// export const
//  updateTaskWithCompletedDate = createAsyncThunk(
//   "tasks/updateTaskSubmission",
//   async (updatedAssign) => {
//     const response = await updateTaskSubmission(updatedAssign)
//     return response.data
//   }
// )

export const getCompletedTaskDataForChecker = createAsyncThunk(
  "tasks/getCompletedTaskDataForChecker",
  async (empId, { rejectWithValue }) => {
    try {
      const response = await getCompletedTaskForChecker(empId)
      return response.data
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data
        return rejectWithValue(errorMessage)
      } else {
        return rejectWithValue("An unexpected error occurred")
      }
    }
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

export const getCheckerTaskHistoryByCheckerId = createAsyncThunk(
  "tasks/getCheckerTaskHistoryByCheckerId",
  async (checkerId) => {
    const response = await getCheckerTaskHistory(checkerId)
    return response.data
  }
)

export const getHistoryOfTaskDetailsByIdforChecker = createAsyncThunk(
  "tasks/getHistoryOfTaskDetailsByIdforChecker",
  async (taskHistoryId) => {
    const response = await getTaskHistoryDetailsByIdforChecker(taskHistoryId)
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
      if (error.response) {
        const errorMessage = error.response.data.message
        return rejectWithValue(errorMessage)
      } else {
        return rejectWithValue("An unexpected error occurred")
      }
    }
  }
)

export const getFileFromHistoryToSendNextEmployee = createAsyncThunk(
  "tasks/lastFileDetailHistory",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await getFileFromHistoryToCarryForward(taskId)
      return response.data
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message
        return rejectWithValue(errorMessage)
      } else {
        return rejectWithValue("An unexpected error occurred")
      }
    }
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
  }
)

export const approveDisapprove = createAsyncThunk(
  "empTask/approveDisapprove",
  async (empAssTask) => {
    const response = await approveDisapproveTask(empAssTask)
    return response.data.empTaskAssignment.empTaskId
  }
)

export const AssignToTaskSlice = createSlice({
  name: "AssignToTaskSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      // .addCase(updateTaskWithCompletedDate.pending, (state) => {
      //   state.error = null
      //   state.pendding = true
      // })
      // .addCase(updateTaskWithCompletedDate.fulfilled, (state, action) => {
      //   state.employees = action.payload
      //   state.pendding = false
      // })
      // .addCase(updateTaskWithCompletedDate.rejected, (state, action) => {
      //   state.pendding = false
      //   state.error = action.payload
      // })
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
      .addCase(getTaskAssignDataForChecker.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(getTaskAssignDataForChecker.fulfilled, (state, action) => {
        state.pendding = false
        state.taskGuidlinesChecker = action.payload
      })
      .addCase(getTaskAssignDataForChecker.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
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
        state.pending = false
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
      .addCase(getCheckerTaskHistoryByCheckerId.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(getCheckerTaskHistoryByCheckerId.fulfilled, (state, action) => {
        state.pendding = false
        state.taskHistory = action.payload
      })
      .addCase(getCheckerTaskHistoryByCheckerId.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(getHistoryOfTaskDetailsByIdforChecker.pending, (state) => {
        state.pendding = true
        state.error = null
        state.getHistoryDetail = {
          messages: [],
          employee: null,
          taskDetails: null,
          guidelines: null,
          checklist: null,
          empTaskHistory: null,
        }
      })
      .addCase(
        getHistoryOfTaskDetailsByIdforChecker.fulfilled,
        (state, action) => {
          state.pendding = false
          state.error = null
          const payload = action.payload

          state.getHistoryDetail.employee = payload.employee
          state.getHistoryDetail.taskDetails = payload.task
          state.getHistoryDetail.guidelines = payload.guidelines || []
          state.getHistoryDetail.checklist = payload.checklist || []
          state.getHistoryDetail.messages = payload.message
            ? payload.message.split(",")
            : []
          state.getHistoryDetail.empTaskHistory = payload.empTaskHistory
        }
      )
      .addCase(
        getHistoryOfTaskDetailsByIdforChecker.rejected,
        (state, action) => {
          state.pendding = false
          state.error = action.payload
        }
      )
  },
})

export default AssignToTaskSlice.reducer
