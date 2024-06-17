import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, setUserToken } from "../Slices/AuthenticationSlice"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { userLoginSchema } from "./Validation/validationSchema"
import AccountCircle from "@mui/icons-material/AccountCircle"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import OutlinedInput from "@mui/material/OutlinedInput"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const defaultTheme = createTheme()

export default function SignIn() {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = React.useState(false)
  const [roleOfUser, setRoleOfUser] = React.useState(null)
  const { pending, error, authicatedUser } = useSelector((state) => state.Auth)
  const [open, setOpen] = React.useState(true)
  const handleClickShowPassword = React.useCallback(() => {
    setShowPassword((show) => !show)
  }, [])

  const handleMouseDownPassword = React.useCallback((event) => {
    event.preventDefault()
  }, [])

  const handleClose = React.useCallback((event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }, [])

  const initialState = React.useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  )

  const handleClick = () => {
    setOpen(true)
  }

  console.log("signin re-render")
  const navigate = useNavigate()

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initialState,
      validationSchema: userLoginSchema,
      onSubmit: (data) => {
        dispatch(loginUser(data))
        if (error !== null) handleClick()

        if (authicatedUser !== null) {
          console.log("🚀 ~ SignIn ~ authicatedUser:", authicatedUser)

          const role =
            authicatedUser[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ]
          if (role === "super_admin") {
            navigate("/superadmin/approved")
          } else if (role === "admin") {
            navigate("/admin/dashbord")
          } else if (role === "employee") {
            navigate("/employee/EmployeeDashboard")
          } else if (role === "checker") {
            navigate("/checker/CheckTaskList")
          }
        }
      },
    }
  )

  React.useEffect(() => {
    dispatch(setUserToken())
  }, [dispatch])

  React.useEffect(() => {
    if (authicatedUser) {
      const userRole =
        authicatedUser[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      setRoleOfUser(userRole)
      if (userRole) {
        console.log("🚀 ~ React.useEffect ~ userRole:", userRole)
        if (userRole === "super_admin") {
          navigate("/superadmin/approved")
        } else if (userRole === "admin") {
          navigate("/admin/dashbord")
        } else if (userRole === "employee") {
          navigate("/employee/EmployeeDashboard")
        } else if (userRole === "checker") {
          navigate("/checker/CheckTaskList")
        }
      }
    } else {
      navigate("/")
    }
  }, [authicatedUser, navigate])
  return (
    <ThemeProvider theme={defaultTheme}>
      {error !== null && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "30rem" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Email Address
                </InputLabel>
                <OutlinedInput
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errors.email && touched.email ? (
                <Typography variant="body2" color="error">
                  {errors.email}
                </Typography>
              ) : null}
            </Box>
            <Box mt={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="password"
                  label="Password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errors.password && touched.password ? (
                <Typography variant="body2" color="error">
                  {errors.password}
                </Typography>
              ) : null}
            </Box>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={pending}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item={12}>
                <Link href="Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
