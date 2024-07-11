import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  GetTaskFromAssignTaskByEmpId,
  addTaskToAssignById,
  approvedTask,
  getAllTask,
  getTaskAndGuidlinesByTaskId,
  getTaskByPostionId,
  getTaskByTaskId,
  getTaskByTaskPositionId,
  insertTaskData,
  getHistoryDetailsById,
  deleteTaskByTaskId,
} from "./TaskApi"

const initialState = {
  pending: false,
  tasks: [],
  error: null,
  taskAndGuidelines: [],
  completeTaskDetailForAdmin: {
    taskMaster: {},
    chainMaster: {},
    chainDetails: [],
    positionMaster: {},
    positionGuidelines: [],
    checklistMasters: [],
    history: [],
  },
  getActiveTaskDetail: {},
  getHistoryDetail: {
    messages: [],
    checker: null,
    taskDetails: null,
    guidelines: null,
    checklist: null,
    empTaskHistory: null,
    employee: null,
  },
}

export const insertTask = createAsyncThunk(
  "task/insertTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await insertTaskData(task)
      return response.data // Assuming your backend returns the data directly
    } catch (error) {
      console.log(error.response.data)
      if (error.response) {
        // Extract custom message from backend response
        const errorMessage = error.response.data
        return rejectWithValue(errorMessage)
      } else {
        return rejectWithValue("An unexpected error occurred")
      }
    }
  }
)

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await deleteTaskByTaskId(taskId)
      return response.data // Assuming your backend returns the data directly
    } catch (error) {
      console.log(error.response.data)
      if (error.response) {
        // Extract custom message from backend response
        const errorMessage = error.response.data
        return rejectWithValue(errorMessage)
      } else {
        return rejectWithValue("An unexpected error occurred")
      }
    }
  }
)

