import { configureStore } from "@reduxjs/toolkit"
import EmployeeReducer from "../Slices/EmployeeSlice"
import ChainSliceMaster from "../Slices/ChainSliceMaster"
import PositionReducer from "../Slices/PositionSlice"
import ChainDetailsReducer from "../Slices/ChainDetailsSlice"
import TaskReducer from "../Slices/TaskSlice"
import AssignToTaskReducer from "../Slices/AssignToTask"
import AuthenticationReducer from "../Slices/AuthenticationSlice"
import DashboardReducer from "../Slices/DashboardSlice"
import ChecklistReducer from "../Slices/ChecklistSlice"

export default configureStore({
  reducer: {
    Auth: AuthenticationReducer,
    Employee: EmployeeReducer,
    Chain: ChainSliceMaster,
    Position: PositionReducer,
    Tasks: TaskReducer,
    ChainDetail: ChainDetailsReducer,
    AssignToTask: AssignToTaskReducer,
    DashBord: DashboardReducer,
    CheckList: ChecklistReducer,
  },
})
