import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  deleteChecklistById,
  getChecklistByTaskId,
  insertChecklist,
  updateChecklist,
} from "./ChecklistApi"

const initialState = {
  pending: false,
  error: null,
  formPending: false,
  taskWithChecklist: {
    task: {},
    checklists: [],
  },
}

export const getchecklistsByTaskId = createAsyncThunk(
  "emps/getchecklistsByTaskId",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await getChecklistByTaskId(taskId)
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

export const updateChecklistById = createAsyncThunk(
  "emps/updateChecklistById",
  async (checklist, { rejectWithValue }) => {
    try {
      const response = await updateChecklist(checklist)
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

export const insertChecklistTask = createAsyncThunk(
  "emps/insertChecklistTask",
  async (checklist, { rejectWithValue }) => {
    try {
      const response = await insertChecklist(checklist)
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

export const deleteChecklistByChecklistId = createAsyncThunk(
  "emps/deleteChecklist",
  async (checkListId, { rejectWithValue }) => {
    try {
      const response = await deleteChecklistById(checkListId)
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

export const ChecklistSlice = createSlice({
  name: "ChecklistSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getchecklistsByTaskId.pending, (state) => {
        state.pending = true
        state.error = null
      })
      .addCase(getchecklistsByTaskId.fulfilled, (state, action) => {
        state.pending = false
        state.taskWithChecklist.task = action.payload.task
        state.taskWithChecklist.checklists = action.payload.checklists
      })
      .addCase(getchecklistsByTaskId.rejected, (state, action) => {
        state.error = action.payload
        state.pending = false
      })
      .addCase(deleteChecklistByChecklistId.pending, (state) => {
        state.pending = true
        state.error = null
      })
      .addCase(deleteChecklistByChecklistId.fulfilled, (state, action) => {
        state.pending = false
        state.taskWithChecklist.checklists =
          state.taskWithChecklist.checklists.filter(
            (checklist) => checklist.checklistId !== action.payload
          )
      })
      .addCase(deleteChecklistByChecklistId.rejected, (state, action) => {
        state.error = action.payload
        state.pending = false
      })
      .addCase(insertChecklistTask.pending, (state) => {
        state.formPending = true
        state.error = null
      })
      .addCase(insertChecklistTask.fulfilled, (state, action) => {
        state.formPending = false
        const checklist = state.taskWithChecklist.checklists.filter(
          (g) => g.taskId === action.payload.taskId
        )

        if (checklist.length > 0) {
          state.taskWithChecklist.checklists = [
            action.payload,
            ...state.taskWithChecklist.checklists,
          ]
        } else {
          state.taskWithChecklist.checklists = [action.payload]
        }
      })
      .addCase(insertChecklistTask.rejected, (state, action) => {
        state.error = action.payload
        state.formPending = false
      })
      .addCase(updateChecklistById.pending, (state) => {
        state.formPending = true
        state.error = null
      })
      .addCase(updateChecklistById.fulfilled, (state, action) => {
        state.formPending = false
        console.log(action.payload)

        const checklist = state.taskWithChecklist.checklists.find(
          (c) => c.checklistId === action.payload.checklistId
        )
        console.log(checklist)

        checklist.taskMessage = action.payload.taskMessage
        checklist.status = action.payload.status
      })
      .addCase(updateChecklistById.rejected, (state, action) => {
        state.error = action.payload
        state.formPending = false
      })
  },
})

export default ChecklistSlice.reducer
