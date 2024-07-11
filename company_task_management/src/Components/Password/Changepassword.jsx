import React, { useEffect } from "react"
import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  InputLabel,
  FormControl,
  OutlinedInput,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useFormik } from "formik"
import { useSelector, useDispatch } from "react-redux"
import * as Yup from "yup"
import { resetPasswordEmp } from "../../Slices/EmployeeSlice"
import { clearUserToken, setUserToken } from "../../Slices/AuthenticationSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const theme = createTheme()

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Old Password is required"),
  newPassword: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
})

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

export default function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = React.useState(false)
  const [showNewPassword, setShowNewPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [open, setOpen] = React.useState(true)
  const navigate = useNavigate()

  const { authicatedUser } = useSelector((state) => state.Auth)
  const { pendding, error } = useSelector((state) => state.Employee)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserToken())
  }, [dispatch])

  const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword)
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword)
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const notifySubmit = () => toast.success("Password updated successfully")

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        resetPasswordEmp({
          empId: authicatedUser.id,
          newPassword: values.newPassword,
          oldPassword: values.oldPassword,
        })
      ).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          notifySubmit()
          handleClose()
          dispatch(clearUserToken())
          localStorage.removeItem("token")
          navigate("/")
        }
      })
    },
  })

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset your password
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Enter your new password. After confirming, you will be asked to log
            in again.
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="oldPassword">Old Password</InputLabel>
              <OutlinedInput
                id="oldPassword"
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowOldPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Old Password"
              />
              {formik.touched.oldPassword && formik.errors.oldPassword ? (
                <Typography variant="body2" color="error">
                  {formik.errors.oldPassword}
                </Typography>
              ) : null}
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="newPassword">New Password</InputLabel>
              <OutlinedInput
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <Typography variant="body2" color="error">
                  {formik.errors.newPassword}
                </Typography>
              ) : null}
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="confirmPassword">
                Confirm New Password
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm New Password"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <Typography variant="body2" color="error">
                  {formik.errors.confirmPassword}
                </Typography>
              ) : null}
            </FormControl>
            <Button
              disabled={pendding}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Never mind! Take me back to login
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
