/* eslint-disable no-constant-condition */
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import TaskChecker from "./Components/Checker/Task/TaskChecker"
import dashboard from "@mui/icons-material/GridView"
import AddTask from "@mui/icons-material/AddTask"
import Header from "./Components/Layout/Header"
import PeopleIcon from "@mui/icons-material/People"
import Employee from "./Components/Admin/Pages/Employee/Employee"
import Task from "./Components/Admin/Pages/Task/Task"
import DashBord from "./Components/Admin/DashBord"
import BucketTest from "./Components/Admin/BucketTest"
import { Dashboard } from "@mui/icons-material"
import CheckSuperViser from "./Components/Superviser/CheckSuperViser"
// import Register from "./Components/Register"
import Superadmin from "./Components/Superadmin/Superadmin"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import ApprovedAdmins from "./Components/Superadmin/ApprovedAdmins"
import DisapprovedAdmins from "./Components/Superadmin/DisapprovedAdmins"
import Position from "./Components/Admin/Pages/Position/Position"
import StreetviewIcon from "@mui/icons-material/Streetview"
import ManageHistoryIcon from "@mui/icons-material/ManageHistory"
import FlakyIcon from "@mui/icons-material/Flaky"
import NotChecked from "./Components/Employee/NotChecked"
import ChainDetails from "./Components/Admin/Pages/Chain/ChainDetails"
import Chain from "./Components/Admin/Pages/Chain/Chain"
import CheckTaskList from "./Components/Checker/CheckTasklist"
import EmployeeDashboard from "./Components/Employee/DashBord"
import EmpTaskDeatil from "./Components/Employee/EmpTaskDetail"
import CheckerTaskDetails from "./Components/Checker/CheckTaskDetails"
import TaskHistory from "./Components/Employee/TaskHistory"
import SignIn from "./Components/SignIn"
import TaskIsActive from "./Components/Employee/TaskIsActive"
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors"
import TaskDetail from "./Components/Employee/TaskDetail"
import LinkIcon from "@mui/icons-material/Link"
import ProtectedRoute from "./Route/ProtectedRoute"
import TaskIsActiveDeatils from "./Components/Employee/TaskIsActiveDetail"
import EmployeeCard from "./Components/Admin/Pages/Employee/EmployeeCard"
import AdminTaskDeatil from "./Components/Admin/Pages/Task/AdminTaskDeatil"
import CheckerTaskIsActiveDeatils from "./Components/Checker/CheckerTaskIsActiveDeatils"
import CheckerTaskIsActive from "./Components/Checker/CheckerTaskIsActive"
import TaskHistoryDetailForAdmin from "./Components/Admin/Pages/Task/TaskHistoryDetailForAdmin"
import { ToastContainer } from "react-toastify"
import TestEmployeeFrom from "./Components/Admin/Pages/Employee/TestEmployeeFrom"
import Changepassword from "./Components/Password/Changepassword"
import Profile from "./Components/Employee/Profile"
import PositionGuidline from "./Components/Admin/Pages/Position/PositionGuidline"
import ChecklistBoard from "./Components/Admin/Pages/Task/ChecklistBoard"
import StepperForm from "./Components/Register/StepperForm"
import EmployeeProfile from "./Components/Superadmin/EmployeeProfile"
import ForgotPassword from "./Components/Register/ForgotPassword"
import TimeExtenstion from "./Components/Admin/Pages/TimeExtenstion/TimeExtenstion"
import MoreTimeIcon from "@mui/icons-material/MoreTime"

