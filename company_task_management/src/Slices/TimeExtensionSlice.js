import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  ApproveTaskIncreaseTime,
  DisApproveTaskIncreaseTime,
  increaseTime,
} from "./TimeExtensionApi"

const initialState = {
  tasks: [],
  pending: false,
  error: null,
}
// for employee
export const addTimeincrease = createAsyncThunk(
  "task/addTimeincrease",
  async (TaskExtenstion, { rejectWithValue }) => {
    try {
      const response = await increaseTime(TaskExtenstion)
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

//for admin
export const approvetaskTimeextension = createAsyncThunk(
  "task/approvetaskTimeextension",
  async (
    { taskExtensionId, empTaskAss, AdminExtendedTime },
    { rejectWithValue }
  ) => {
    try {
      const response = await ApproveTaskIncreaseTime(
        taskExtensionId,
        empTaskAss,
        AdminExtendedTime
      )
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

export const DisapprovetaskTimeextension = createAsyncThunk(
  "task/DisapprovetaskTimeextension",
  async ({ taskExtensionId, empTaskAss }, { rejectWithValue }) => {
    try {
      const response = await DisApproveTaskIncreaseTime(
        taskExtensionId,
        empTaskAss
      )
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
const TimeExtensionSlice = createSlice({
  name: "TimeExtensionSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addTimeincrease.pending, (state, action) => {
        state.error = null
        state.pending = true
      })
      .addCase(addTimeincrease.fulfilled, (state, action) => {
        state.error = null
        state.pending = false
        state.tasks = [action.payload, ...state.tasks]
      })
      .addCase(addTimeincrease.rejected, (state, action) => {
        state.pending = false
        console.log(action.payload)
        state.error = action.payload
      })
      .addCase(approvetaskTimeextension.pending, (state, action) => {
        state.error = null
        state.pending = true
      })
      .addCase(approvetaskTimeextension.fulfilled, (state, action) => {
        state.error = null
        state.pending = false
        state.tasks = [action.payload, ...state.tasks]
      })
      .addCase(approvetaskTimeextension.rejected, (state, action) => {
        state.pending = false
        console.log(action.payload)
        state.error = action.payload
      })
      .addCase(DisapprovetaskTimeextension.pending, (state, action) => {
        state.error = null
        state.pending = true
      })
      .addCase(DisapprovetaskTimeextension.fulfilled, (state, action) => {
        state.error = null
        state.pending = false
      })
      .addCase(DisapprovetaskTimeextension.rejected, (state, action) => {
        state.pending = false
        console.log(action.payload)
        state.error = action.payload
      })
  },
})

// export const { updateFilteredTasks } = TaskSlice.actions;
export default TimeExtensionSlice.reducer
