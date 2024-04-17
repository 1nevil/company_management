import { configureStore } from "@reduxjs/toolkit";
import EmployeeReducer from "../Slices/EmployeeSlice";
import ChainReducer from "../Slices/ChainSlice";
import PositionReducer from "../Slices/PositionSlice";

export default configureStore({
  reducer: {
    Employee: EmployeeReducer,
    Chain: ChainReducer,
    Position: PositionReducer,
  },
});
