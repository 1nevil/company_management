import React from "react";
import {
  Container,
  Typography,
  Avatar,
  Grid,
  Paper,
  Divider,
} from "@mui/material";

function EmployeeProfile(params) {
  const employee = {
    name: "Nevil Mistry",
    position: "Backend",
    email: "vevil@example.com",
    avatarUrl:
      "data:image/jpeg;base64,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", // Placeholder image URL
    dob: "10/10/2021",
    addressEmployee: "21, jndnc ,jnsjdfnv, njsdnc ",
    gender: "male",
    dateOfJoining: "21/21/2021",
    adharNumber: "123456789012",
    employeeAge: 21,
    mobileNumber: "12345780",
    altmobileNumber: "9876542310",
    employeeResume: "resume",
  };

  return (
    <Container maxWidth="lg">
      <Paper
        sx={{
          padding: 2,
          width: "100%",
          marginTop: 4,
          //   height: "100vh",
          border: "2px solid #E0E0E0",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4} lg={3}>
            <Avatar
              alt={employee.name}
              src={employee.avatarUrl}
              sx={{ width: 150, height: 350, margin: "auto" }}
            />
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ mt: "18px" }} />
          <Grid item xs={12} md={7} lg={8} sx={{ textAlign: "center" }}>
            <Typography variant="h4">My Profile</Typography>
            <Typography variant="h5">{employee.name}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Position: {employee.position}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Email: {employee.email}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Date of Birth: {employee.dob}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Address: {employee.addressEmployee}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Gender: {employee.gender}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Date of Joining: {employee.dateOfJoining}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Aadhar Number: {employee.adharNumber}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Age: {employee.employeeAge}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Mobile Number: {employee.mobileNumber}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Alternate Mobile Number: {employee.altmobileNumber}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Resume: {employee.employeeResume}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default EmployeeProfile;
