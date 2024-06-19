import React, { useState } from "react"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  MenuItem,
  Select,
  FormControl,
  Typography,
} from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import PropTypes from "prop-types"

const validationSchema = Yup.object({
  employeeName: Yup.string().required("Required"),
  employeeDob: Yup.date().required("Required"),
  employeeAge: Yup.number().required("Required"),
  employeeEmail: Yup.string()
    .email("Invalid email format")
    .required("Required"),
  addressEmployee: Yup.string().required("Required"),
  xender: Yup.string().required("Required"),
  roleId: Yup.string().required("Required"),
  positionId: Yup.string().when("roleId", {
    is: "3",
    then: Yup.string().required("Required"),
  }),
  dateOfJoining: Yup.date().required("Required"),
  mobileNumber: Yup.string().required("Required"),
  adharNumber: Yup.string().required("Required"),
  altmobileNumber: Yup.string().required("Required"),
  bankName: Yup.string().required("Required"),
  accountHolderName: Yup.string().required("Required"),
  accountNo: Yup.string().required("Required"),
  ifscCode: Yup.string().required("Required"),
  branchName: Yup.string().required("Required"),
  upiId: Yup.string().required("Required"),
  employeeImage: Yup.mixed().required("Required"),
  employeeResume: Yup.mixed().required("Required"),
})

