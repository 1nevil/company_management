import React from "react"
import { Outlet } from "react-router-dom"

function DashBord() {
  return (
    <div>
      <h1>Header Checker</h1>
      <Outlet />
    </div>
  )
}

export default DashBord
