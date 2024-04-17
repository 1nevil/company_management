import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchChainData } from "./ChainApi";

const initialState = {
  pendding: false,
  chains: [],
  error: "",
};

export const fetchEmp = createAsyncThunk("emps/fetchChain", async () => {
  const response = await fetchChainData();
  return response.data;
});

export const ChainSlice = createSlice({
  name: "ChainSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmp.pending, (state) => {
        state.pendding = true;
      })
      .addCase(fetchEmp.fulfilled, (state, action) => {
        state.chains = action.payload;
        state.pendding = false;
      })
      .addCase(fetchEmp.rejected, (state, action) => {
        state.pendding = false;
        state.error = action.payload;
      });
  },
});

export default ChainSlice.reducer;
