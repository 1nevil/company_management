import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  deleteEmpById,
  fetchEmployeeData,
  createEmp,
  approvedEmps,
  disapprovedEmps,
  approveNotApprove,
  checkersEmps,
} from "./EmployeeApi"

const initialState = {
  pendding: false,
  employees: [],
  checkers: [],
  error: "",
}

export const fetchEmp = createAsyncThunk("emps/fetchEmps", async () => {
  const response = await fetchEmployeeData()
  return response.data
})

export const deleteEmp = createAsyncThunk("emps/deleteEmp", async (id) => {
  await deleteEmpById(id)
  return id
})

export const insertEmp = createAsyncThunk("emps/insertEmp", async (emp) => {
  const res = await createEmp(emp)
  return res.data
})

export const allApproveEmps = createAsyncThunk("emps/approvedEmp", async () => {
  const response = await approvedEmps()
  return response.data
})

export const allDisapproveEmps = createAsyncThunk(
  "emps/DisapproveEmp",
  async () => {
    const response = await disapprovedEmps()
    return response.data
  }
)

export const approveDisapproveEmp = createAsyncThunk(
  "emps/ApproveDisapprove",
  async (id) => {
    await approveNotApprove(id)
    return id
  }
)

export const checkersEmp = createAsyncThunk("emps/checkers", async () => {
  const res = await checkersEmps()
  return res.data
})

export const EmployeeSlice = createSlice({
  name: "EmployeeSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmp.pending, (state) => {
        state.pendding = true
      })
      .addCase(fetchEmp.fulfilled, (state, action) => {
        state.employees = action.payload
        state.pendding = false
      })
      .addCase(fetchEmp.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(deleteEmp.pending, (state) => {
        state.pendding = true
      })
      .addCase(deleteEmp.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp.employeeId !== action.payload
        )
      })
      .addCase(deleteEmp.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(insertEmp.pending, (state) => {
        state.pendding = true
      })
      .addCase(insertEmp.fulfilled, (state, action) => {
        state.employees.push(action.payload)
      })
      .addCase(insertEmp.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(allApproveEmps.pending, (state) => {
        state.pendding = true
      })
      .addCase(allApproveEmps.fulfilled, (state, action) => {
        state.pendding = false
        state.employees = action.payload
      })
      .addCase(allApproveEmps.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(allDisapproveEmps.pending, (state, action) => {
        state.pendding = true
      })
      .addCase(allDisapproveEmps.fulfilled, (state, action) => {
        state.pendding = false
        state.employees = action.payload
      })
      .addCase(allDisapproveEmps.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(approveDisapproveEmp.pending, (state, action) => {
        state.pendding = action.payload
      })
      .addCase(approveDisapproveEmp.fulfilled, (state, action) => {
        state.pendding = false
        state.employees = state.employees.filter(
          (emp) => emp.employeeId !== action.payload
        )
      })
      .addCase(approveDisapproveEmp.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(checkersEmp.pending, (state, action) => {
        state.pendding = action.payload
      })
      .addCase(checkersEmp.fulfilled, (state, action) => {
        state.pendding = false
        state.checkers = action.payload
      })
      .addCase(checkersEmp.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export default EmployeeSlice.reducer
