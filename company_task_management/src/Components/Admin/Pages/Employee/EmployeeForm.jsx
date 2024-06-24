/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react"
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Input,
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import styled from "@emotion/styled"
import { AddEmployeeSchema } from "../../../Validation/validationSchema"
import { useFormik } from "formik"
import { useSelector, useDispatch } from "react-redux"
import { fetchPosition } from "../../../../Slices/PositionSlice"
import { insertEmp } from "../../../../Slices/EmployeeSlice"
import Alert from "@mui/material/Alert"
import { toast } from "react-toastify"

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

export default function EmployeeForm() {
  const [successAlertOpen, setSuccessAlertOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const { error, pending } = useSelector((state) => state.Employee) || []

  const [showPositionDropdown, setShowPositionDropdown] = useState(false)
  const [formOpen, setFormOpen] = useState(false) // State variable to track form open/close

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const Positions = useSelector((state) => state.Position.positions)

  useEffect(() => {
    dispatch(fetchPosition())
  }, [dispatch])
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

  const initValue = {
    firstName: "",
    lastName: "",
    surname: "",
    dob: "",
    addressEmployee: "",
    xender: "",
    roleId: "",
    dateOfJoining: "",
    employeeEmail: "",
    mobileNumber: "",
    adharNumber: "",
    altmobileNumber: "",
    employeeImage: "",
    employeeResume: "",
    positionId: "",
    bankName: "",
    accountHolderName: "",
    accountNo: "",
    ifscCode: "",
    branchName: "",
    upiId: "",
    employeeAge: "",
    employeePassword: "",
    signImage: "",
    adharImage: "",
    isActive: "",
  }

  const notifySubmit = () => toast.success("Employee Submitted successfully..")

  const {
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: initValue,
    validationSchema: AddEmployeeSchema,

    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData()
      try {
        formData.append(
          "employeeName",
          `${values.surname} ${values.firstName} ${values.lastName}`
        )
        formData.append("Dob", values.dob)
        formData.append("AddressEmployee", values.addressEmployee)
        formData.append("Xender", values.xender)
        formData.append("RoleId", values.roleId)
        formData.append("DateOfJoining", values.dateOfJoining)
        formData.append("EmployeeEmail", values.employeeEmail)
        formData.append("AdharNumber", values.adharNumber)
        formData.append("AltmobileNumber", values.altmobileNumber)
        formData.append("MobileNumber", values.mobileNumber)
        formData.append("AccountHolderName", values.accountHolderName)
        formData.append("IfscCode", values.ifscCode)
        formData.append("BranchName", values.branchName)
        formData.append("UpiId", values.upiId)
        formData.append("EmployeeAge", values.employeeAge)
        formData.append("EmployeePassword", values.employeePassword)
        formData.append("BankName", values.bankName)
        formData.append("IsActive", "0")
        formData.append("PositionId", values.positionId)
        formData.append("EmployeeImage", values.employeeImage)
        formData.append("SignImage", values.signImage)
        formData.append("EmployeeResume", values.employeeResume)
        formData.append("AdharImage", values.adharImage)

        console.log(formData) // Check if formData has correct data

        // Dispatch the insertEmp action with formData
        dispatch(insertEmp(formData)).then((action) => {
          if (action.meta.requestStatus === "fulfilled") {
            notifySubmit()
            handleClose()
          }
        })

        // Reset form state or handle any UI updates after dispatching action
        setSubmitting(false)
      } catch (error) {
        console.error("Error submitting form:", error)
        setSubmitting(false)
      }
      console.log(formData) // Verify FormData structure in console
    },
  })
  const handleFileChange = (event) => {
    const { name, files } = event.target
    setFieldValue(name, files[0])
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

  const handleDateChange = (event) => {
    const { value } = event.target
    handleChange(event) // Update formik state with new value
    calculateAge(value) // Calculate and update age
  }

  const handleClose = () => {
    setOpen(false)
    setFormOpen(false) // Close the form
  }

  const handleOpen = () => {
    setOpen(true)
    setFormOpen(true) // Open the form
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Employee
      </Button>
      <Dialog open={open} onClose={formOpen ? undefined : handleClose}>
        {" "}
        {/* Disable closing when form is open */}
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <form style={{ paddingTop: "10px" }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="SurName"
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="password"
                  name="employeePassword"
                  // value={employeeData.alternateMobileNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.employeePassword && touched.employeePassword ? (
                  <Typography variant="caption" color="error">
                    {errors.employeePassword}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <Typography variant="h6" component="h6" textAlign="">
                  Date Of Birth
                </Typography> */}
                <TextField
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
              <Grid item xs={12} sm={6}>
                <TextField
                  inputProps={{ readOnly: true }}
                  fullWidth
                  label="Age"
                  name="employeeAge"
                  value={values.employeeAge}
                  //value={employeeData.surname}
                />
                {errors.employeeAge && touched.employeeAge ? (
                  <Typography variant="caption" color="error">
                    {errors.employeeAge}
                  </Typography>
                ) : null}
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
              <Grid item xs={12} sm={6}>
                {
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={errors.xender && touched.xender}
                  >
                    <InputLabel htmlFor="xender">Gender</InputLabel>
                    <Select
                      name="xender"
                      // value={employeeData.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Gender"
                      // InputLabelProps={{
                      //   shrink: true,
                      //   id: "xender",
                      // }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                  </FormControl>
                }
                {errors.xender && touched.xender ? (
                  <Typography variant="caption" color="error">
                    {errors.xender}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  name="dateOfJoining"
                  label="Date Of Joining"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // value={employeeData.dateOfJoining}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.dateOfJoining && touched.dateOfJoining ? (
                  <Typography variant="caption" color="error">
                    {errors.dateOfJoining}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Adhar No"
                  name="adharNumber"
                  inputProps={{ maxLength: 12 }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.adharNumber && touched.adharNumber ? (
                  <Typography variant="caption" color="error">
                    {errors.adharNumber}
                  </Typography>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={6}>
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
                {error && (
                  <Typography variant="caption" color="error">
                    {error}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mobile No"
                  name="mobileNumber"
                  inputProps={{ maxLength: 10 }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.mobileNumber && touched.mobileNumber ? (
                  <Typography variant="caption" color="error">
                    {errors.mobileNumber}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Alternate Mobile No"
                  name="altmobileNumber"
                  inputProps={{ maxLength: 10 }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.altmobileNumber && touched.altmobileNumber ? (
                  <Typography variant="caption" color="error">
                    {errors.altmobileNumber}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                {
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={errors.roleId && touched.roleId}
                  >
                    <InputLabel htmlFor="xender">Role</InputLabel>
                    <Select
                      name="roleId"
                      value={values.roleId}
                      label="Role" // Make sure to assign the value from formik's values object
                      InputLabelProps={{
                        shrink: true,
                        id: "roleId",
                      }}
                      ss
                      onChange={(event) => {
                        handleChange(event) // Update formik's state
                        setSelectedRole(event.target.value)
                        // Toggle position dropdown based on selected role
                        setShowPositionDropdown(event.target.value === "3") // Assuming "Employee" role ID is "3"
                      }}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="2">Admin</MenuItem>
                      <MenuItem value="3">Employee</MenuItem>
                      <MenuItem value="4">Checker</MenuItem>
                    </Select>
                  </FormControl>
                }
                {errors.roleId && touched.roleId ? (
                  <Typography variant="caption" color="error">
                    {errors.roleId}
                  </Typography>
                ) : null}
              </Grid>
              {showPositionDropdown && (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>position</InputLabel>
                    <Select
                      name="positionId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Position"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {Positions?.map((position) => {
                        return (
                          <MenuItem value={position.positionId}>
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
              )}

              <Grid item xs={12}>
                <Typography variant="h6" component="h6" textAlign="">
                  Bank Details
                </Typography>
              </Grid>
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

              <Grid item xs={12} mb={4}>
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
                <VisuallyHiddenInput id="employee-resume-file" type="file" />
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
                <VisuallyHiddenInput id="employee-adhar-file" type="file" />
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

                <VisuallyHiddenInput id="employee-sign-file" type="file" />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              mt={5}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <LoadingButton
                loading={pending}
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

//
