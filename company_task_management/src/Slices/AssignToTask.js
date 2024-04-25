import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateTaskSubmission } from "./AssignToTaskApi";

const initialState = {
  pendding: false,
  tasks: [],
  error: "",
};

export const updateTaskWithCompeletedate = createAsyncThunk(
  "tasks/updateTaskSubmission",
  async (updatedAssign) => {
    console.log(updatedAssign);
    const response = await updateTaskSubmission(updatedAssign);

    return response.data;
  }
);

export const AssignToTaskSlice = createSlice({
  name: "AssignToTaskSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateTaskWithCompeletedate.pending, (state) => {
        state.pendding = true;
      })
      .addCase(updateTaskWithCompeletedate.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.pendding = false;
      })
      .addCase(updateTaskWithCompeletedate.rejected, (state, action) => {
        state.pendding = false;
        state.error = action.payload;
      });
  },
});

export default AssignToTaskSlice.reducer;