//getTaskByPostionId;
export const getPositionWiseTask = createAsyncThunk(
  "task/getPositionWiseTask",
  async (positionId, { rejectWithValue }) => {
    try {
      const response = await getTaskByPostionId(positionId)
      console.log(response)
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
//getAllTasks
export const getAllTasks = createAsyncThunk("task/getAllTasks", async () => {
  const response = await getAllTask()
  return response.data
})
// addAssignTask
export const addAssignTask = createAsyncThunk(
  "task/addAssignTask",
  async (task, { rejectWithValue }) => {
    try {
      console.log(task)
      const response = await addTaskToAssignById(task)
      console.log("🚀 ~ response:", response)
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

// GetTaskFromAssignTaskByEmpId
export const getTaskUsingEmpId = createAsyncThunk(
  "task/getTaskUsingEmpId",
  async (empId) => {
    const response = await GetTaskFromAssignTaskByEmpId(empId)
    return response.data
  }
)

// getTaskByTaskId
export const getTaskUsingTaskId = createAsyncThunk(
  "task/getTaskUsingTaskId",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await getTaskByTaskId(taskId)
      return response.data.responseData
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

export const getTaskUsingTaskIdAndPostionId = createAsyncThunk(
  "task/getTaskUsingTaskIdAndPostionId",
  async ({ positionId, taskId }, { rejectWithValue }) => {
    try {
      const response = await getTaskByTaskPositionId(positionId, taskId)
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
  }
)

export const getHistoryDetails = createAsyncThunk(
  "task/getHistoryDetails",
  async (taskHistoryId, { rejectWithValue }) => {
    try {
      const response = await getHistoryDetailsById(taskHistoryId)
      return response.data
    } catch (error) {
      console.log(error.response)
      if (error.response) {
        const errorMessage = error.response.data
        return rejectWithValue(errorMessage)
      } else {
        return rejectWithValue("An unexpected error occurred")
      }
    }
  }
)

export const getTaskDataAndGuidlinesByTaskId = createAsyncThunk(
  "task/getTaskAndGuidlinesByTaskId",
  async (taskId) => {
    const response = await getTaskAndGuidlinesByTaskId(taskId)
    return response.data
  }
)

export const updateapprovedTask = createAsyncThunk(
  "emptask/emptaskId",
  async (emptaskId) => {
    const response = await approvedTask(emptaskId)
    return response.data
  }
)

const TaskSlice = createSlice({
  name: "TaskSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(insertTask.pending, (state, action) => {
        state.error = null
        state.pending = true
      })
      .addCase(insertTask.fulfilled, (state, action) => {
        state.error = null
        state.pending = false
        state.tasks = [action.payload, ...state.tasks]
      })
      .addCase(insertTask.rejected, (state, action) => {
        state.pending = false
        console.log(action.payload)
        state.error = action.payload
      })
      //addAssignTask
      .addCase(getAllTasks.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.pending = false
        state.tasks = action.payload
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })
      //   getTaskByPostionId
      .addCase(getPositionWiseTask.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(getPositionWiseTask.fulfilled, (state, action) => {
        state.pending = false
        state.tasks = action.payload
      })
      .addCase(getPositionWiseTask.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })
      //addTaskToAssignById;
      .addCase(addAssignTask.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(addAssignTask.fulfilled, (state, action) => {
        state.pending = false
        console.log(action.payload)
        console.log(state.tasks)
        state.tasks = state.tasks.filter(
          (t) => t.taskId !== action.payload.taskId
        )
      })
      .addCase(addAssignTask.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })

      // GetTaskFromAssignTaskByEmpId

      .addCase(getTaskUsingEmpId.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(getTaskUsingEmpId.fulfilled, (state, action) => {
        state.pending = false
        const taskArr = []
        taskArr.push(action.payload)
        state.tasks = taskArr
      })
      .addCase(getTaskUsingEmpId.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })

      // getTaskUsingTaskId

      .addCase(getTaskUsingTaskId.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(getTaskUsingTaskId.fulfilled, (state, action) => {
        state.pending = false
        const payload = action.payload
        state.completeTaskDetailForAdmin.chainDetails = payload.chainDetails
        state.completeTaskDetailForAdmin.taskMaster = payload.taskMaster
        state.completeTaskDetailForAdmin.chainMaster = payload.chainMaster
        state.completeTaskDetailForAdmin.checklistMasters =
          payload.checklistMasters
        state.completeTaskDetailForAdmin.positionGuidelines =
          payload.positionGuidelines
        state.completeTaskDetailForAdmin.history = payload.history
        state.completeTaskDetailForAdmin.positionMaster = payload.positionMaster
      })
      .addCase(getTaskUsingTaskId.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })

      .addCase(getTaskDataAndGuidlinesByTaskId.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(getTaskDataAndGuidlinesByTaskId.fulfilled, (state, action) => {
        state.pending = false
        state.taskAndGuidelines = action.payload
      })
      .addCase(getTaskDataAndGuidlinesByTaskId.rejected, (state, action) => {
        state.pending = false
        // state.tasks = [];
        state.error = action.payload
      })
      //updateapprovedTask
      .addCase(updateapprovedTask.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(updateapprovedTask.fulfilled, (state, action) => {
        state.pending = false
        //state.tasks.filter = action.payload;
        state.tasks = state.tasks.filter(
          (t) => t.taskId !== action.payload.taskId
        )
      })
      .addCase(updateapprovedTask.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })
      .addCase(getTaskUsingTaskIdAndPostionId.pending, (state) => {
        state.pending = true
        state.error = null
      })
      .addCase(getTaskUsingTaskIdAndPostionId.fulfilled, (state, action) => {
        state.pending = false
        state.error = null
        state.getActiveTaskDetail = action.payload
      })
      .addCase(getTaskUsingTaskIdAndPostionId.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })
      //get History detail by history Id
      .addCase(getHistoryDetails.pending, (state) => {
        state.pending = true
        state.error = null
        state.getHistoryDetail = {
          messages: [],
          checker: {},
          taskDetails: null,
          guidelines: null,
          checklist: null,
          empTaskHistory: null,
          employee: {},
        }
      })
      .addCase(getHistoryDetails.fulfilled, (state, action) => {
        state.pending = false
        const payload = action.payload
        console.log(payload)

        state.getHistoryDetail.checker = payload.checker
        state.getHistoryDetail.taskDetails = payload.task
        state.getHistoryDetail.guidelines = payload.guidelines || []
        state.getHistoryDetail.checklist = payload.checklist || []
        state.getHistoryDetail.messages = payload.message
          ? payload.message.split(",")
          : []
        state.getHistoryDetail.empTaskHistory = payload.empTaskHistory
        console.log(payload)
        state.getHistoryDetail.employee = payload.employee
      })
      .addCase(getHistoryDetails.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })
      .addCase(deleteTask.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.pending = false
        state.tasks = state.tasks.filter(
          (task) => task.taskId !== action.payload
        )
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })
  },
})

// export const { updateFilteredTasks } = TaskSlice.actions;
export default TaskSlice.reducer