const TestEmployeeFrom = ({ isOpen, handleClose, Positions }) => {
  const [showPositionDropdown, setShowPositionDropdown] = useState(false)
  const [successAlertOpen, setSuccessAlertOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")

  const handleFileChange = (event) => {
    const { name, files } = event.target
    formik.setFieldValue(name, files[0])
  }

  const handleDateChange = (event) => {
    const dob = new Date(event.target.value)
    const age = new Date().getFullYear() - dob.getFullYear()
    formik.setFieldValue("employeeDob", event.target.value)
    formik.setFieldValue("employeeAge", age)
  }

  const formik = useFormik({
    initialValues: {
      employeeName: "",
      employeeDob: "",
      employeeAge: "",
      employeeEmail: "",
      addressEmployee: "",
      xender: "",
      roleId: "",
      positionId: "",
      dateOfJoining: "",
      mobileNumber: "",
      adharNumber: "",
      altmobileNumber: "",
      bankName: "",
      accountHolderName: "",
      accountNo: "",
      ifscCode: "",
      branchName: "",
      upiId: "",
      employeeImage: null,
      employeeResume: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData()
      for (const key in values) {
        formData.append(key, values[key])
      }

      fetch("/api/employee", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then((data) => {
          console.log("Success:", data)
          handleClose()
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    },
  })

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employee Name"
                name="employeeName"
                value={formik.values.employeeName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.employeeName &&
                  Boolean(formik.errors.employeeName)
                }
                helperText={
                  formik.touched.employeeName && formik.errors.employeeName
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                name="employeeDob"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.employeeDob}
                onChange={handleDateChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.employeeDob &&
                  Boolean(formik.errors.employeeDob)
                }
                helperText={
                  formik.touched.employeeDob && formik.errors.employeeDob
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee Age"
                name="employeeAge"
                value={formik.values.employeeAge}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.employeeAge &&
                  Boolean(formik.errors.employeeAge)
                }
                helperText={
                  formik.touched.employeeAge && formik.errors.employeeAge
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employee Email"
                name="employeeEmail"
                value={formik.values.employeeEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.employeeEmail &&
                  Boolean(formik.errors.employeeEmail)
                }
                helperText={
                  formik.touched.employeeEmail && formik.errors.employeeEmail
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="addressEmployee"
                value={formik.values.addressEmployee}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.addressEmployee &&
                  Boolean(formik.errors.addressEmployee)
                }
                helperText={
                  formik.touched.addressEmployee &&
                  formik.errors.addressEmployee
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography variant="h6" component="h6">
                  Gender
                </Typography>
                <Select
                  name="xender"
                  value={formik.values.xender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.xender && Boolean(formik.errors.xender)}
                >
                  <MenuItem value="">
                    <em>Select Gender</em>
                  </MenuItem>
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                </Select>
                {formik.touched.xender && formik.errors.xender && (
                  <Typography variant="caption" color="error">
                    {formik.errors.xender}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography variant="h6" component="h6">
                  Role
                </Typography>
                <Select
                  name="roleId"
                  value={formik.values.roleId}
                  onChange={(e) => {
                    formik.handleChange(e)
                    setShowPositionDropdown(e.target.value === "3")
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.roleId && Boolean(formik.errors.roleId)}
                >
                  <MenuItem value="">
                    <em>Select Role</em>
                  </MenuItem>
                  <MenuItem value="1">Admin</MenuItem>
                  <MenuItem value="2">HR</MenuItem>
                  <MenuItem value="3">Employee</MenuItem>
                  <MenuItem value="4">Manager</MenuItem>
                </Select>
                {formik.touched.roleId && formik.errors.roleId && (
                  <Typography variant="caption" color="error">
                    {formik.errors.roleId}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {showPositionDropdown && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Typography variant="h6" component="h6">
                    Position
                  </Typography>
                  <Select
                    name="positionId"
                    value={formik.values.positionId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.positionId &&
                      Boolean(formik.errors.positionId)
                    }
                  >
                    <MenuItem value="">
                      <em>Select Position</em>
                    </MenuItem>
                    {Positions.map((position) => (
                      <MenuItem
                        key={position.positionId}
                        value={position.positionId}
                      >
                        {position.positionName}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.positionId && formik.errors.positionId && (
                    <Typography variant="caption" color="error">
                      {formik.errors.positionId}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h6">
                Date Of Joining
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="dateOfJoining"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.dateOfJoining}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.dateOfJoining &&
                  Boolean(formik.errors.dateOfJoining)
                }
                helperText={
                  formik.touched.dateOfJoining && formik.errors.dateOfJoining
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.mobileNumber &&
                  Boolean(formik.errors.mobileNumber)
                }
                helperText={
                  formik.touched.mobileNumber && formik.errors.mobileNumber
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adhar Number"
                name="adharNumber"
                value={formik.values.adharNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.adharNumber &&
                  Boolean(formik.errors.adharNumber)
                }
                helperText={
                  formik.touched.adharNumber && formik.errors.adharNumber
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Alternative Mobile Number"
                name="altmobileNumber"
                value={formik.values.altmobileNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.altmobileNumber &&
                  Boolean(formik.errors.altmobileNumber)
                }
                helperText={
                  formik.touched.altmobileNumber &&
                  formik.errors.altmobileNumber
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bank Name"
                name="bankName"
                value={formik.values.bankName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.bankName && Boolean(formik.errors.bankName)
                }
                helperText={formik.touched.bankName && formik.errors.bankName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Account Holder Name"
                name="accountHolderName"
                value={formik.values.accountHolderName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.accountHolderName &&
                  Boolean(formik.errors.accountHolderName)
                }
                helperText={
                  formik.touched.accountHolderName &&
                  formik.errors.accountHolderName
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Account Number"
                name="accountNo"
                value={formik.values.accountNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.accountNo && Boolean(formik.errors.accountNo)
                }
                helperText={formik.touched.accountNo && formik.errors.accountNo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifscCode"
                value={formik.values.ifscCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.ifscCode && Boolean(formik.errors.ifscCode)
                }
                helperText={formik.touched.ifscCode && formik.errors.ifscCode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Branch Name"
                name="branchName"
                value={formik.values.branchName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.branchName && Boolean(formik.errors.branchName)
                }
                helperText={
                  formik.touched.branchName && formik.errors.branchName
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="UPI ID"
                name="upiId"
                value={formik.values.upiId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.upiId && Boolean(formik.errors.upiId)}
                helperText={formik.touched.upiId && formik.errors.upiId}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="h6">
                Upload Employee Image
              </Typography>
              <TextField
                fullWidth
                type="file"
                name="employeeImage"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.employeeImage &&
                  Boolean(formik.errors.employeeImage)
                }
                helperText={
                  formik.touched.employeeImage && formik.errors.employeeImage
                }
                inputProps={{ accept: "image/*" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="h6">
                Upload Employee Resume
              </Typography>
              <TextField
                fullWidth
                type="file"
                name="employeeResume"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.employeeResume &&
                  Boolean(formik.errors.employeeResume)
                }
                helperText={
                  formik.touched.employeeResume && formik.errors.employeeResume
                }
                inputProps={{ accept: ".pdf,.doc,.docx" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  )
}
TestEmployeeFrom.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  Positions: PropTypes.array.isRequired,
}

export default TestEmployeeFrom
