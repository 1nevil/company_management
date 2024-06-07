/* eslint-disable react/prop-types */
// import { jwtDecode } from "jwt-decode"
import { useSelector, useDispatch } from "react-redux"
import { Outlet, Link } from "react-router-dom"
import { Box, Typography, Button } from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"
import { useEffect } from "react"
import { setUserToken } from "../Slices/AuthenticationSlice"
import Breadcrumb from "../Components/Layout/Breadcrumb"

function ProtectedRoute({ role }) {
  const { isAuthenticate, authicatedUser } = useSelector((state) => state.Auth)
  console.table(authicatedUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserToken())
  }, [dispatch])

  return !isAuthenticate ||
    authicatedUser[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ] !== role ? (
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
      <Breadcrumb />
      <Outlet />
    </>
  )
}
export default ProtectedRoute

// return !isAuthenticate || roleOfUser !== role ? (
//   <Box
//     component="div"
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       textAlign: "center",
//       padding: 4,
//     }}
//   >
//     <Button m={2} color="error" variant="contained" startIcon={<ErrorIcon />}>
//       Unauthorized Access
//     </Button>
//     <Typography m={3} variant="h5">
//       You are not authorized to view this page.
//     </Typography>
//     <Typography variant="body1">
//       Please log in or contact your administrator for access.
//     </Typography>
//     <Link
//       to="/login"
//       underline="none"
//       sx={{ marginTop: 2, textDecoration: "none" }}
//     >
//       Login
//     </Link>
//   </Box>
// ) : (
//   <>
//     {JSON.stringify(!isAuthenticate)}
//     <br></br>
//     {JSON.stringify(roleOfUser !== role)}
//     <br></br>
//     {JSON.stringify(roleOfUser)}
//     <br></br>
//     {JSON.stringify(role)}
//     <br></br>

//     <Outlet />
//   </>
// );
// }
