import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchEmpById } from "../../Slices/EmployeeSlice"

function EmployeeProfile() {
  const employee = useSelector((state) => state.Employee.employee)
  const { employeeId } = useParams()
  const dispatch = useDispatch()
  const [showMore, setShowMore] = useState(false)
  const [showMore2, setShowMore2] = useState(false)

  const handleShowMore2 = () => {
    setShowMore2(!showMore2)
  }

  useEffect(() => {
    dispatch(fetchEmpById(employeeId))
  }, [dispatch, employeeId])

  const handleShowMore = () => {
    setShowMore(!showMore)
  }

  return (
    <Box maxWidth="lg" sx={{ py: 2 }}>
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#000000",
          backgroundImage: `url('https://www.desktopbackground.org/download/2520x1080/2010/06/02/26959_download-wallpapers-3840x1200-computer-keyboard-mouse-laptop_3840x1200_h.jpg')`,
          backgroundSize: "cover", // Ensure the background image covers the entire area
          backgroundPosition: "center",
          borderRadius: 2,
          p: 3,
          color: "#ffffff",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                position: "absolute",
                textAlign: "center",
              }}
            >
              <img
                src={`http://localhost:5036/Images/${employee?.employee?.employeeImage}`}
                alt="Profile"
                style={{
                  borderRadius: "20%",
                  padding: "3px",
                  background: "linear-gradient(#e66465, #565656)",
                  height: "200px",
                  width: "200px",
                  objectFit: "cover",
                  position: "relative",
                  marginTop: "125px",

                  textAlign: "center",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid
              container
              spacing={2}
              sx={{
                textAlign: "center",
                marginTop: { xs: "230px", md: "80px" },
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "cursive",
                    width: "100%",
                  }}
                  fontSize={{
                    lg: "45px",
                    md: "40px",
                    sm: "35px",
                    xs: "25px",
                  }}
                >
                  {employee?.employee?.employeeName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "cursive",
                    width: "100%",
                  }}
                  fontSize={{
                    lg: "30px",
                    md: "25px",
                    sm: "20px",
                    xs: "20px",
                  }}
                >
                  {employee?.employee?.positionName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3} mt={5}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Employee Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  {employee?.employee?.employeeEmail}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Mo. {employee?.employee?.mobileNumber}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Alt Mo. {employee?.employee?.altmobileNumber}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Bank Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Bank Name:</Typography>
                <Typography variant="body1">
                  {employee?.employee?.bankName}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">Branch Name:</Typography>
                <Typography variant="body1">
                  {employee?.employee?.branchName}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">IFSC:</Typography>
                <Typography variant="body1">
                  {employee?.employee?.ifscCode}
                </Typography>
              </Grid>
              {showMore2 && (
                <>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">
                      Acc Holder Name:
                    </Typography>
                    <Typography variant="body1">
                      {employee?.employee?.accountHolderName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Acc No:</Typography>
                    <Typography variant="body1">
                      {employee?.employee?.accountNo}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">UPI ID:</Typography>
                    <Typography variant="body1">
                      {employee?.employee?.upiId}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowMore2}
              sx={{ mt: 2 }}
            >
              {showMore2 ? "Show Less" : "Read More"}
            </Button>
          </Paper>
        </Grid>
        {employee?.previousClients?.length > 0 && (
          <Grid item xs={12} lg={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: "20px" }}>
              <Typography variant="h6">Previous Clients:</Typography>
              {employee?.previousClients?.map((client, index) => (
                <React.Fragment key={index}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">Client Name:</Typography>
                      <Typography variant="body1">
                        {client.clientName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">Service Name:</Typography>
                      <Typography variant="body1">
                        {client.serviceName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">
                        Client Phone Number:
                      </Typography>
                      <Typography variant="body1">
                        {client.clientPhoneNumber}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ my: 2 }}>
                    <hr />
                  </Box>
                </React.Fragment>
              ))}
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
export default EmployeeProfile
