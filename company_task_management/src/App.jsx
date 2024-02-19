// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, RouterProvider, Routes, createBrowserRouter} from 'react-router-dom'

import './App.css'
import Header from './Components1/Header'
import About from './Components1/About'
import AddTask from './Components1/AddTask'
import Department from './Components1/Department'
// import Footer from './Components1/Footer'
// import Header from './Components1/Header'

// const route = createBrowserRouter([
//   {
//     path: "/",
//     element:<Task/>
//   }
// ])

function App( ) {
  // const [count, setCount] = useState(0)


  const router = createBrowserRouter([{
    path:"/",
    element:<Header/>,
    children:[
      {
        index:true,
        element: <h1> this is home page </h1>
      },
    {
      path:"/about",
      element:<About/>
    },
    {
      path:"/AddTask",
      element:<AddTask/>
    },
    {
      path:"/Department",
      element:<Department/>
    }


    ]


  }])
  return (
    <>
    <RouterProvider router={router} />
    
   {/* <Routes>
  <Route path='/Header' element={<Header/>}>
      
    </Route>
  </Routes> */}
  {/* <RouterProvider router={route}/> */}
  
    </>
  )
}

export default App
