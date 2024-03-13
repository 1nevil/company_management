import React from "react"
import { Outlet } from "react-router-dom"

function DashBord() {
  return (
    <div>
      <h1>Header Employee</h1>
      <Outlet />
    </div>
  )
}

export default DashBord
