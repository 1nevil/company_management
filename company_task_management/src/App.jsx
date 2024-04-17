import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import TaskChecker from "./Components/Checker/Task/TaskChecker";
import dashboard from "@mui/icons-material/GridView";
import AddTask from "@mui/icons-material/AddTask";
import CheckEmployee from "./Components/Employee/CheckEmployee";
import Header from "./Components/Layout/Header";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import DepartmentIcon from "@mui/icons-material/AddBox";
import DepartmentCom from "./Components/Admin/Pages/Department/Department";
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
import PositionForm from "./Components/Admin/Pages/Position/PositionForm";
import Position from "./Components/Admin/Pages/Position/Position";
import StreetviewIcon from "@mui/icons-material/Streetview";
//import Chain from "./Components/Admin/Pages/Chain/Chain";
import ChainDetails from "./Components/Admin/Pages/Chain/ChainDetails";
import Chain from "./Components/Admin/Pages/Chain/Chain";
import CheckTaskList from "./Components/Checker/CheckTasklist";

function App() {
  const iconSiderbar = {
    // admin started
    admin: {
      icons: [
        Dashboard,
        AddTask,
        DepartmentIcon,
        // LinkIcon,
        PeopleIcon,
        Diversity3Icon,
        StreetviewIcon,
      ],
      sidebar: [
        "dashbord",
        "Task",
        "Department",
        // "chain",
        "Employee",
        "Chain",
        "Position",
      ],
    },
    checker: {
      icons: [AddTask],
      sidebar: ["Task"],
    },
    employee: {
      icons: [dashboard],
      sidebar: ["dashboard"],
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

  //distructure for easyly accesss
  const { admin, checker, employee, superviser, superadmin } = iconSiderbar;

  const router = createBrowserRouter([
    {
      path: "/admin",
      element: (
        <Header link="admin" icons={admin.icons} sidebarNames={admin.sidebar} />
      ),
      children: [
        {
          index: true,
          element: <DashBord />,
        },
        {
          path: "dashbord",
          element: <DashBord />,
        },
        {
          path: "department",
          element: <DepartmentCom />,
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
          index: true,
          element: <h1>Hello</h1>,
        },
        {
          path: "TaskChecker",
          element: <TaskChecker />,
        },
        {
          path: "CheckTaskList",
          element: <CheckTaskList />,
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
          path: "checkr",
          element: <CheckEmployee />,
        },
      ],
    },
    // ------- path like employee/Register have to change
    {
      path: "Register",
      element: <Register />,
    },
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
    // superadmin end
    {
      path: "/",
      element: <Header icons={admin.icons} sidebarNames={admin.sidebar} />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
