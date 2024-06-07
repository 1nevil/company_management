/* eslint-disable no-constant-condition */
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import TaskChecker from "./Components/Checker/Task/TaskChecker";
import dashboard from "@mui/icons-material/GridView";
import AddTask from "@mui/icons-material/AddTask";
import Header from "./Components/Layout/Header";
import PeopleIcon from "@mui/icons-material/People";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Employee from "./Components/Admin/Pages/Employee/Employee";
import Task from "./Components/Admin/Pages/Task/Task";
import DashBord from "./Components/Admin/DashBord";
import BucketTest from "./Components/Admin/BucketTest";
import { Dashboard } from "@mui/icons-material";
import CheckSuperViser from "./Components/Superviser/CheckSuperViser";
import Register from "./Components/Register";
import Superadmin from "./Components/Superadmin/Superadmin";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ApprovedAdmins from "./Components/Superadmin/ApprovedAdmins";
import DisapprovedAdmins from "./Components/Superadmin/DisapprovedAdmins";
import Position from "./Components/Admin/Pages/Position/Position";
import StreetviewIcon from "@mui/icons-material/Streetview";
//import Chain from "./Components/Admin/Pages/Chain/Chain";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory"
import FlakyIcon from "@mui/icons-material/Flaky"
import NotChecked from "./Components/Employee/NotChecked"
import ChainDetails from "./Components/Admin/Pages/Chain/ChainDetails";
import Chain from "./Components/Admin/Pages/Chain/Chain";
import CheckTaskList from "./Components/Checker/CheckTasklist";
import EmployeeDashboard from "./Components/Employee/DashBord";
import EmpTaskDeatil from "./Components/Employee/EmpTaskDetail";
import CheckerTaskDetails from "./Components/Checker/CheckTaskDetails";
import TaskHistory from "./Components/Employee/TaskHistory";
import BadgeIcon from "@mui/icons-material/Badge";
import SignIn from "./Components/SignIn";
import TaskIsActive from "./Components/Employee/TaskIsActive";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import TaskDetail from "./Components/Employee/TaskDetail";
import LinkIcon from "@mui/icons-material/Link";
import ProtectedRoute from "./Route/ProtectedRoute";
import TaskIsActiveDeatils from "./Components/Employee/TaskIsActiveDetail";
import EmployeeCard from "./Components/Admin/Pages/Employee/EmployeeCard";
import AdminTaskDeatil from "./Components/Admin/Pages/Task/AdminTaskDeatil";
import CheckerTaskIsActiveDeatils from "./Components/Checker/CheckerTaskIsActiveDeatils";
import CheckerTaskIsActive from "./Components/Checker/CheckerTaskIsActive";
import TaskHistoryDetailForAdmin from "./Components/Admin/Pages/Task/TaskHistoryDetailForAdmin";

function App() {
  const iconSiderbar = {
    // admin started
    admin: {
      icons: [Dashboard, AddTask, LinkIcon, PeopleIcon, StreetviewIcon],
      sidebar: ["dashbord", "Task", "chain", "Employee", "Position"],
    },
    checker: {
      icons: [AddTask, RunningWithErrorsIcon],
      sidebar: ["CheckTaskList", "CheckerTaskIsActive"],
    },
    employee: {
      icons: [dashboard, ManageHistoryIcon, RunningWithErrorsIcon, FlakyIcon],
      sidebar: [
        "EmployeeDashboard",
        "TaskHistory",
        "TaskIsActive",
        "notChecked",
      ],
    },
    superviser: {
      icons: [dashboard],
      sidebar: ["dashboard"],
    },
    superadmin: {
      icons: [dashboard, CheckCircleOutlinedIcon, CancelOutlinedIcon],
      sidebar: ["dashboard", "Approved", "Disapproved"],
    },
  };

  const { admin, checker, employee, superviser, superadmin } = iconSiderbar;

  const router = createBrowserRouter([
    {
      path: "/admin",
      element: (
        <Header link="admin" icons={admin.icons} sidebarNames={admin.sidebar} />
      ),
      children: [
        // {
        //   index: true,
        //   element: <DashBord />,
        // },
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
              path: "employee",
              element: <Employee />,
            },
            {
              path: "task",
              element: <Task />,
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
        // {
        //   index: true,
        //   element: <h1>Hello</h1>,
        // },
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
              path: "CheckerTaskIsActive",
              element: <CheckerTaskIsActive />,
            },
            {
              path: "CheckerTaskIsActiveDeatils/:taskId",
              element: <CheckerTaskIsActiveDeatils />,
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
          index: true,
          element: <h1>Hello</h1>,
        },
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
            // ,{
            //   path:"dashboard",
            //   element:<DashBoard/>
            // }
          ],
        },
      ],
    },
    // ------- path like employee/Register have to change
    {
      path: "Register",
      element: <Register />,
    },
    ...["/", "/login"].map((path) => {
      return {
        path: path,
        element: <SignIn />,
      };
    }),
    {
      path: "/superviser",
      element: (
        <Header
          link="superviser"
          icons={superviser.icons}
          sidebarNames={superviser.sidebar}
        />
      ),
      children: [
        {
          index: true,
          element: <h1>Hello</h1>,
        },
        {
          path: "checker",
          element: <CheckSuperViser />,
        },
      ],
    },
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
          index: true,
          element: <Superadmin />,
        },
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
  ]);
  return (
    <>
      {/* <ProtectedRoute> */}
      <RouterProvider router={router} />
      {/* </ProtectedRoute> */}
    </>
  );
}

export default App;
