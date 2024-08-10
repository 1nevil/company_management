import React, { useEffect, useState } from "react"
import { Alert, Box, Button, Grid, Skeleton, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getHistoryDetails } from "../../../../Slices/TaskSlice"
import DownloadingIcon from "@mui/icons-material/Downloading"
import axios from "axios"
import PropTypes from "prop-types"
import LinearProgress from "@mui/material/LinearProgress"

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
}

function EmpTaskDetail() {
  const { pending, error } = useSelector((state) => state.Tasks)

  const { messages, checker, empTaskHistory, employee } = useSelector(
    (state) => state.Tasks.getHistoryDetail
  )
  const [downloadProgress, setDownloadProgress] = useState(0)
  const { taskId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHistoryDetails(taskId))
  }, [dispatch, taskId])

  const downloadFile = async (url) => {
    try {
      const response = await axios.get(url, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setDownloadProgress(progress) // Assuming setProgress is a state update function
        },
      })

      const blob = new Blob([response.data])
      const fileName = url.split("/").pop()

      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = fileName
      link.click()

      // Clean up
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error("Error downloading the file", error)
    }
  }
  console.log()

  return (
    <div>
      <Box mb={2}>
        {pending ? (
          <Skeleton animation="wave" variant="rectangular" height={50} />
        ) : (
          <>
            {empTaskHistory?.isApprove === "0" ? (
              <Alert severity="error">
                {messages.map((message, index) => (
                  <Typography key={index} variant="body2">
                    {message}
                  </Typography>
                ))}
              </Alert>
            ) : (
              <Alert severity="success">Approved</Alert>
            )}
          </>
        )}
      </Box>
      {downloadProgress > 0 && (
        <Box mt={3} p={1}>
          <LinearProgressWithLabel value={downloadProgress} />
        </Box>
      )}
      <Box sx={{ p: 1 }}>
        <Button
          fullWidth
          startIcon={<DownloadingIcon />}
          variant="outlined"
          onClick={() => {
            let url = empTaskHistory?.fileUpload
            downloadFile(url)
          }}
        >
          Download File
        </Button>
      </Box>
      {/* Checked By */}
      <Box mt={5}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Checked By Checker
        </Typography>
        <Box
          mt={2}
          p={3}
          sx={{
            border: "2px solid gray",
            borderRadius: "10px",
            boxShadow: "2px 2px 10px 1px black",
          }}
        >
          {pending ? (
            <Skeleton animation="wave" />
          ) : (
            <>
              {checker ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={9}>
                    <Typography variant="body1">
                      <strong>Employee ID:</strong> {checker.employeeId}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Name:</strong> {checker.employeeName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Email:</strong> {checker.employeeEmail}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Age:</strong> {checker.employeeAge}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Mobile Number:</strong> {checker.mobileNumber}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Alternate Mobile Number:</strong>{" "}
                      {checker.altmobileNumber}
                    </Typography>
                    <Typography variant="body1">
                      <strong>DOB:</strong> {checker.dob}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Address:</strong> {checker.addressEmployee}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box>
                      <img
                        width={"70%"}
                        style={{
                          borderRadius: "10%",
                          objectFit: "cover",
                          padding: "6px",
                          background: "linear-gradient(#e66465, #565656)",
                          height: "200px",
                          width: "200px",
                          display: "block",
                          margin: "0 auto",
                        }}
                        alt="profile"
                        src={`http://localhost:5036/Images/${checker?.employeeImage}`}
                      />
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="h5" gutterBottom>
                  {error}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
      <Box mt={5}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Completed By Employee
        </Typography>
        <Box
          mt={2}
          p={4}
          sx={{
            border: "2px solid gray",
            borderRadius: "10px",
            boxShadow: "2px 2px 10px 1px black",
          }}
        >
          {pending ? (
            <Skeleton animation="wave" />
          ) : (
            <>
              {employee ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={9}>
                    <Typography variant="body1">
                      <strong>Employee ID:</strong> {employee.employeeId}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Name:</strong> {employee.employeeName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Email:</strong> {employee.employeeEmail}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Employee Age:</strong> {employee.employeeAge}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Mobile Number:</strong> {employee.mobileNumber}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Alternate Mobile Number:</strong>{" "}
                      {employee.altmobileNumber}
                    </Typography>
                    <Typography variant="body1">
                      <strong>DOB:</strong> {employee.dob}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Address:</strong> {employee.addressEmployee}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box>
                      <img
                        width={"70%"}
                        style={{
                          borderRadius: "10%",
                          objectFit: "cover",
                          padding: "6px",
                          background: "linear-gradient(#e66465, #565656)",
                          height: "200px",
                          width: "200px",
                          display: "block",
                          margin: "0 auto",
                        }}
                        alt="profile"
                        src={`http://localhost:5036/Images/${employee?.employeeImage}`}
                      />
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="h5" gutterBottom>
                  {error}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default EmpTaskDetail
