import * as React from "react"
import Avatar from "@mui/material/Avatar"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import { Link } from "react-router-dom"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useFormik } from "formik"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import {
  Button,
  Divider,
  FormControl,
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
import { EmployeeSchema } from "../Validation/validationSchema"
import { insertEmp } from "../../Slices/EmployeeSlice"
import { fetchPosition } from "../../Slices/PositionSlice"
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
    roleId: 8,
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main", margin: "auto" }}>
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
                <Grid item lg={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Account number"
                    size="small"
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
                <Grid item lg={12} xs={12}>
                  <TextField
                    fullWidth
                    label="IFSC"
                    size="small"
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
                <Grid item lg={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Branch Name"
                    size="small"
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
                <Grid item lg={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Upi Id"
                    size="small"
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
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

// formData.append("AccountHolderName", values.accountHolderName)
// formData.append("IfscCode", values.ifscCode)
// formData.append("AccountNo", values.accountNo)
// formData.append("BankName", values.bankName)
// formData.append("BranchName", values.branchName)
// formData.append("EmployeeAge", values.employeeAge)
// formData.append("UpiId", values.upiId)
