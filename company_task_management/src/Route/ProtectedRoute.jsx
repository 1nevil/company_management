/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
// import { jwtDecode } from "jwt-decode"
import { useSelector, useDispatch } from "react-redux"
import { setUserToken } from "../Slices/AuthenticationSlice"
import { useNavigate, Outlet, Link, Navigate } from "react-router-dom"
import { Box, Typography, Button } from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"
import { useState } from "react"

function ProtectedRoute({ role }) {
  console.log("Protected route re-render")
  const { isAuthenticate, authicatedUser } = useSelector((state) => state.Auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [roleOfUser, setRoleOfUser] = useState(null)

  useEffect(() => {
    dispatch(setUserToken())
  }, [dispatch])

  useEffect(() => {
    if (authicatedUser) {
      console.table(authicatedUser)
      const userRole =
        authicatedUser[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      setRoleOfUser(userRole)
      if (userRole) {
        if (userRole === "super_admin") {
          navigate("/superadmin/approved")
        } else if (userRole === "admin") {
          navigate("/admin/dashbord")
        } else if (userRole === "employee") {
          navigate("/employee/EmployeeDashboard")
        } else if (userRole === "checker") {
          navigate("/checker/TaskChecker")
        }
      }
    } else {
      navigate("/")
    }
  }, [authicatedUser, navigate])

  return !isAuthenticate || roleOfUser !== role ? (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 4,
      }}
    >
      <Button m={2} color="error" variant="contained" startIcon={<ErrorIcon />}>
        Unauthorized Access
      </Button>
      <Typography m={3} variant="h5">
        You are not authorized to view this page.
      </Typography>
      <Typography variant="body1">
        Please log in or contact your administrator for access.
      </Typography>
      <Link
        to="/login"
        underline="none"
        sx={{ marginTop: 2, textDecoration: "none" }}
      >
        Login
      </Link>
    </Box>
  ) : (
    <>
      {JSON.stringify(!isAuthenticate)}
      <br></br>
      {JSON.stringify(roleOfUser !== role)}
      <br></br>
      {JSON.stringify(roleOfUser)}
      <br></br>
      {JSON.stringify(role)}
      <br></br>

      <Outlet />
    </>
  )
}
export default ProtectedRoute
