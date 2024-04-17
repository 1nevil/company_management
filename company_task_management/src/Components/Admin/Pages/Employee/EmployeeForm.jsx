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
  OutlinedInput,
} from "@mui/material"
import styled from "@emotion/styled"
import { EmployeeSchema } from "../../../Validation/validationSchema"
import { useFormik } from "formik"
import { useSelector, useDispatch } from "react-redux"
import { fetchPosition } from "../../../../Slices/PositionSlice"
import { insertEmp } from "../../../../Slices/EmployeeSlice"

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

const EmployeeForm = () => {
  const [open, setOpen] = useState(false)
  const positions = useSelector((state) => state.Position.positions)
  const dispatch = useDispatch()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const initValue = {
    employeeName: "",
    dob: "",
    addressEmployee: "",
    gender: "",
    dateOfJoining: "",
    adharNumber: "",
    employeeAge: 0,
    employeeEmail: "",
    mobileNumber: "",
    altmobileNumber: "",
    employeeImage: "",
    employeeResume: "",
    // rate: "",
    positionId: "",
  }
  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: EmployeeSchema,
      onSubmit: async (data) => {
        alert(data)
        const employeeData = {
          ...data,
          roleId: 4,
          isActive: "1",
          employeePassword: "xyzABC",
          position: null,
          role: null,
        }
        dispatch(insertEmp(employeeData))
        handleClose()
      },
    }
  )

  useEffect(() => {
    dispatch(fetchPosition())
  }, [dispatch])

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Employee
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <form style={{ paddingTop: "10px" }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full name"
                  name="employeeName"
                  //value={employeeData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.employeeName && touched.employeeName ? (
                  <Typography variant="caption" color="error">
                    {errors.employeeName}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="age"
                  name="employeeAge"
                  //value={employeeData.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                />
                {errors.employeeAge && touched.employeeAge ? (
                  <Typography variant="caption" color="error">
                    {errors.employeeAge}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  name="dob"
                  //value={employeeData.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  //label="Date of Birth"
                />
                <InputLabel htmlFor="employee-image-file">
                  Date of Birth
                  {errors.dob && touched.dob ? (
                    <Typography variant="caption" color="error">
                      {errors.dob}
                    </Typography>
                  ) : null}
                </InputLabel>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="addressEmployee"
                  multiline
                  rows={3}
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
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>

                {errors.gender && touched.gender ? (
                  <Typography variant="caption" color="error">
                    {errors.gender}
                  </Typography>
                ) : null}
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
                  {errors.dateOfJoining && touched.dateOfJoining ? (
                    <Typography variant="caption" color="error">
                      {errors.dateOfJoining}
                    </Typography>
                  ) : null}
                </InputLabel>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Adhar No"
                  name="adharNumber"
                  // value={employeeData.adharNo}
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
              {/* <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Rate"
                  name="rate"
                  // value={employeeData.alternateMobileNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.rate && touched.rate ? (
                  <Typography variant="caption" color="error">
                    {errors.rate}
                  </Typography>
                ) : null}
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  type="file"
                  fullWidth
                  name="employeeImage"
                  // value={employeeData.employeeImage}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                {errors.employeeImage && touched.employeeImage ? (
                  <Typography variant="caption" color="error">
                    {errors.employeeImage}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="file"
                  fullWidth
                  name="employeeResume"
                  // value={employeeData.employeeResume}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <VisuallyHiddenInput id="employee-resume-file" type="file" />
                <InputLabel
                  htmlFor="employee-resume-file"
                  style={{ marginTop: "5px" }}
                >
                  Upload Employee Resume
                </InputLabel>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Positions</InputLabel>
                  <Select
                    name="positionId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {positions.map((position, index) => (
                      <MenuItem key={index} value={position.positionId}>
                        {position.positionName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              sx={{ mt: "1rem" }}
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
            >
              Add Employee
            </Button>
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

export default EmployeeForm