function App() {
  const iconSiderbar = {
    // admin started
    admin: {
      icons: [
        Dashboard,
        AddTask,
        LinkIcon,
        StreetviewIcon,
        PeopleIcon,
        MoreTimeIcon,
      ],
      sidebar: [
        { name: "Dashboard ", url: "dashbord" },
        { name: "Task", url: "Task" },
        { name: "Chains", url: "chain" },
        { name: "Positions", url: "Position" },
        { name: "Employee", url: "employee" },
        { name: "TimeExtenstion", url: "TimeExtenstion" },
      ],
    },
    checker: {
      icons: [AddTask, ManageHistoryIcon],
      sidebar: [
        { name: "Task List ", url: "CheckTaskList" },
        { name: "Active Task List ", url: "checkerhistory" },
      ],
    },
    employee: {
      icons: [dashboard, RunningWithErrorsIcon, ManageHistoryIcon, FlakyIcon],
      sidebar: [
        { name: "Dashboard ", url: "EmployeeDashboard" },
        { name: "Active Task ", url: "TaskIsActive" },
        { name: "History ", url: "TaskHistory" },
        { name: "Not Approved ", url: "notChecked" },
      ],
    },

    superadmin: {
      icons: [dashboard, CheckCircleOutlinedIcon, CancelOutlinedIcon],
      sidebar: [
        { name: "Dashboard ", url: "dashboard" },
        { name: "Apprved Employee ", url: "Approved" },
        { name: "Disapproved Employee", url: "Disapproved" },
      ],
    },
  }

  const { admin, checker, employee, superadmin } = iconSiderbar

  const router = createBrowserRouter([
    {
      path: "/admin",
      element: (
        <Header link="admin" icons={admin.icons} sidebarNames={admin.sidebar} />
      ),
      children: [
        {
          element: <ProtectedRoute role="admin" />,
          children: [
            {
              path: "dashbord",
              element: <DashBord />,
            },
            {
              path: "Position",
              element: <Position />,
            },
            {
              path: "Positionguidlines/:positionid",
              element: <PositionGuidline />,
            },
            {
              path: "employee",
              element: <Employee />,
            },
            {
              path: "task",
              element: <Task />,
            },
            {
              path: "checklists/:taskid",
              element: <ChecklistBoard />,
            },
            {
              path: "chain",
              element: <Chain />,
            },
            {
              path: "chaindetails/:chainid",
              element: <ChainDetails />,
            },
            {
              path: "BucketTest",
              element: <BucketTest />,
            },
            {
              path: "AddChain",
              element: <Chain />,
            },
            {
              path: "AdminTaskDeatil/:taskId",
              element: <AdminTaskDeatil />,
            },
            {
              path: "TaskHistoryDetailForAdmin/:taskId",
              element: <TaskHistoryDetailForAdmin />,
            },
            {
              path: "TestEmployeeFrom",
              element: <TestEmployeeFrom />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "TimeExtenstion",
              element: <TimeExtenstion />,
            },
          ],
        },
        {
          path: "EmployeeCard/:employeeId",
          element: <EmployeeCard />,
        },
      ],
    },
    {
      path: "/checker",
      element: (
        <Header
          link="checker"
          icons={checker.icons}
          sidebarNames={checker.sidebar}
        />
      ),
      children: [
        {
          element: <ProtectedRoute role="checker" />,
          children: [
            {
              path: "TaskChecker",
              element: <TaskChecker />,
            },

            {
              path: "CheckTaskList",
              element: <CheckTaskList />,
            },
            {
              path: "CheckerTaskDetails/:taskId",
              element: <CheckerTaskDetails />,
            },
            {
              path: "checkerhistory",
              element: <CheckerTaskIsActive />,
            },
            {
              path: "checkerhistory/:taskId",
              element: <CheckerTaskIsActiveDeatils />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
    {
      path: "/employee",
      element: (
        <Header
          link="employee"
          icons={employee.icons}
          sidebarNames={employee.sidebar}
        />
      ),
      children: [
        {
          element: <ProtectedRoute role="employee" />,
          children: [
            {
              path: "EmployeeDashboard",
              element: <EmployeeDashboard />,
            },
            {
              path: "EmpTaskDetail/:taskId",
              element: <EmpTaskDeatil />,
            },
            {
              path: "TaskHistory",
              element: <TaskHistory />,
            },
            {
              path: "TaskIsActive",
              element: <TaskIsActive />,
            },
            {
              path: "TaskDetail/:taskHistoryId",
              element: <TaskDetail />,
            },
            {
              path: "TaskIsActiveDeatils/:taskId",
              element: <TaskIsActiveDeatils />,
            },
            {
              path: "notChecked",
              element: <NotChecked />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
    // ------- path like employee/Register have to change
    {
      path: "Register",
      // element: <Register />,
      element: <StepperForm />,
    },
    {
      path: "ForgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "Changepassword",
      element: <Changepassword />,
    },
    ...["/", "/login"].map((path) => {
      return {
        path: path,
        element: <SignIn />,
      }
    }),

    // superadmin start
    {
      path: "/superadmin",
      element: (
        <Header
          link="superadmin"
          icons={superadmin.icons}
          sidebarNames={superadmin.sidebar}
        />
      ),
      children: [
        {
          element: <ProtectedRoute role="super_admin" />,
          children: [
            {
              path: "dashboard",
              element: <Superadmin />,
            },
            {
              path: "approved",
              element: <ApprovedAdmins />,
            },
            {
              path: "disapproved",
              element: <DisapprovedAdmins />,
            },
            {
              path: "EmployeeProfile/:employeeId",
              element: <EmployeeProfile />,
            },
            {
              path: "EmployeeCard/:employeeId",
              element: <EmployeeCard />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
    // superadmin end
    // {
    //   path: "/",
    //   element: <Header icons={admin.icons} sidebarNames={admin.sidebar} />,
    // },
    {
      path: "*",
      element: (
        <h1>
          404 No page Found <Link to="/">Home</Link>
        </h1>
      ),
    },
  ])
  return (
    <div style={{ fontfamily: "Times New Roman" }}>
      {/* <GlobalStyle /> */}
      <ToastContainer />
      {/* <ProtectedRoute> */}
      <RouterProvider router={router} />
      {/* </ProtectedRoute> */}
    </div>
  )
}

export default App
