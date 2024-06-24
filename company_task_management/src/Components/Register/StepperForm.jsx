import React, { useState } from "react"
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Grid,
  Paper,
  styled,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Avatar,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import PropTypes from "prop-types"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useDispatch, useSelector } from "react-redux"
import { insertEmp } from "../../Slices/EmployeeSlice"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { EmployeeSchema } from "../Validation/validationSchema"
import { useEffect } from "react"
import { fetchPosition } from "../../Slices/PositionSlice"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"

const defaultTheme = createTheme()

const steps = ["Personal Details", "Bank Details", "Previous Client / Company"]

const StepperForm = () => {
  const dispatch = useDispatch()
  const Positions = useSelector((state) => state.Position.positions)
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState({})
  const [additionalInputCount, setAdditionalInputCount] = useState(0)
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false)
  const [inputFields, setInputFields] = useState([])

  const handleChangeCompanyInputs = (index, field) => (event) => {
    const newInputFields = [...inputFields]
    newInputFields[index][field] = event.target.value
    setInputFields(newInputFields)
  }

  const handleAddInput = () => {
    setAdditionalInputCount(additionalInputCount + 1)
    setShowAdditionalInputs(true)
    setInputFields([
      ...inputFields,
      { ClientName: "", ServiceName: "", ClientPhoneNumber: "" },
    ])
  }

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

  const handleDeleteInput = (index) => () => {
    const newInputFields = [...inputFields]
    newInputFields.splice(index, 1)
    setInputFields(newInputFields)
    setAdditionalInputCount(additionalInputCount - 1)
    if (additionalInputCount === 1) {
      setShowAdditionalInputs(false)
    }
  }

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
    roleId: 8,
    employeePassword: "",
  }
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

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
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initValue,
    validationSchema: EmployeeSchema,
    onSubmit: (values) => {
      console.table(values)
      console.table(inputFields)
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
      formData.append("AccountHolderName", values.accountHolderName)
      formData.append("IfscCode", values.ifscCode)
      formData.append("AccountNo", values.accountNo)
      formData.append("BankName", values.bankName)
      formData.append("BranchName", values.branchName)
      formData.append("EmployeeAge", values.employeeAge)
      formData.append("UpiId", values.upiId)
      formData.append("EmployeePassword", values.employeePassword)
      formData.append("PositionId", String(values.positionId))
      formData.append("AdharImage", images.adharImage)
      formData.append("SignImage", images.signImage) //   Corrected this field name
      formData.append("EmployeeResume", images.employeeResume)
      formData.append("EmployeeImage", images.employeeImage)
      formData.append("IsActive", "0")

      formData.append("PreviousCompanyDetails", JSON.stringify(inputFields))

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

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  const handleComplete = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    handleNext()
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
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
                    <Avatar
                      sx={{ m: 1, bgcolor: "secondary.main", margin: "auto" }}
                    >
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
                          value={values.firstName}
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
                          value={values.lastName}
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
                          value={values.surname}
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
                          value={values.dob}
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
                            value={values.employeePassword}
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
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            // label="Password"
                          />
                          {errors.employeePassword &&
                          touched.employeePassword ? (
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
                            label="Confirm Password"
                            value={values.confirmPassword}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
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
                          value={values.addressEmployee}
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
                            value={values.xender}
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
                          value={values.dateOfJoining}
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
                          value={values.adharNumber}
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
                          value={values.employeeEmail}
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
                          value={values.mobileNumber}
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
                          value={values.altmobileNumber}
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
                            value={values.positionId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            {Positions?.map((position, index) => {
                              return (
                                <MenuItem
                                  key={index}
                                  value={position.positionId}
                                >
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
                            // value={values.employeeImage}
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
                            value={values.employeeImage}
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
                            // value={values.employeeResume}
                            name="employeeResume"
                            // value={employeeData.employeeResume}
                            onChange={handleImageChange}
                          />
                          <VisuallyHiddenInput
                            id="employee-resume-file"
                            type="file"
                          />
                          <InputLabel
                            value={values.employeeResume}
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
                          <VisuallyHiddenInput
                            id="employee-adhar-file"
                            type="file"
                          />
                          <InputLabel
                            value={values.adharImage}
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
                            value={values.signImage}
                            htmlFor="employee-sign-file"
                            style={{ marginTop: "5px" }}
                          >
                            Upload Signature
                          </InputLabel>

                          <VisuallyHiddenInput
                            id="employee-sign-file"
                            type="file"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </ThemeProvider>
        )
      case 1:
        return (
          <ThemeProvider theme={defaultTheme}>
            <Grid container component="main">
              <CssBaseline />

              <Grid item xs={11} sm={8} md={9} lg={6} sx={{ margin: "auto" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                  }}
                >
                  <Box sx={{ textAlign: "center", gap: "20px" }}>
                    <Avatar
                      sx={{ m: 1, bgcolor: "secondary.main", margin: "auto" }}
                    >
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
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
                      <Grid item lg={12} xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Bank Name"
                          name="bankName"
                          value={values.bankName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.bankName && touched.bankName ? (
                          <Typography variant="caption" color="error">
                            {errors.bankName}
                          </Typography>
                        ) : null}
                      </Grid>
                      <br></br>
                      <Grid item lg={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Account Holder Name"
                          size="small"
                          name="accountHolderName"
                          value={values.accountHolderName}
                          // value={employeeData.alternateMobileNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.accountHolderName &&
                        touched.accountHolderName ? (
                          <Typography variant="caption" color="error">
                            {errors.accountHolderName}
                          </Typography>
                        ) : null}
                      </Grid>
                      <br></br>
                      <Grid item lg={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Account number"
                          size="small"
                          name="accountNo"
                          value={values.accountNo}
                          // value={employeeData.alternateMobileNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.accountNo && touched.accountNo ? (
                          <Typography variant="caption" color="error">
                            {errors.accountNo}
                          </Typography>
                        ) : null}
                      </Grid>
                      <br></br>
                      <Grid item lg={12} xs={12}>
                        <TextField
                          fullWidth
                          label="IFSC"
                          size="small"
                          name="ifscCode"
                          value={values.ifscCode}
                          // value={employeeData.alternateMobileNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.ifscCode && touched.ifscCode ? (
                          <Typography variant="caption" color="error">
                            {errors.ifscCode}
                          </Typography>
                        ) : null}
                      </Grid>
                      <br></br>
                      <Grid item lg={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Branch Name"
                          size="small"
                          name="branchName"
                          value={values.branchName}
                          // value={employeeData.alternateMobileNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.branchName && touched.branchName ? (
                          <Typography variant="caption" color="error">
                            {errors.branchName}
                          </Typography>
                        ) : null}
                      </Grid>
                      <br></br>
                      <Grid item lg={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Upi Id"
                          size="small"
                          name="upiId"
                          value={values.upiId}
                          // value={employeeData.alternateMobileNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.upiId && touched.upiId ? (
                          <Typography variant="caption" color="error">
                            {errors.upiId}
                          </Typography>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </ThemeProvider>
        )
      case 2:
        return (
          <ThemeProvider theme={defaultTheme}>
            <Grid container component="main">
              <CssBaseline />

              <Grid item xs={11} sm={8} md={9} lg={6} sx={{ margin: "auto" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                  }}
                >
                  <Box sx={{ textAlign: "center", gap: "20px" }}>
                    <Avatar
                      sx={{ m: 1, bgcolor: "secondary.main", margin: "auto" }}
                    >
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Employee Registeration Form
                    </Typography>
                  </Box>
                  <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    onSubmit={handleSubmit}
                  >
                    <h2>Mention Previous Clients/Companies </h2>

                    <Grid container spacing={2}>
                      <Grid item lg={12} xs={12}>
                        <Grid sx={{ "& .MuiTextField-root": { m: 1 } }}>
                          <Typography
                            variant="h6"
                            component="h6"
                            color="#7986cb"
                            textAlign="center"
                          ></Typography>

                          {showAdditionalInputs && (
                            <div>
                              {[...Array(additionalInputCount)].map(
                                (_, index) => (
                                  <div
                                    key={index}
                                    style={{ alignItems: "center" }}
                                  >
                                    <Box sx={{ display: "flex", gap: "15px" }}>
                                      <Grid container spacing={2} xs={10}>
                                        <Grid item xs={12}>
                                          <TextField
                                            label={`Client/Company Name ${
                                              index + 1
                                            }`}
                                            size="small"
                                            fullWidth
                                            name={`ClientName ${index + 1}`}
                                            value={
                                              inputFields[index]?.ClientName ||
                                              values.ClientName
                                            }
                                            onChange={handleChangeCompanyInputs(
                                              index,
                                              "ClientName"
                                            )}
                                          />
                                        </Grid>
                                        <Grid item xs={12}>
                                          <TextField
                                            label={`Service Category Name ${
                                              index + 1
                                            }`}
                                            size="small"
                                            fullWidth
                                            name={`ServiceName ${index + 1}`}
                                            value={
                                              inputFields[index]?.ServiceName ||
                                              values.ServiceName
                                            }
                                            onChange={handleChangeCompanyInputs(
                                              index,
                                              "ServiceName"
                                            )}
                                          />
                                        </Grid>
                                        <Grid item xs={12}>
                                          <TextField
                                            label={`Phone 
                                  Number ${index + 1}`}
                                            size="small"
                                            fullWidth
                                            name={`ClientPhoneNumber ${
                                              index + 1
                                            }`}
                                            value={
                                              inputFields[index]
                                                ?.ClientPhoneNumber ||
                                              values.ClientPhoneNumber
                                            }
                                            onChange={handleChangeCompanyInputs(
                                              index,
                                              "ClientPhoneNumber"
                                            )}
                                          />
                                        </Grid>
                                        <Grid item xs={12}>
                                          <Divider
                                            width="100%"
                                            sx={{ color: "black" }}
                                          />
                                        </Grid>
                                      </Grid>
                                      <Grid sx={{ display: "flex" }} xs={2}>
                                        <IconButton
                                          sx={{ m: "auto" }}
                                          aria-label="delete"
                                          color="error"
                                          onClick={handleDeleteInput(index)}
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </Grid>
                                    </Box>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                          <Box mt={2}>
                            <Button
                              variant="outlined"
                              size="small"
                              fullWidth
                              onClick={handleAddInput}
                              startIcon={<AddIcon />}
                            >
                              Add Feilds
                            </Button>
                          </Box>

                          {/* Render button to add input */}
                        </Grid>

                        <br></br>

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ marginTop: "20px" }}
                        >
                          Register Employee
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  <Grid container>
                    <Grid item>
                      <Link to="/" variant="body2">
                        Log In
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </ThemeProvider>
        )
      default:
        return "Unknown step"
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          borderRight: isSmallScreen ? "none" : "1px solid #ddd",
          borderBottom: isSmallScreen ? "1px solid #ddd" : "none",
          flex: isSmallScreen ? "0 0 auto" : "1 1 20%",
          padding: isSmallScreen ? 2 : 4,
        }}
      >
        <Stepper
          activeStep={activeStep}
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          sx={{ marginTop: 5 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box sx={{ flex: "1 1 80%", padding: 3 }}>
        <Paper
          elevation={3}
          sx={{ padding: 3, height: "100%", overflowY: "auto" }}
        >
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Registration Complete
              </Typography>
              <Typography variant="subtitle1">
                Thank you for completing the registration form.
              </Typography>
            </>
          ) : (
            <Box onSubmit={handleSubmit}>
              {getStepContent(activeStep)}
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: 2,
                  // mb: 3,
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Grid item sm={1}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} fullWidth>
                      Back
                    </Button>
                  )}
                </Grid>
                <Grid item sm={1}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  )
}

StepperForm.propTypes = {
  formData: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
}

export default StepperForm
