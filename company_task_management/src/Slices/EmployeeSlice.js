import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { deleteEmpById, fetchEmployeeData, createEmp } from "./EmployeeApi"

const initialState = {
  pendding: false,
  employees: [],
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
  await createEmp(emp)
  return emp
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
  },
})

export const { incrementByAmount } = EmployeeSlice.actions
export const employee = (state) => state.Employee.employees
export default EmployeeSlice.reducer
