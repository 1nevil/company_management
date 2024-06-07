/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import styled from "@emotion/styled";
import { EmployeeSchema } from "../../../Validation/validationSchema";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosition } from "../../../../Slices/PositionSlice";
import { insertEmp } from "../../../../Slices/EmployeeSlice";
import Alert from "@mui/material/Alert";

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
});

export default function EmployeeForm() {
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [formOpen, setFormOpen] = useState(false); // State variable to track form open/close

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const Positions = useSelector((state) => state.Position.positions);

  useEffect(() => {
    dispatch(fetchPosition());
  }, [dispatch]);

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
    mobileNumber: 0,
    adharNumber: 0,
    altmobileNumber: 0,
    employeeImage: "",
    employeeResume: "",
    positionId: "",
    bankName: "",
    accountHolderName: "",
    accountNo: "",
    ifscCode: "",
    branchName: "",
    upiId: "",
    employeeAge: 0,
    employeePassword: "",
    signImage: "",
    adharImage: "",
    isActive: "",
  };

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
    validationSchema: EmployeeSchema,
    onSubmit: (values) => {
      setSuccessAlertOpen(true);
      console.log(values);
      dispatch(
        insertEmp({
          employeeName:
            values.surname + " " + values.firstName + " " + values.lastName,
          dob: values.dob,
          addressEmployee: values.addressEmployee,
          xender: values.xender,
          roleId: values.roleId,
          dateOfJoining: values.dateOfJoining,
          employeeEmail: values.employeeEmail,
          adharNumber: values.adharNumber,
          altmobileNumber: values.altmobileNumber,
          mobileNumber: values.mobileNumber,

          accountHolderName: values.accountHolderName,
          ifscCode: values.ifscCode,
          accountNo: values.accountNo,
          bankName: values.bankName,
          branchName: values.branchName,

          employeeAge: values.employeeAge,
          upiId: values.upiId,
          employeePassword: values.employeePassword,
          positionId: String(values.positionId),
          adharImage: values.adharImage,
          SignatureImage: values.signImage,
          employeeResume: values.employeeResume,
          employeeImage: values.employeeImage,
          isActive: "1",
        })
      );
    },
  });
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let ageDiff = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      ageDiff--;
    }

    setFieldValue("employeeAge", ageDiff.toString()); // Update age
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    handleChange(event); // Update formik state with new value
    calculateAge(value); // Calculate and update age
  };

  const handleClose = () => {
    setOpen(false);
    setFormOpen(false); // Close the form
  };

  const handleOpen = () => {
    setOpen(true);
    setFormOpen(true); // Open the form
  };
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
          {successAlertOpen && (
            <Alert severity="success">Form submitted successfully!</Alert>
          )}
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
                <Typography variant="h6" component="h6" textAlign="">
                  Date Of Birth
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  name="dob"
                  //value={employeeData.dob}
                  onChange={handleDateChange}
                  onBlur={handleBlur}
                  //label="Date of Birth"
                />
                {errors.dob && touched.dob ? (
                  <Typography variant="caption" color="error">
                    {errors.dob}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} mt={4}>
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
                <Typography variant="h6" component="h6" textAlign="">
                  Gender
                </Typography>
                {
                  <FormControl fullWidth>
                    <Select
                      name="xender"
                      // value={employeeData.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                <Typography variant="h6" component="h6" textAlign="">
                  Date Of Joining
                </Typography>
                <TextField
                  fullWidth
                  label=""
                  type="date"
                  name="dateOfJoining"
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
                <Typography variant="h6" component="h6" textAlign="">
                  Role
                </Typography>
                {
                  <FormControl fullWidth>
                    <Select
                      name="roleId"
                      value={values.roleId} // Make sure to assign the value from formik's values object
                      onChange={(event) => {
                        handleChange(event); // Update formik's state
                        setSelectedRole(event.target.value);
                        // Toggle position dropdown based on selected role
                        setShowPositionDropdown(event.target.value === "3"); // Assuming "Employee" role ID is "3"
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
                  <Typography variant="h6" component="h6">
                    Position
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel></InputLabel>
                    <Select
                      name="positionId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {Positions?.map((position) => {
                        return (
                          <MenuItem value={position.positionId}>
                            {position.positionName}
                          </MenuItem>
                        );
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
            <Grid item xs={12}>
              <Typography variant="h6" component="h6" textAlign="">
                Employee Image
              </Typography>
              <Input
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
              {errors.employeeImage && touched.employeeImage ? (
                <Typography variant="caption" color="error">
                  {errors.employeeImage}
                </Typography>
              ) : null}
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <Typography variant="h6" component="h6" textAlign="">
                Employee Resume
              </Typography>
              <Input
                type="file"
                fullWidth
                name="employeeResume"
                // value={employeeData.employeeResume}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <VisuallyHiddenInput id="employee-resume-file" type="file" />
              {errors.employeeResume && touched.employeeResume ? (
                <Typography variant="caption" color="error">
                  {errors.employeeResume}
                </Typography>
              ) : null}
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <Typography variant="h6" component="h6" textAlign="">
                Adhar Upload
              </Typography>
              <Input
                type="file"
                fullWidth
                name="adharImage"
                // value={employeeData.employeeResume}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <VisuallyHiddenInput id="employee-adhar-file" type="file" />
              {errors.adharImage && touched.adharImage ? (
                <Typography variant="caption" color="error">
                  {errors.adharImage}
                </Typography>
              ) : null}
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <Typography variant="h6" component="h6" textAlign="">
                Employee Sign
              </Typography>
              <Input
                type="file"
                fullWidth
                name="signImage"
                // value={employeeData.employeeResume}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.signImage && touched.signImage ? (
                <Typography variant="caption" color="error">
                  {errors.signImage}
                </Typography>
              ) : null}
            </Grid>
            <Grid
              item
              xs={12}
              mt={5}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button variant="contained" type="submit">
                Submit
              </Button>
              {successAlertOpen && (
                <Alert severity="success">Form submitted successfully!</Alert>
              )}
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
  );
}

//
