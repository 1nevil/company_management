import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchChainData, createChainName } from "./ChainMasterApi";

const initialState = {
  pendding: false,
  chainMaster: [],
  error: "",
};

export const fetchChainMater = createAsyncThunk("emps/fetchChain", async () => {
  const response = await fetchChainData();
  return response.data;
});

export const insertChainMater = createAsyncThunk(
  "emps/insertChain",
  async (chainName) => {
    const response = await createChainName(chainName);
    return response.data;
  }
);

export const ChainSliceMaster = createSlice({
  name: "ChainSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchChainMater.pending, (state) => {
        state.pendding = true;
      })
      .addCase(fetchChainMater.fulfilled, (state, action) => {
        state.chainMaster = action.payload;
        state.pendding = false;
      })
      .addCase(fetchChainMater.rejected, (state, action) => {
        state.pendding = false;
        state.error = action.payload;
      })
      .addCase(insertChainMater.pending, (state) => {
        state.pendding = true;
      })
      .addCase(insertChainMater.fulfilled, (state, action) => {
        state.chainMaster.push(action.payload);
        state.pendding = false;
      })
      .addCase(insertChainMater.rejected, (state, action) => {
        state.pendding = false;
        state.error = action.payload;
      });
  },
});

export default ChainSliceMaster.reducer;
