import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  getCheckerDashBoardData,
  getDashBoardData,
  getEmployeeDashBoardData,
  getSuperAdminDashBoardData,
} from "./DashboardApi"

const initialState = {
  pending: false,
  dashBoardData: {
    emps: 0,
    chain: 0,
    task: 0,
    checkerPositionCounts: [],
    employeePositionCounts: [],
  },
  employeeDashBoard: {
    allTaskCount: 0,
    approvedTaskCount: 0,
    disapprovedTask: 0,
    notCheckedTask: 0,
    activeTask: 0,
  },
  checkerDashBoard: {
    notApprovedTaskCount: 0,
    approvedTaskCount: 0,
  },
  superAdminDashBoard: {
    notActiveEmployee: 0,
    activeEmployee: 0,
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

export const getCheckerDashBoardDatas = createAsyncThunk(
  "dashBoard/getCheckerDashBoardData",
  async (checkerId, { rejectWithValue }) => {
    try {
      const response = await getCheckerDashBoardData(checkerId)
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

export const getemployeeDashBoardDatas = createAsyncThunk(
  "dashBoard/getEmployeeDashBoardData",
  async (empId, { rejectWithValue }) => {
    try {
      const response = await getEmployeeDashBoardData(empId)
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

export const getSuperAdminDashBoardDatas = createAsyncThunk(
  "dashBoard/getSuperAdminDashBoardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSuperAdminDashBoardData()
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
      .addCase(getemployeeDashBoardDatas.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(getemployeeDashBoardDatas.fulfilled, (state, action) => {
        state.error = null
        state.pending = false
        state.employeeDashBoard = action.payload
      })
      .addCase(getemployeeDashBoardDatas.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })
      .addCase(getCheckerDashBoardDatas.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(getCheckerDashBoardDatas.fulfilled, (state, action) => {
        state.error = null
        state.pending = false
        state.checkerDashBoard = action.payload
      })
      .addCase(getCheckerDashBoardDatas.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })
      .addCase(getSuperAdminDashBoardDatas.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(getSuperAdminDashBoardDatas.fulfilled, (state, action) => {
        state.error = null
        state.pending = false
        state.superAdminDashBoard = action.payload
      })
      .addCase(getSuperAdminDashBoardDatas.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })
  },
})

export default DashBoardSlice.reducer
