import { configureStore } from "@reduxjs/toolkit";
import EmployeeReducer from "../Slices/EmployeeSlice";
import ChainSliceMaster from "../Slices/ChainSliceMaster";
import PositionReducer from "../Slices/PositionSlice";
import TaskReducer from "../Slices/TaskSlice";

export default configureStore({
  reducer: {
    Employee: EmployeeReducer,
    Chain: ChainSliceMaster,
    Position: PositionReducer,
    Tasks: TaskReducer,
  },
});
