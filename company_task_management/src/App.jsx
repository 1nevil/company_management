// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
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
