import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { insertTaskData } from "./TaskApi"

const initialState = {
  pending: false,
  tasks: [],
  error: "",
}

export const insertTask = createAsyncThunk("task/insertTask", async (task) => {
  const response = await insertTaskData(task)
  return response.data
})

const TaskSlice = createSlice({
  name: "TaskSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(insertTask.pending, (state, action) => {
        state.pending = true
      })
      .addCase(insertTask.fulfilled, (state, action) => {
        state.pending = false
        state.tasks.push(action.payload)
      })
      .addCase(insertTask.error, (state, action) => {
        state.error = action.payload
      })
  },
})

export default TaskSlice.reducer
