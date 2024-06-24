import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  deleteGuidlineByGuidlineId,
  deletePositionData,
  fetchPositionById,
  fetchPositionData,
  getChainPostionByIds,
  getGuidlineByGuidlineId,
  getPositionGuidlinesById,
  insertPositionData,
  insertpositionGuidline,
  updateGuidline,
} from "./PositionApi"

const initialState = {
  pendding: false,
  updatePendding: false,
  positions: [],
  error: null,
  deleteError: null,
  chainPositions: [],
  positionGuidline: {
    position: {},
    guidlines: [],
  },
  guidline: "",
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
  async (id, { rejectWithValue }) => {
    try {
      await deletePositionData(id)
      return id
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

export const insertGuidline = createAsyncThunk(
  "position/insertGuidline",
  async (guidline, { rejectWithValue }) => {
    try {
      const response = await insertpositionGuidline(guidline)
      return response.data
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

export const getGuidlinesById = createAsyncThunk(
  "position/getGuidlinesById",
  async (positionId, { rejectWithValue }) => {
    try {
      const response = await getPositionGuidlinesById(positionId)
      return response.data
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data
        return rejectWithValue(errorMessage)
      } else {
        return rejectWithValue("An unexpected error occurred")
      }
    }
  }
)

export const insertPosition = createAsyncThunk(
  "position/insertPosition",
  async (positionWithGuidlines, { rejectWithValue }) => {
    try {
      let response = await insertPositionData(positionWithGuidlines)
      const responsePositionWithGuidLine = response.data
      const { positionId, positionName, duration, durationType } =
        responsePositionWithGuidLine // const postion = { responsePositionWithGuidLine }
      let position = {
        positionId,
        positionName,
        durationType,
        duration,
      }
      return position
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

export const getPositionById = createAsyncThunk(
  "position/getPositionById",
  async (id) => {
    let response = await fetchPositionById(id)
    return response.data
  }
)

export const deleteGuidlineById = createAsyncThunk(
  "position/deleteGuidlineById",
  async (guidlineId) => {
    let response = await deleteGuidlineByGuidlineId(guidlineId)
    return response.data
  }
)

export const updateGuidlineById = createAsyncThunk(
  "position/updateGuidlineById",
  async ({ GuidlineId, name }) => {
    console.log(GuidlineId, name)
    let response = await updateGuidline(GuidlineId, name)
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

export const getGuidlineById = createAsyncThunk(
  "position/getGuidlineById",
  async (guidlineId) => {
    let response = await getGuidlineByGuidlineId(guidlineId)
    return response.data.positionGuidline
  }
)

export const PositionSlice = createSlice({
  name: "PositionSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosition.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.pendding = false
        state.positions = action.payload
      })
      .addCase(fetchPosition.rejected, (state, action) => {
        state.error = action.payload
        state.pendding = false
      })
      .addCase(deletePosition.pending, (state) => {
        state.deleteError = null
        state.pendding = true
      })
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.pendding = false
        state.positions = state.positions.filter(
          (position) => position.positionId !== action.payload
        )
      })
      .addCase(deletePosition.rejected, (state, action) => {
        state.pendding = false
        state.deleteError = action.payload
      })
      .addCase(insertPosition.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(insertPosition.fulfilled, (state, action) => {
        state.pendding = false
        state.positions.push(action.payload)
      })
      .addCase(insertPosition.rejected, (state, action) => {
        state.error = action.payload
        state.pendding = false
      })
      .addCase(getPositionById.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(getPositionById.fulfilled, (state, action) => {
        state.pendding = false
        state.chainPosition.push(action.payload)
      })
      .addCase(getPositionById.rejected, (state, action) => {
        state.error = action.payload
        state.pendding = false
      })
      .addCase(getPositionsByIds.pending, (state) => {
        state.error = null
        state.pendding = true
        state.chainPositions = []
      })
      .addCase(getPositionsByIds.fulfilled, (state, action) => {
        state.pendding = false
        state.chainPositions = action.payload
      })
      .addCase(getPositionsByIds.rejected, (state, action) => {
        state.error = action.payload
        state.pendding = false
      })
      .addCase(getGuidlinesById.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(getGuidlinesById.fulfilled, (state, action) => {
        state.pendding = false
        state.positionGuidline.position = action.payload.position
        state.positionGuidline.guidlines = action.payload.positionGuidelines
      })
      .addCase(getGuidlinesById.rejected, (state, action) => {
        state.error = action.payload
        state.pendding = false
      })
      .addCase(getGuidlineById.pending, (state) => {
        state.error = null
        state.pendding = true
      })
      .addCase(getGuidlineById.fulfilled, (state, action) => {
        state.pendding = false
        state.guidline = action.payload
      })
      .addCase(getGuidlineById.rejected, (state, action) => {
        state.error = action.payload
        state.pendding = false
      })
      .addCase(updateGuidlineById.pending, (state) => {
        state.error = null
        state.updatePendding = true
      })
      .addCase(updateGuidlineById.fulfilled, (state, action) => {
        state.updatePendding = false
        let guidline = state.positionGuidline.guidlines.find(
          (g) => g.positionGuidelineId === action.payload.id
        )
        guidline.positionGuidline = action.payload.name
      })
      .addCase(updateGuidlineById.rejected, (state, action) => {
        state.error = action.payload
        state.updatePendding = false
      })
      .addCase(deleteGuidlineById.pending, (state) => {
        state.error = null
        state.updatePendding = true
      })
      .addCase(deleteGuidlineById.fulfilled, (state, action) => {
        state.pendding = false
        state.positionGuidline.guidlines =
          state.positionGuidline.guidlines.filter(
            (guidline) => guidline.positionGuidelineId !== action.payload
          )
      })
      .addCase(deleteGuidlineById.rejected, (state, action) => {
        state.error = action.payload
        state.updatePendding = false
      })
      .addCase(insertGuidline.pending, (state) => {
        state.error = null
        state.updatePendding = true
      })
      .addCase(insertGuidline.fulfilled, (state, action) => {
        state.pendding = false

        const gudlines = state.positionGuidline.guidlines.filter(
          (g) => g.positionId === action.payload.positionId
        )

        console.log(gudlines)

        if (gudlines.length > 0) {
          state.positionGuidline.guidlines = [
            action.payload,
            ...state.positionGuidline.guidlines,
          ]
        } else {
          state.positionGuidline.guidlines = [action.payload]
        }
      })
      .addCase(insertGuidline.rejected, (state, action) => {
        state.error = action.payload
        state.updatePendding = false
      })
  },
})

export default PositionSlice.reducer
