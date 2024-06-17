import * as React from "react"
import Avatar from "@mui/material/Avatar"
//import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
//import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useFormik } from "formik"
import { EmployeeSchema } from "./Validation/validationSchema"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  NativeSelect,
  OutlinedInput,
  Select,
  styled,
} from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchPosition } from "../Slices/PositionSlice"
import { useSelector } from "react-redux"
import InputAdornment from "@mui/material/InputAdornment"
import { insertEmp } from "../Slices/EmployeeSlice"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
const defaultTheme = createTheme()

export default function Register() {
  const dispatch = useDispatch()
  const Positions = useSelector((state) => state.Position.positions)

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

  //  console.log(images)
  const handleDateChange = (event) => {
    const { value } = event.target
    handleChange(event) // Update formik state with new value
    calculateAge(value) // Calculate and update age
  }

  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const {
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
      alert("df")

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
      {/* {JSON.stringify(errors)} */}
      <Grid container component="main">
        <CssBaseline />

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          sx={{ margin: "auto" }}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "center",
              // padding:"20px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Employee Registeration Form
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
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
                <Grid item xs={6}>
                  <TextField
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
                <Grid item xs={6}>
                  <TextField
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="date"
                    name="dob"
                    //value={employeeData.dob}
                    onChange={handleDateChange}
                    onBlur={handleBlur}
                    //label="Date of Birth"
                  />
                  <InputLabel htmlFor="employee-image-file">
                    Date of Birth
                  </InputLabel>
                  {errors.dob && touched.dob ? (
                    <Typography variant="caption" color="error">
                      {errors.dob}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      fullwidth
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
                      label="Password"
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
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
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
                <Grid item xs={6}>
                  <FormControl fullWidth>
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label=""
                    type="date"
                    name="dateOfJoining"
                    // value={employeeData.dateOfJoining}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <InputLabel htmlFor="employee-image-file">
                    Date of Joining
                  </InputLabel>
                  {errors.dateOfJoining && touched.dateOfJoining ? (
                    <Typography variant="caption" color="error">
                      {errors.dateOfJoining}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <TextField
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
                <Grid item xs={6}>
                  <TextField
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
                <Grid item xs={6}>
                  <TextField
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
                <Grid item xs={6}>
                  <TextField
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Position
                    </InputLabel>
                    <Select
                      name="positionId"
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
              </Grid>
              <Typography
                variant="h6"
                sx={{ m: "1rem 0rem 1rem 0rem" }}
                component="h6"
              >
                Bank Details
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bankName"
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account Holder Name"
                  name="accountHolderName"
                  // value={employeeData.alternateMobileNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.accountHolderName && touched.accountHolderName ? (
                  <Typography variant="caption" color="error">
                    {errors.accountHolderName}
                  </Typography>
                ) : null}
              </Grid>
              <br></br>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account number"
                  name="accountNo"
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="IFSC"
                  name="ifscCode"
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Branch Name"
                  name="branchName"
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Upi Id"
                  name="upiId"
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
              <br></br>
              <h2>Mention Previous Clients/Companies </h2>

              <div style={{ textAlign: "center" }}>
                <Grid sx={{ "& .MuiTextField-root": { m: 1 } }}>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="#7986cb"
                    textAlign="center"
                  ></Typography>

                  {showAdditionalInputs && (
                    <div>
                      {[...Array(additionalInputCount)].map((_, index) => (
                        <div key={index} style={{ alignItems: "center" }}>
                          <Box sx={{ display: "flex", gap: "15px" }}>
                            <Grid container spacing={2} xs={10}>
                              <Grid item xs={12}>
                                <TextField
                                  label={`Client/Company Name ${index + 1}`}
                                  fullWidth
                                  name={`ClientName ${index + 1}`}
                                  value={inputFields[index]?.ClientName || ""}
                                  onChange={handleChangeCompanyInputs(
                                    index,
                                    "ClientName"
                                  )}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  label={`Service Category Name ${index + 1}`}
                                  fullWidth
                                  name={`ServiceName ${index + 1}`}
                                  value={inputFields[index]?.ServiceName || ""}
                                  onChange={handleChangeCompanyInputs(
                                    index,
                                    "ServiceName"
                                  )}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  label={`Phone Number ${index + 1}`}
                                  fullWidth
                                  name={`ClientPhoneNumber ${index + 1}`}
                                  value={
                                    inputFields[index]?.ClientPhoneNumber || ""
                                  }
                                  onChange={handleChangeCompanyInputs(
                                    index,
                                    "ClientPhoneNumber"
                                  )}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Divider width="100%" sx={{ color: "black" }} />
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
                      ))}
                    </div>
                  )}
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleAddInput}
                      startIcon={<AddIcon />}
                    >
                      Add Feilds
                    </Button>
                  </Box>

                  {/* Render button to add input */}
                </Grid>
              </div>

              <br></br>

              <Grid item xs={12}>
                <TextField
                  type="file"
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
                  fullWidth
                  name="employeeResume"
                  // value={employeeData.employeeResume}
                  onChange={handleImageChange}
                />
                <VisuallyHiddenInput id="employee-resume-file" type="file" />
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
              <br></br>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              ></Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                Register Employee
              </Button>
            </Box>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  Log In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
