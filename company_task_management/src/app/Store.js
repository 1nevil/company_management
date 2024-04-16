import { configureStore } from "@reduxjs/toolkit";
import EmployeeReducer from "../Slices/EmployeeSlice";
import ChainReducer from "../Slices/ChainSlice";

export default configureStore({
  reducer: {
    Employee: EmployeeReducer,
    Chain: ChainReducer,
  },
});
