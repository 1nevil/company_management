import { configureStore } from "@reduxjs/toolkit"
import EmployeeReducer from "../Slices/EmployeeSlice"
import ChainSliceMaster from "../Slices/ChainSliceMaster"
import PositionReducer from "../Slices/PositionSlice"

export default configureStore({
  reducer: {
    Employee: EmployeeReducer,
    Chain: ChainSliceMaster,
    Position: PositionReducer,
  },
})
