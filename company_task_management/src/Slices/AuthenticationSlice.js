import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginAuthUser } from "./AuthenticationApi"
import { jwtDecode } from "jwt-decode"

const initialState = {
  initialPending: true,
  pending: false,
  token: null,
  error: null,
  authicatedUser: null,
  isAuthenticate: false,
}

export const loginUser = createAsyncThunk(
  "emps/fetchEmps",
  async (user, { rejectWithValue }) => {
    try {
      const response = await loginAuthUser(user)
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

export const AuthenticationSlice = createSlice({
  name: "AuthenticationSlice",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      const token = localStorage.getItem("token")
      if (token) {
        const user = jwtDecode(token)
        console.table(user)

        const currentTime = Math.floor(Date.now() / 1000)
        if (user.exp && user.exp < currentTime) {
          localStorage.removeItem("token")
          state.isAuthenticate = false
          state.authicatedUser = null
        } else {
          state.isAuthenticate = true
          state.authicatedUser = user
        }
      } else {
        state.isAuthenticate = false
        state.authicatedUser = null
      }
      state.initialPending = false
    },
    clearUserToken: (state) => {
      state.isAuthenticate = false
      state.authicatedUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null
        state.pending = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const token = action.payload.token
        state.pending = false

        if (token) {
          state.token = token
          state.pending = false
          state.error = null
          localStorage.setItem("token", token)

          const user = jwtDecode(token)

          console.log(
            user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
          )

          state.isAuthenticate = true
          state.authicatedUser = user
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.token = null
        state.pending = false
        state.error = action.payload
      })
  },
})

export const { setUserToken, clearUserToken } = AuthenticationSlice.actions
export default AuthenticationSlice.reducer
