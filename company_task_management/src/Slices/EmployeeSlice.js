import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  deleteEmpById,
  fetchEmployeeData,
  createEmp,
  approvedEmps,
  disapprovedEmps,
  approveNotApprove,
  checkersEmps,
  updateEmployeeData,
  fetchEmployeeDataById,
  resetPassword,
} from "./EmployeeApi"

const initialState = {
  pendding: false,
  employees: [],
  checkers: [],
  error: null,
}

export const updateEmp = createAsyncThunk("emps/updateEmp", async (id) => {
  await updateEmployeeData(id)
  return id
})

export const fetchEmp = createAsyncThunk("emps/fetchEmps", async () => {
  const response = await fetchEmployeeData()
  return response.data
})
export const fetchEmpById = createAsyncThunk(
  "emps/fetchEmpById",
  async (empid) => {
    const res = await fetchEmployeeDataById(empid)
    return res.data
  }
)

export const deleteEmp = createAsyncThunk(
  "emps/deleteEmp",
  async (id, { rejectWithValue }) => {
    try {
      const res = await deleteEmpById(id)
      return res.data
    } catch (error) {
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
// export const insertEmp = createAsyncThunk("emps/insertEmp", async (emp) => {
//   const res = await createEmp(emp);
//   return res.data;
// });
export const resetPasswordEmp = createAsyncThunk(
  "emps/resetPasswordEmp",
  async (employeeForm, { rejectWithValue }) => {
    try {
      const res = await resetPassword(employeeForm)
      return res.data
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

export const insertEmp = createAsyncThunk(
  "emps/insertEmp",
  async (formdata, { rejectWithValue }) => {
    try {
      const res = await createEmp(formdata)
      return res.data
    } catch (error) {
      console.log(error)
      if (error.response) {
        // Extract custom message from backend response
        const errorMessage = error.response.data.message
        return rejectWithValue(errorMessage)
      } else {
        return rejectWithValue("An unexpected error occurred")
      }
    }
  }
)
// export const insertChainMater = createAsyncThunk(
//   "emps/insertChain",
//   async (chainName, { rejectWithValue }) => {
//     try {
//       const response = await createChainName(chainName);
//       return response.data; // Assuming your backend returns the data directly
//     } catch (error) {
//       console.log(error);
//       if (error.response) {
//         // Extract custom message from backend response
//         const errorMessage = error.response.data.message;
//         return rejectWithValue(errorMessage);
//       } else {
//         return rejectWithValue("An unexpected error occurred");
//       }
//     }
//   }
// );

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
        state.error = null
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
      .addCase(resetPasswordEmp.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(resetPasswordEmp.fulfilled, (state, action) => {
        state.pendding = false
        console.log(action.payload)
      })
      .addCase(resetPasswordEmp.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(updateEmp.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(updateEmp.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp.employeeId !== action.payload
        )
      })
      .addCase(updateEmp.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(deleteEmp.pending, (state) => {
        state.error = null
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
        state.error = null
        state.pendding = true
      })
      .addCase(insertEmp.fulfilled, (state, action) => {
        console.log(action.payload)
        state.pendding = false
        state.employees = [action.payload, ...state.employees]
      })
      .addCase(insertEmp.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(allApproveEmps.pending, (state) => {
        state.error = null

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
        state.error = null
        state.pendding = true
      })
      .addCase(allDisapproveEmps.fulfilled, (state, action) => {
        state.pendding = false
        state.employees = action.payload
      })
      .addCase(allDisapproveEmps.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(approveDisapproveEmp.pending, (state, action) => {
        state.error = null

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
        state.pendding = false
      })
      .addCase(checkersEmp.pending, (state, action) => {
        state.error = null
        state.pendding = action.payload
      })
      .addCase(checkersEmp.fulfilled, (state, action) => {
        state.pendding = false
        state.checkers = action.payload
      })
      .addCase(checkersEmp.rejected, (state, action) => {
        state.error = action.payload
        state.pendding = false
      })
      //fetchEmpById
      .addCase(fetchEmpById.pending, (state) => {
        state.error = null

        state.pendding = true
      })
      .addCase(fetchEmpById.fulfilled, (state, action) => {
        console.log(action.payload)
        state.employee = action.payload
        state.pendding = false
      })
      .addCase(fetchEmpById.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
  },
})

export default EmployeeSlice.reducer
