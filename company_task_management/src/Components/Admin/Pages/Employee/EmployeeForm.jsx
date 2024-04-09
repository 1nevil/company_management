import React, { useState } from "react";
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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import { EmployeeSchema } from "../../../Validation/validationSchema";
import { useFormik } from "formik";

const Positions = ["Engineering", "Marketing", "Finance", "HR"];

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

const EmployeeForm = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initValue = {
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    gender: "",
    dateOfJoining: "",
    department: "",
    subDepartment: "",
    adharNo: "",
    email: "",
    mobileNo: "",
    alternateMobileNo: "",
    employeeImage: "",
    employeeResume: "",
    rate: "",
    position: "",
  };
  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: EmployeeSchema,
      onSubmit: (data) => {
        alert("hello world");
        console.log(data);
      },
    }
  );

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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Date of Birth"
                />
                {errors.dob && touched.dob ? (
                  <Typography variant="caption" color="error">
                    {errors.dob}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  // value={employeeData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address ? (
                  <Typography variant="caption" color="error">
                    {errors.address}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    // value={employeeData.gender}
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
                  name="adharNo"
                  // value={employeeData.adharNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.adharNo && touched.adharNo ? (
                  <Typography variant="caption" color="error">
                    {errors.adharNo}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  // value={employeeData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <Typography variant="caption" color="error">
                    {errors.email}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Mobile No"
                  name="mobileNo"
                  // value={employeeData.mobileNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.mobileNo && touched.mobileNo ? (
                  <Typography variant="caption" color="error">
                    {errors.mobileNo}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Alternate Mobile No"
                  name="alternateMobileNo"
                  // value={employeeData.alternateMobileNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.alternateMobileNo && touched.alternateMobileNo ? (
                  <Typography variant="caption" color="error">
                    {errors.alternateMobileNo}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Rate"
                  name="Rate"
                  // value={employeeData.alternateMobileNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.rate && touched.rate ? (
                  <Typography variant="caption" color="error">
                    {errors.rate}
                  </Typography>
                ) : null}
              </Grid>
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
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "employeeImage",
                        value: e.target.files[0],
                      },
                    })
                  }
                  name="employeeImage"
                  onBlur={handleBlur}
                />
                <InputLabel htmlFor="employee-image-file">
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
                <VisuallyHiddenInput
                  id="employee-resume-file"
                  type="file"
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "employeeResume",
                        value: e.target.files[0],
                      },
                    })
                  }
                />
                <InputLabel htmlFor="employee-resume-file">
                  Upload Employee Resume
                </InputLabel>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Positions</InputLabel>
                  <Select
                    name="Positions"
                    // value={employeeData.Positions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {Positions.map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary">
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
  );
};

export default EmployeeForm;
