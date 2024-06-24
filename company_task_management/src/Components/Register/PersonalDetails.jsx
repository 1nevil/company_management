import * as React from "react"
import Avatar from "@mui/material/Avatar"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useFormik } from "formik"

import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import InputAdornment from "@mui/material/InputAdornment"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useNavigate } from "react-router-dom"
import { insertEmp } from "../../Slices/EmployeeSlice"
import { fetchPosition } from "../../Slices/PositionSlice"
import { EmployeeSchema } from "../Validation/validationSchema"
const defaultTheme = createTheme()

export default function PersonalDetails() {
  const dispatch = useDispatch()
  const Positions = useSelector((state) => state.Position.positions)

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "scroll",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  })

  const initValue = {
    firstName: "",
    lastName: "",
    surname: "",
    dob: "",
    addressEmployee: "",
    xender: "",
    dateOfJoining: "",
    employeeEmail: "",
    mobileNumber: "",
    adharNumber: "",
    altmobileNumber: "",
    employeeImage: "",
    employeeResume: "",
    bankName: "",
    accountHolderName: "",
    accountNo: "",
    ifscCode: "",
    branchName: "",
    upiId: "",
    PhoneNumber: "",
    confirmPassword: "",
    adharImage: "",
    signImage: "",
    roleId: 3,
    employeePassword: "",
  }

  const calculateAge = (dob) => {
    const today = new Date()
    const birthDate = new Date(dob)
    let ageDiff = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      ageDiff--
    }

    setFieldValue("employeeAge", ageDiff.toString()) // Update age
  }

  const [images, setImage] = useState({
    adharImage: "",
    employeeImage: "",
    employeeResume: "",
    signImage: "",
  })

  const handleImageChange = (e) => {
    const { name, files } = e.target
    setImage({
      ...images,
      [name]: files[0],
    })
  }

  const handleDateChange = (event) => {
    const { value } = event.target
    handleChange(event) // Update formik state with new value
    calculateAge(value) // Calculate and update age
  }

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const {
    errors,
    touched,
    handleBlur,
    handleSubmit,
    setFieldValue,
    handleChange,
  } = useFormik({
    initialValues: initValue,
    validationSchema: EmployeeSchema,
    onSubmit: (values) => {
      console.table(values)
      console.log("submited")

      const formData = new FormData()
      formData.append(
        "EmployeeName",
        values.surname + " " + values.firstName + " " + values.lastName
      )
      formData.append("Dob", values.dob)
      formData.append("AddressEmployee", values.addressEmployee)
      formData.append("Gender", values.xender)
      formData.append("RoleId", values.roleId)
      formData.append("DateOfJoining", values.dateOfJoining)
      formData.append("EmployeeEmail", values.employeeEmail)
      formData.append("AdharNumber", values.adharNumber)
      formData.append("AltmobileNumber", values.altmobileNumber)
      formData.append("MobileNumber", values.mobileNumber)
      formData.append("EmployeeAge", values.employeeAge)
      formData.append("EmployeePassword", values.employeePassword)
      formData.append("PositionId", String(values.positionId))
      formData.append("AdharImage", images.adharImage)
      formData.append("SignImage", images.signImage) //   Corrected this field name
      formData.append("EmployeeResume", images.employeeResume)
      formData.append("EmployeeImage", images.employeeImage)
      formData.append("IsActive", "0")
      dispatch(insertEmp(formData))
      navigate("/")
    },
  })

  useEffect(() => {
    dispatch(fetchPosition())
  }, [dispatch])

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={11}
          sm={8}
          md={9}
          lg={6}
          sx={{ margin: "auto" }}
          //   component={Paper}
          //   elevation={6}
          //   square
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
            }}
          >
            <Box sx={{ textAlign: "center", gap: "20px" }}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main", margin: "auto" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{ lineHeight: "35px" }}
              >
                Employee Registeration Form
              </Typography>
            </Box>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="First Name"
                    name="firstName"
                    //value={employeeData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.firstName && touched.firstName ? (
                    <Typography variant="caption" color="error">
                      {errors.firstName}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item lg={6} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    // value={employeeData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.lastName && touched.lastName ? (
                    <Typography variant="caption" color="error">
                      {errors.lastName}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item lg={6} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Surname"
                    name="surname"
                    //value={employeeData.surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.surname && touched.surname ? (
                    <Typography variant="caption" color="error">
                      {errors.surname}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item lg={6} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    type="date"
                    name="dob"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    //value={employeeData.dob}
                    onChange={handleDateChange}
                    onBlur={handleBlur}
                    label="Date of Birth"
                  />

                  {errors.dob && touched.dob ? (
                    <Typography variant="caption" color="error">
                      {errors.dob}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    {/* <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel> */}
                    <TextField
                      size="small"
                      fullwidth
                      label="password"
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      name="employeePassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      // label="Password"
                    />
                    {errors.employeePassword && touched.employeePassword ? (
                      <Typography variant="caption" color="error">
                        {errors.employeePassword}
                      </Typography>
                    ) : null}
                  </FormControl>
                </Grid>{" "}
                <Grid item xs={12}>
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <TextField
                      size="small"
                      fullwidth
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      label="Confirm Password"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <Typography variant="caption" color="error">
                        {errors.confirmPassword}
                      </Typography>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-static"
                    size="small"
                    fullWidth
                    label="Address"
                    multiline
                    name="addressEmployee"
                    rows={4}
                    // value={employeeData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.addressEmployee && touched.addressEmployee ? (
                    <Typography variant="caption" color="error">
                      {errors.addressEmployee}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item lg={6} xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="xender"
                      label="Gender"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="others">Others</MenuItem>
                    </Select>
                    {errors.xender && touched.xender ? (
                      <Typography variant="caption" color="error">
                        {errors.xender}
                      </Typography>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid item lg={6} xs={12} md={6}>
                  <TextField
                    size="small"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Date of Joining"
                    type="date"
                    name="dateOfJoining"
                    // value={employeeData.dateOfJoining}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/* <InputLabel htmlFor="employee-image-file">
                    Date of Joining
                  </InputLabel> */}
                  {errors.dateOfJoining && touched.dateOfJoining ? (
                    <Typography variant="caption" color="error">
                      {errors.dateOfJoining}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item lg={6} xs={12} md={6}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Adhar No"
                    name="adharNumber"
                    inputProps={{ maxLength: 12 }}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 12)
                      handleChange(e)
                    }}
                    onKeyDown={(e) => {
                      if (
                        !(
                          (e.keyCode >= 48 && e.keyCode <= 57) ||
                          (e.keyCode >= 96 && e.keyCode <= 105) ||
                          e.keyCode === 8 ||
                          e.keyCode === 9 ||
                          e.keyCode === 46
                        )
                      ) {
                        e.preventDefault()
                      }
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.adharNumber && touched.adharNumber ? (
                    <Typography variant="caption" color="error">
                      {errors.adharNumber}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item lg={6} xs={12} md={6}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Email"
                    name="employeeEmail"
                    // value={employeeData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.employeeEmail && touched.employeeEmail ? (
                    <Typography variant="caption" color="error">
                      {errors.employeeEmail}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item lg={6} xs={12} md={6}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Mobile No"
                    name="mobileNumber"
                    inputProps={{ maxLength: 10 }}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10)
                      handleChange(e)
                    }}
                    onKeyDown={(e) => {
                      if (
                        !(
                          (e.keyCode >= 48 && e.keyCode <= 57) ||
                          (e.keyCode >= 96 && e.keyCode <= 105) ||
                          e.keyCode === 8 ||
                          e.keyCode === 9 ||
                          e.keyCode === 46
                        )
                      ) {
                        e.preventDefault()
                      }
                    }}
                    // value={employeeData.mobileNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.mobileNumber && touched.mobileNumber ? (
                    <Typography variant="caption" color="error">
                      {errors.mobileNumber}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item lg={6} xs={12} md={6}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Alternate Mobile No"
                    name="altmobileNumber"
                    inputProps={{ maxLength: 10 }}
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10)
                      handleChange(e)
                    }}
                    onKeyDown={(e) => {
                      if (
                        !(
                          (e.keyCode >= 48 && e.keyCode <= 57) ||
                          (e.keyCode >= 96 && e.keyCode <= 105) ||
                          e.keyCode === 8 ||
                          e.keyCode === 9 ||
                          e.keyCode === 46
                        )
                      ) {
                        e.preventDefault()
                      }
                    }}
                    // value={employeeData.alternateMobileNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.altmobileNumber && touched.altmobileNumber ? (
                    <Typography variant="caption" color="error">
                      {errors.altmobileNumber}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{ m: "1rem 0rem 1rem 0rem" }}
                    component="h6"
                  >
                    Position
                  </Typography>
                  <FormControl fullWidth size="small">
                    {/* <InputLabel id="demo-simple-select-label">
                      Select Position
                    </InputLabel> */}
                    <InputLabel>select position</InputLabel>
                    <Select
                      name="positionId"
                      label="select position"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {Positions?.map((position, index) => {
                        return (
                          <MenuItem key={index} value={position.positionId}>
                            {position.positionName}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                  {errors.positionId && touched.positionId ? (
                    <Typography variant="caption" color="error">
                      {errors.positionId}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item lg={12} xs={12}>
                  <Grid item xs={12}>
                    <TextField
                      type="file"
                      size="small"
                      fullWidth
                      name="employeeImage"
                      // value={employeeData.employeeImage}
                      onChange={(e) => handleImageChange(e)}
                    />
                    <VisuallyHiddenInput
                      id="employee-image-file"
                      type="file"
                      name="employeeImage"
                    />
                    <InputLabel
                      htmlFor="employee-image-file"
                      style={{ marginTop: "5px" }}
                    >
                      Upload Employee Image
                    </InputLabel>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <TextField
                      type="file"
                      size="small"
                      fullWidth
                      name="employeeResume"
                      // value={employeeData.employeeResume}
                      onChange={handleImageChange}
                    />
                    <VisuallyHiddenInput
                      id="employee-resume-file"
                      type="file"
                    />
                    <InputLabel
                      htmlFor="employee-resume-file"
                      style={{ marginTop: "5px" }}
                    >
                      Upload Employee Resume
                    </InputLabel>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <TextField
                      type="file"
                      size="small"
                      fullWidth
                      name="adharImage"
                      // value={employeeData.employeeResume}
                      onChange={handleImageChange}
                    />
                    <VisuallyHiddenInput id="employee-adhar-file" type="file" />
                    <InputLabel
                      htmlFor="employee-adhar-file"
                      style={{ marginTop: "5px" }}
                    >
                      Upload Adhar Image
                    </InputLabel>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <TextField
                      type="file"
                      size="small"
                      fullWidth
                      name="signImage"
                      // value={employeeData.employeeResume}
                      onChange={handleImageChange}
                    />
                    <InputLabel
                      htmlFor="employee-sign-file"
                      style={{ marginTop: "5px" }}
                    >
                      Upload Signature
                    </InputLabel>

                    <VisuallyHiddenInput id="employee-sign-file" type="file" />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
