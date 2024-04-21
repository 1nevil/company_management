import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  fetchChainDetailChainId,
  insertChainDetailsData,
} from "./ChainDetailsApi"

export const insertChainDetails = createAsyncThunk(
  "chain/insertChainDetails",
  async (chainDetails) => {
    const response = await insertChainDetailsData(chainDetails)
    return response.data
  }
)

export const getChainDetailsByChainId = createAsyncThunk(
  "chain/getDetailsByChainId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchChainDetailChainId(id)
      return response.data // Assuming your backend returns the data directly
    } catch (error) {
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

const initialState = {
  pending: false,
  chainDetails: [],
  error: "",
  chainDetail: {},
  chainFlow: "",
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
      .addCase(getChainDetailsByChainId.pending, (state) => {
        state.chainDetail = {}
        state.pending = true
      })
      .addCase(getChainDetailsByChainId.fulfilled, (state, action) => {
        state.pending = false
        state.chainDetail = action.payload
        state.chainFlow = state.chainDetail.chainFlow
      })
      .addCase(getChainDetailsByChainId.rejected, (state, action) => {
        state.pending = false
        state.chainFlow = ""
        state.chainDetail = {}

        state.error = action.payload
      })
  },
})

export default ChainSliceMaster.reducer
