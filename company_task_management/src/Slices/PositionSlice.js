import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  deletePositionData,
  fetchPositionById,
  fetchPositionData,
  getChainPostionByIds,
  insertPositionData,
} from "./PositionApi"

const initialState = {
  pendding: false,
  positions: [],
  error: "",
  chainPositions: [],
}

export const fetchPosition = createAsyncThunk(
  "position/fetchPosition",
  async () => {
    const response = await fetchPositionData()
    return response.data
  }
)

export const deletePosition = createAsyncThunk(
  "position/deletePosition",
  async (id) => {
    await deletePositionData(id)
    return id
  }
)

export const insertPosition = createAsyncThunk(
  "position/insertPosition",
  async (positionWithGuidlines) => {
    let response = await insertPositionData(positionWithGuidlines)
    const responsePositionWithGuidLine = response.data
    const { positionId, positionName, duration, unitName, rate, unit } =
      responsePositionWithGuidLine // const postion = { responsePositionWithGuidLine }
    let position = { positionId, positionName, duration, unitName, rate, unit }
    return position
  }
)

export const getPositionById = createAsyncThunk(
  "position/getPositionById",
  async (id) => {
    let response = await fetchPositionById(id)
    return response.data
  }
)

export const getPositionsByIds = createAsyncThunk(
  "position/getPositionsByIds",
  async (ids) => {
    let response = await getChainPostionByIds(ids)
    console.log("🚀 ~ response:", response)

    return response.data
  }
)

export const PositionSlice = createSlice({
  name: "PositionSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosition.pending, (state) => {
        state.pendding = true
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.pendding = false
        state.positions = action.payload
      })
      .addCase(fetchPosition.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(deletePosition.pending, (state) => {
        state.pendding = true
      })
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.pendding = false
        state.positions = state.positions.filter(
          (position) => position.positionId !== action.payload
        )
      })
      .addCase(deletePosition.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(insertPosition.pending, (state) => {
        state.pendding = true
      })
      .addCase(insertPosition.fulfilled, (state, action) => {
        state.pendding = false
        state.positions.push(action.payload)
      })
      .addCase(insertPosition.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(getPositionById.pending, (state) => {
        state.pendding = true
      })
      .addCase(getPositionById.fulfilled, (state, action) => {
        state.pendding = false
        state.chainPosition.push(action.payload)
      })
      .addCase(getPositionById.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(getPositionsByIds.pending, (state) => {
        state.pendding = true
        state.chainPositions = []
      })
      .addCase(getPositionsByIds.fulfilled, (state, action) => {
        state.pendding = false
        state.chainPositions = action.payload
      })
      .addCase(getPositionsByIds.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export default PositionSlice.reducer
