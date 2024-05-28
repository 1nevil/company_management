import React, { useEffect } from "react";
import { Alert, Box, Button, Skeleton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getHistoryDetails } from "../../../../Slices/TaskSlice";
import DownloadIcon from "@mui/icons-material/Download";

function EmpTaskDetail() {
  const { pending, error } = useSelector((state) => state.Tasks);

  const { messages, checker, empTaskHistory, employee } = useSelector(
    (state) => state.Tasks.getHistoryDetail
  );

  console.log();

  const { taskId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistoryDetails(taskId));
  }, [dispatch, taskId]);

  return (
    <div>
      <Box mb={2}>
        {pending ? (
          <Skeleton animation="wave" variant="rectangular" height={50} />
        ) : (
          <>
            {empTaskHistory?.isApprove === "0" ? (
              <Alert variant="filled" severity="error">
                {messages.map((message, index) => (
                  <Typography key={index} variant="body2">
                    {message}
                  </Typography>
                ))}
              </Alert>
            ) : (
              <Alert variant="filled" severity="success">
                Approved
              </Alert>
            )}
          </>
        )}
      </Box>
      <Box sx={{ p: 1 }}>
        <Button fullWidth variant="contained" startIcon={<DownloadIcon />}>
          Download File
        </Button>
        {JSON.stringify(empTaskHistory?.fileUpload)}
      </Box>
      {/* Checked By */}
      <Box mt={5}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Checked By Checker
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
              {checker ? (
                <>
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
                </>
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
                <>
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
                </>
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
  );
}

export default EmpTaskDetail;
