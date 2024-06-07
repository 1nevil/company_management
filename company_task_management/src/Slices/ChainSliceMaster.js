import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchChainData, createChainName } from "./ChainMasterApi"

const initialState = {
  pendding: false,
  chainMaster: [],
  error: "",
}

export const fetchChainMater = createAsyncThunk("emps/fetchChain", async () => {
  const response = await fetchChainData()
  return response.data
})

export const insertChainMater = createAsyncThunk(
  "emps/insertChain",
  async (chainName, { rejectWithValue }) => {
    try {
      const response = await createChainName(chainName)
      return response.data // Assuming your backend returns the data directly
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

export const ChainSliceMaster = createSlice({
  name: "ChainSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchChainMater.pending, (state) => {
        state.pendding = true
      })
      .addCase(fetchChainMater.fulfilled, (state, action) => {
        state.chainMaster = action.payload
        state.pendding = false
      })
      .addCase(fetchChainMater.rejected, (state, action) => {
        state.pendding = false
        state.error = action.payload
      })
      .addCase(insertChainMater.pending, (state) => {
        state.pendding = true
      })
      .addCase(insertChainMater.fulfilled, (state, action) => {
        state.chainMaster = [action.payload, ...state.chainMaster]
        state.pendding = false
      })
      .addCase(insertChainMater.rejected, (state, action) => {
        state.pendding = false
        console.log(action.payload)
        state.error = action.payload
      })
  },
})

export default ChainSliceMaster.reducer
