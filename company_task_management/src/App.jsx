// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
// import About from "./Components/About"
// import Task from "./Pages/Task"
// import Register from "./Components/Register"
// import BucketTest from "./Components/BucketTest"
// import Employee from "./Pages/Employee"
// import Team from "./Pages/Team"
// import TeamDetails from "./Pages/TeamDetails"
// import EmployeeForm from "./Pages/EmployeeForm"
import CheckChecker from "./Components/Checker/CheckChecker"
import dashboard from "@mui/icons-material/GridView"
import AddTask from "@mui/icons-material/AddTask"
// import DashBordChecker from "./Components/Checker/DashBord"
// import DashBordEmployee from "./Components/Employee/DashBord"
// import DashBordSuperviser from "./Components/Superviser/DashBord"
import CheckSuperViser from "./Components/Superviser/CheckSuperViser"
import CheckEmployee from "./Components/Employee/CheckEmployee"
import Header from "./Components/Layout/Header"
import ListAltIcon from "@mui/icons-material/ListAlt"
import PeopleIcon from "@mui/icons-material/People"
import Diversity3Icon from "@mui/icons-material/Diversity3"
import DepartmentIcon from "@mui/icons-material/AddBox"
import DepartmentCom from "./Components/Admin/Pages/Department/Department"
import Employee from "./Components/Admin/Pages/Employee/Employee"
import Task from "./Components/Admin/Pages/Task/Task"
import Team from "./Components/Admin/Pages/Team/Team"
import TeamDetails from "./Components/Admin/Pages/Team/TeamDetails"
import DashBord from "./Components/Admin/DashBord"
import BucketTest from "./Components/Admin/BucketTest"
import { Dashboard } from "@mui/icons-material"

function App() {
  const iconSiderbar = {
    admin: {
      icons: [
        Dashboard,
        AddTask,
        DepartmentIcon,
        ListAltIcon,
        PeopleIcon,
        Diversity3Icon,
      ],
      sidebar: [
        "dashbord",
        "Task",
        "Department",
        "BucketTest",
        "Employee",
        "Team",
      ],
    },
    checker: {
      icons: [dashboard],
      sidebar: ["dashboard"],
    },
    employee: {
      icons: [dashboard],
      sidebar: ["dashboard"],
    },
    superviser: {
      icons: [dashboard],
      sidebar: ["dashboard"],
    },
  }

  //distructure for easyly accesss
  const { admin, checker, employee, superviser } = iconSiderbar

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
          path: "employee",
          element: <Employee />,
        },
        {
          path: "task",
          element: <Task />,
        },
        {
          path: "team",
          element: <Team />,
        },
        {
          path: "teamdetails/:chainid",
          element: <TeamDetails />,
        },
        {
          path: "BucketTest",
          element: <BucketTest />,
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
          path: "checkr",
          element: <CheckChecker />,
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
          path: "checkr",
          element: <CheckSuperViser />,
        },
      ],
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
