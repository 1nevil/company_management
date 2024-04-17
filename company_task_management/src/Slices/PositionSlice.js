import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deletePositionData,
  fetchPositionData,
  insertPositionData,
} from "./PositionApi";

const initialState = {
  pendding: false,
  positions: [],
  error: "",
};

export const fetchPosition = createAsyncThunk(
  "position/fetchPosition",
  async () => {
    const response = await fetchPositionData();
    return response.data;
  }
);

export const deletePosition = createAsyncThunk(
  "position/deletePosition",
  async (id) => {
    await deletePositionData(id);
    return id;
  }
);

export const insertPosition = createAsyncThunk(
  "position/insertPosition",
  async (position) => {
    let response = await insertPositionData(position);
    return response.data;
  }
);

export const PositionSlice = createSlice({
  name: "PositionSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosition.pending, (state) => {
        state.pendding = true;
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.pendding = false;
        state.positions = action.payload;
      })
      .addCase(fetchPosition.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deletePosition.pending, (state) => {
        state.pendding = true;
      })
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.pendding = false;
        state.positions = state.positions.filter(
          (position) => position.positionId !== action.payload
        );
      })
      .addCase(deletePosition.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(insertPosition.pending, (state) => {
        state.pendding = true;
      })
      .addCase(insertPosition.fulfilled, (state, action) => {
        state.pendding = false;
        state.positions.push(action.payload);
      })
      .addCase(insertPosition.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default PositionSlice.reducer;
