import { configureStore } from "@reduxjs/toolkit"
import EmployeeReducer from "../Slices/EmployeeSlice"

export default configureStore({
  reducer: {
    Employee: EmployeeReducer,
  },
})
