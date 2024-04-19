import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { insertChainDetailsData } from "./ChainDetailsApi"

export const insertChainDetails = createAsyncThunk(
  "emps/insertChainDetails",
  async (chainDetails) => {
    const response = await insertChainDetailsData(chainDetails)
    return response.data
  }
)

const initialState = {
  pending: false,
  chainDetails: [],
  error: "",
}

export const ChainSliceMaster = createSlice({
  name: "ChainDetailsSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(insertChainDetails.pending, (state) => {
        state.pending = true
      })
      .addCase(insertChainDetails.fulfilled, (state, action) => {
        state.chainDetails = action.payload
        state.pending = false
      })
      .addCase(insertChainDetails.rejected, (state, action) => {
        state.pending = false
        state.error = action.payload
      })
  },
})

export default ChainSliceMaster.reducer
