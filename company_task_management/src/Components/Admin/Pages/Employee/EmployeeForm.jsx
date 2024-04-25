import React, { useEffect, useState } from "react";
//import * as React from "react";
//import Avatar from "@mui/material/Avatar";
//import Button from "@mui/material/Button";
//import CssBaseline from "@mui/material/CssBaseline";
//import TextField from "@mui/material/TextField";
//import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";
//import Link from "@mui/material/Link";
//import Paper from "@mui/material/Paper";
//import Box from "@mui/material/Box";
//import Grid from "@mui/material/Grid";
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
//import Typography from "@mui/material/Typography";
//import { createTheme, ThemeProvider } from "@mui/material/styles";
//import { useFormik } from "formik";
//import { EmployeeSchema } from "./Validation/validationSchema";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigationIcon from "@mui/icons-material/Navigation";

import AddIcon from "@mui/icons-material/Add";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Fab,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  OutlinedInput,
  NativeSelect,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import styled from "@emotion/styled";
import { EmployeeSchema } from "../../../Validation/validationSchema";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosition } from "../../../../Slices/PositionSlice";
import { insertEmp } from "../../../../Slices/EmployeeSlice";

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
  const positions = useSelector((state) => state.Position.positions);
  const dispatch = useDispatch();
  const [showAdditionalInputs, setshowAdditionalInputs] = useState(false);
  const [additionalInputCount, setadditionalInputCount] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddInput = () => {
    setadditionalInputCount((prevcount) => prevcount + 1);
    showAdditionalInputs(true);
  };
  const handleDeleteInput = () => {
    setadditionalInputCount((prevcount) => prevcount - 1);
  };

  const initValue = {
    firstName: "",
    lastName: "",
    surname: "",
    dob: "",
    address: "",
    gender: "",
    dateOfJoining: "",
    email: "",
    mobileNo: "",
    adharNo: "",
    alternateMobileNo: "",
    employeeImage: "",
    employeeResume: "",
    // rate: "",
    positionId: "",
  };
  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: EmployeeSchema,
      onSubmit: async (data) => {
        alert(data);
        const employeeData = {
          ...data,
          roleId: 4,
          isActive: "1",
          employeePassword: "xyzABC",
          position: null,
          role: null,
        };
        dispatch(insertEmp(employeeData));
        handleClose();
      },
    }
  );

  useEffect(() => {
    dispatch(fetchPosition());
  }, [dispatch]);

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
                  id="outlined-multiline-static"
                  fullWidth
                  label="Address"
                  multiline
                  name="address"
                  rows={4}
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
                {
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Gender
                    </InputLabel>

                    <NativeSelect
                      defaultValue={10}
                      inputProps={{
                        name: "gender",
                        id: "uncontrolled-native",
                      }}
                      // value={employeeData.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value={10}>Male</option>
                      <option value={20}>Female</option>
                      <option value={30}>Others</option>
                    </NativeSelect>
                  </FormControl>
                }
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
                  name="adharNo"
                  inputProps={{ maxLength: 12 }}
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 12);
                    handleChange(e);
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
                      e.preventDefault();
                    }
                  }}
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
                  inputProps={{ maxLength: 10 }}
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    handleChange(e);
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
                      e.preventDefault();
                    }
                  }}
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
                  inputProps={{ maxLength: 10 }}
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    handleChange(e);
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
                      e.preventDefault();
                    }
                  }}
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
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Positions
                  </InputLabel>
                  <NativeSelect
                    defaultValue={10}
                    inputProps={{
                      name: "position",
                    }}
                    //value={initValue.position}
                  >
                    {positions.map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Grid>
            </Grid>
            <br></br>
            <h2>Bank Details</h2>
            <br></br>
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
                name="accHolderName"
                // value={employeeData.alternateMobileNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.accHolderName && touched.accHolderName ? (
                <Typography variant="caption" color="error">
                  {errors.accHolderName}
                </Typography>
              ) : null}
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Account number"
                name="accNumber"
                // value={employeeData.alternateMobileNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.accNumber && touched.accNumber ? (
                <Typography variant="caption" color="error">
                  {errors.accNumber}
                </Typography>
              ) : null}
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="IFSC"
                name="ifsc"
                // value={employeeData.alternateMobileNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.ifsc && touched.ifsc ? (
                <Typography variant="caption" color="error">
                  {errors.ifsc}
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
            {/* ------------------------------------ */}
            <div style={{ textAlign: "center" }}>
              <Grid sx={{ "& .MuiTextField-root": { m: 1 } }}>
                <Typography
                  variant="h6"
                  component="h6"
                  color="#7986cb"
                  textAlign="center"
                ></Typography>
                <Divider width="100%" sx={{ marginBottom: ".5rem" }} />
                {showAdditionalInputs && (
                  <div>
                    {[...Array(additionalInputCount)].map((_, index) => (
                      <div key={index} style={{ alignItems: "center" }}>
                        <Box sx={{ display: "flex", gap: "15px" }}>
                          <Grid xs={10}>
                            <Grid>
                              <TextField
                                label={`Client/Company Name ${index + 1}`}
                                // variant="outlined"
                                fullWidth
                                name={`ClientCompanyName ${index + 1}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // size="small"
                              />
                            </Grid>
                            {errors.checklist && touched.checklist ? (
                              <Typography variant="caption" color="error">
                                {errors.checklist}
                              </Typography>
                            ) : null}
                            <Grid>
                              <TextField
                                label={`Service Category Name ${index + 1}`}
                                // variant="outlined"
                                fullWidth
                                name={`ServiceCategoryName ${index + 1}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // size="small"
                              />
                            </Grid>
                            {errors.checklist && touched.checklist ? (
                              <Typography variant="caption" color="error">
                                {errors.checklist}
                              </Typography>
                            ) : null}
                            <Grid>
                              <TextField
                                label={`Phone Number ${index + 1}`}
                                // variant="outlined"
                                fullWidth
                                name={`PhoneNumber ${index + 1}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                // size="small"
                              />
                            </Grid>
                            {errors.checklist && touched.checklist ? (
                              <Typography variant="caption" color="error">
                                {errors.checklist}
                              </Typography>
                            ) : null}
                            <Divider
                              width="100%"
                              sx={{ color: "black", width: "70vh" }}
                            />
                          </Grid>
                          <Grid sx={{ display: "flex" }} xs={2}>
                            <IconButton
                              sx={{ m: "auto" }}
                              aria-label="delete"
                              color="error"
                              onClick={handleDeleteInput}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Box>
                      </div>
                    ))}
                  </div>
                )}

                {/* Render button to add input */}

                <Button
                  variant="outlined"
                  sx={{ width: "97%", margin: "0.5rem 0 0 0.5rem" }}
                  onClick={handleAddInput}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Grid>
            </div>
            {/* ------------------------------------ */}
            <br></br>

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
            <br></br>
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
            <br></br>
            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                name="employeeAdharImage"
                // value={employeeData.employeeResume}
                onChange={handleChange}
                onBlur={handleBlur}
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
                name="employeeSign"
                // value={employeeData.employeeResume}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <VisuallyHiddenInput id="employee-sign-file" type="file" />
              <InputLabel
                htmlFor="employee-sign-file"
                style={{ marginTop: "5px" }}
              >
                Upload Signature
              </InputLabel>
            </Grid>

            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Fab variant="extended" size="medium" color="primary">
                <NavigationIcon sx={{ marginRight: 1 }} />
                Submit
              </Fab>
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
};

export default EmployeeForm;
