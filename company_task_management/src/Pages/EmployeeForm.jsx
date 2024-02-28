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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";

const departments = ["Engineering", "Marketing", "Finance", "HR"];
const subDepartments = {
  Engineering: ["Software Development", "Hardware Development", "QA"],
  Marketing: ["Digital Marketing", "Offline Marketing"],
  Finance: ["Accounts", "Audit"],
  HR: ["Recruitment", "Training"],
};

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

  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    surname: "",
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
  });

  const [errors, setErrors] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Perform validation for each field
    validateField(name, value);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
      case "dob":
      case "address":
      case "gender":
      case "dateOfJoining":
      case "department":
      case "subDepartment":
      case "adharNo":
      case "email":
      case "mobileNo":
      case "alternateMobileNo":
      case "employeeImage":
      case "employeeResume":
        if (!value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "This field is required",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if there are any errors before submission
    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
      // Handle form submission here
      console.log("Employee data submitted:", employeeData);
      // Close the dialog
      handleClose();
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Employee
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={employeeData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={employeeData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Surname"
                  name="surname"
                  value={employeeData.surname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  name="dob"
                  value={employeeData.dob}
                  onChange={handleChange}
                />
                <InputLabel>Date of Birth</InputLabel>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={employeeData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={employeeData.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label=""
                  type="date"
                  name="dateOfJoining"
                  value={employeeData.dateOfJoining}
                  onChange={handleChange}
                />
                <InputLabel htmlFor="employee-image-file">
                  Date of Joining
                </InputLabel>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Adhar No"
                  name="adharNo"
                  value={employeeData.adharNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={employeeData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Mobile No"
                  name="mobileNo"
                  value={employeeData.mobileNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Alternate Mobile No"
                  name="alternateMobileNo"
                  value={employeeData.alternateMobileNo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="file"
                  fullWidth
                  name="employeeImage"
                  value={employeeData.employeeImage}
                  onChange={handleChange}
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
                />
                <InputLabel htmlFor="employee-image-file">
                  Upload Employee Image
                </InputLabel>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="file"
                  fullWidth
                  name="employeeResume"
                  value={employeeData.employeeResume}
                  onChange={handleChange}
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
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={employeeData.department}
                    onChange={handleChange}
                  >
                    {departments.map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Sub Department</InputLabel>
                  <Select
                    name="subDepartment"
                    value={employeeData.subDepartment}
                    onChange={handleChange}
                  >
                    {subDepartments[employeeData.department]?.map(
                      (subDepartment) => (
                        <MenuItem key={subDepartment} value={subDepartment}>
                          {subDepartment}
                        </MenuItem>
                      )
                    )}
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
import React from "react"

function EmployeeForm() {
  return <div>form</div>
}

export default EmployeeForm
