import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Forgetpassword, MetchOtp, loginAuthUser } from "./AuthenticationApi"
import { jwtDecode } from "jwt-decode"

const initialState = {
  initialPending: true,
  pending: false,
  token: null,
  error: null,
  authicatedUser: null,
  isAuthenticate: false,
  message: null,
  loading: false,
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

export const ForgetpasswordWithEmail = createAsyncThunk(
  "emp/ForgetpasswordWithEmail",
  async (email, { rejectWithValue }) => {
    try {
      console.log(email)
      const response = await Forgetpassword(email)
      console.log("🚀 ~ response:", response)
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
export const verifyAndSetNewPassword = createAsyncThunk(
  "emp/verifyAndSetNewPassword",
  async ({ email, otp, password }, { rejectWithValue }) => {
    try {
      const response = await MetchOtp({ email, otp, password })
      return response
    } catch (error) {
      return rejectWithValue(error)
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
    clearErrorMessage: (state) => {
      state.error = null
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
      .addCase(ForgetpasswordWithEmail.pending, (state) => {
        state.loading = true
        state.error = null
        state.message = null
      })
      .addCase(ForgetpasswordWithEmail.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload
      })
      .addCase(ForgetpasswordWithEmail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(verifyAndSetNewPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(verifyAndSetNewPassword.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload.message // Adjust as per your API response structure
      })
      .addCase(verifyAndSetNewPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setUserToken, clearUserToken, clearErrorMessage, clearMessage } =
  AuthenticationSlice.actions
export default AuthenticationSlice.reducer
