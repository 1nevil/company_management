import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  pendding: false,
  Roles: [],
  error: "",
}

export const EmployeeSlice = createSlice({
  name: "EmployeeSlice",
  initialState,
  extraReducers: (builder) => {
    
  },
})
