// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
<<<<<<< HEAD
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import About from "./Components/About";
import Department from "./Pages/Department";
import Task from "./Pages/Task";
import Register from "./Components/Register";
import BucketTest from "./Components/BucketTest";
import Employee from "./Pages/Employee";
import Test from "./Components/Test";
import EmployeeForm from "./Pages/EmployeeForm";

=======
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./App.css"
import Header from "./Components/Header"
import About from "./Components/About"
import Department from "./Pages/Department"
import Task from "./Pages/Task"
import Register from "./Components/Register"
import BucketTest from "./Components/BucketTest"
import Employee from "./Pages/Employee"
import Team from "./Pages/Team"
import TeamDetails from "./Pages/TeamDetails"
import EmployeeForm from "./Pages/EmployeeForm"
>>>>>>> 3c9ad253a3f1306f71a1a05aecf3e29318be84b6
function App() {
  // const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          index: true,
          element: <h1> this is home page </h1>,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/task",
          element: <Task />,
        },
        {
          path: "/Department",
          element: <Department />,
        },
        {
          path: "/Employee",
          element: <Employee />,
        },
        {
          path: "/BucketTest",
          element: <BucketTest />,
        },
        {
          path: "/Test",
          element: <Test />,
          path: "/Team",
          element: <Team />,
        },
        {
          path: "/teamdetails/:chainid",
          element: <TeamDetails />,
        },
        {
          path: "/EmployeeForm",
          element: <EmployeeForm />,
        },
      ],
    },
    {
      path: "/Register",
      element: <Register />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
