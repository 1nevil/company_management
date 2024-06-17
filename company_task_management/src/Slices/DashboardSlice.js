import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getDashBoardData } from "./DashboardApi"

const initialState = {
  pending: false,
  dashBoardData: {
    emps: 0,
    chain: 0,
    task: 0,
    checkerPositionCounts: [],
    employeePositionCounts: [],
  },
  error: null,
}

export const getDashBoardDatas = createAsyncThunk(
  "dashBoard/getDashBoardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDashBoardData()
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

const DashBoardSlice = createSlice({
  name: "dashBoard",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDashBoardDatas.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(getDashBoardDatas.fulfilled, (state, action) => {
        state.error = null
        state.pending = false
        state.dashBoardData = action.payload
      })
      .addCase(getDashBoardDatas.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })
  },
})

export default DashBoardSlice.reducer
