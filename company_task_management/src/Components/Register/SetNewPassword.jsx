import React, { useState } from "react"
import {
  Button,
  InputAdornment,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import PropTypes from "prop-types"

import { useFormik } from "formik"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { verifyAndSetNewPassword } from "../../Slices/AuthenticationSlice"
import { toast } from "react-toastify"

const SetNewPassword = ({ email, otp, setNewPassword, newPassword }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      email,
      otp,
    },
    onSubmit: (data, { setSubmitting }) => {
      // Handle submit logic here
      dispatch(verifyAndSetNewPassword(data)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setNewPassword(data.password)
          toast.success("Password updated successfully")
          navigate("/") // Replace with your actual next step
        } else {
          toast.error(
            "Something went Wrong. Password is not updated successfully"
          )
        }
        setSubmitting(false)
      })
    },
  })

  const { errors, touched, handleChange, handleSubmit, handleBlur } = formik

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword)

  return (
    <Stack p={2} spacing={2}>
      <Typography color="#565656" fontWeight={900} variant="h5">
        Set New Password
      </Typography>
      <TextField
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        size="small"
        onChange={handleChange}
        onBlur={handleBlur}
        value={formik.values.password}
        placeholder="New Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {errors.password && touched.password ? (
        <Typography variant="caption" color="error">
          {errors.password}
        </Typography>
      ) : null}
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        size="small"
        onChange={handleChange}
        onBlur={handleBlur}
        value={formik.values.confirmPassword}
        placeholder="Confirm New Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={handleClickShowConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {errors.confirmPassword && touched.confirmPassword ? (
        <Typography variant="caption" color="error">
          {errors.confirmPassword}
        </Typography>
      ) : null}
      <Button onClick={handleSubmit} variant="outlined">
        Set New Password
      </Button>
    </Stack>
  )
}

SetNewPassword.propTypes = {
  email: PropTypes.string.isRequired,
  otp: PropTypes.string.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  newPassword: PropTypes.string.isRequired,
}

export default SetNewPassword
