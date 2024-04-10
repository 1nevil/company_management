import { configureStore } from "@reduxjs/toolkit"
import EmployeeReducer from "../Slices/EmployeeSlice"
import PositionReducer from "../Slices/PositionSlice"

export default configureStore({
  reducer: {
    Employee: EmployeeReducer,
    Position: PositionReducer,
  },
})
