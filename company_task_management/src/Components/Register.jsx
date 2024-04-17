import * as React from "react";
import Avatar from "@mui/material/Avatar";
//import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { EmployeeSchema } from "./Validation/validationSchema";
import { Fab, FormControl, InputLabel, MenuItem, Select, styled } from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';

//import { useFormik } from 'formik';

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const movetopage = () => {
  window.location = "Task";
};

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
  const movetopage = () => {
    window.location = "Task";
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };
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
  

  

const Positions = ["Engineering", "Marketing", "Finance", "HR"];

  const initValue = {
    firstName: "",
    lastName: "",
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
    rate: "",
    position: "",
  };
  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: EmployeeSchema,
      onSubmit: (data) => {
        alert("Form Submitted!");
        console.log(data);
      },
    }
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={7}
          md={4}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Registeration Form
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
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
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Positions</InputLabel>
                  <Select
                    name="position"
                    //value={initValue.position}
                  >
                    {Positions.map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid><br></br>
              <Grid item xs={6}>
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
              </Grid><br></br>
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
             <br></br>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <Fab variant="extended" size="medium" color="primary">
          <NavigationIcon sx={{ marginRight: 1 }} />
          Submit
        </Fab>
      </Grid>
          </form>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                  
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Log In"}
                  </Link>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
