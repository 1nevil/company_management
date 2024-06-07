import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormGroup,
  Grid,
  InputLabel,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getTaskUsingTaskIdAndPostionId } from "../../Slices/TaskSlice"
import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import { getHistoryOfTaskDetailsByIdforChecker } from "../../Slices/AssignToTask"

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

function CheckerTaskIsActiveDeatils() {
  const { pending, error } = useSelector((state) => state.AssignToTask)
  const {
    messages,
    employee,
    taskDetails,
    guidelines,
    checklist,
    empTaskHistory,
  } = useSelector((state) => state.AssignToTask.getHistoryDetail)

  const navigate = useNavigate()
  const { id: checkerId } = useSelector((state) => state.Auth.authicatedUser)

  const [completedGuidelines, setCompletedGuidelines] = useState([])
  const [incompleteGuidelines, setIncompleteGuidelines] = useState([])
  const [fileUpload, setFileUpload] = useState("")
  const { taskId } = useParams()
  const [showMoreChecklist, setShowMoreChecklist] = useState(false)
  const [showMoreGuidelines, setShowMoreGuidelines] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch()
  const { id: empId } = useSelector((state) => state.Auth.authicatedUser)

  const displayedChecklist = showMoreChecklist
    ? checklist
    : checklist?.slice(0, 3)

  const displayedGuidelines = showMoreGuidelines
    ? guidelines
    : guidelines?.slice(0, 3)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    //1 is postion id for validation
    //task ID : for getting task
    dispatch(getHistoryOfTaskDetailsByIdforChecker(taskId))
  }, [dispatch, taskId])

  useEffect(() => {
    const storedCompletedGuidelines =
      JSON.parse(localStorage.getItem(`completedGuidelines_${taskId}`)) || []
    const storedIncompleteGuidelines =
      JSON.parse(localStorage.getItem(`incompleteGuidelines_${taskId}`)) || []
    setCompletedGuidelines(storedCompletedGuidelines)
    setIncompleteGuidelines(storedIncompleteGuidelines)
  }, [taskId])

  const handleUploadWork = () => {
    var currentDate = new Date()

    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()

    day = day < 10 ? "0" + day : day
    month = month < 10 ? "0" + month : month

    var completedAt = day + "/" + month + "/" + year
    const updatedAssign = {
      taskId: Number(taskId),
      empId,
      completedAt,
      fileUpload,
      isActive: "2",
    }
    console.log("🚀 ~ handleUploadWork ~ updatedAssign:", updatedAssign)

    // dispatch(updateTaskWithCompeletedate(updatedAssign));
    navigate("/employee/EmployeeDashboard")
  }

  const handleCheckboxChange = (guidelineId, isChecked) => {
    if (isChecked) {
      // Move the guideline to completed list
      setCompletedGuidelines([...completedGuidelines, guidelineId])
      setIncompleteGuidelines(
        incompleteGuidelines.filter((id) => id !== guidelineId)
      )
    } else {
      // Move the guideline to incomplete list
      setIncompleteGuidelines([...incompleteGuidelines, guidelineId])
      setCompletedGuidelines(
        completedGuidelines.filter((id) => id !== guidelineId)
      )
    }
  }

  useEffect(() => {
    localStorage.setItem(
      `completedGuidelines_${taskId}`,
      JSON.stringify(completedGuidelines)
    )
    localStorage.setItem(
      `incompleteGuidelines_${taskId}`,
      JSON.stringify(incompleteGuidelines)
    )
  }, [completedGuidelines, incompleteGuidelines, taskId])

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
      <Grid container>
        <Grid item xs={4}>
          {/* Checklist */}
          <Box
            p={2}
            pt={0}
            sx={{ border: "2px solid gray", borderRadius: "10px", mr: "50px" }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", p: 1 }}>
              Checklist
            </Typography>
            {pending ? (
              <Skeleton animation="wave" variant="rectangular" height={200} />
            ) : (
              <>
                {displayedChecklist?.length > 0 ? (
                  displayedChecklist?.map((checklist) => (
                    <Box
                      key={checklist.checklistId}
                      sx={{ display: "flex", alignItems: "center", gap: "4" }}
                    >
                      <Typography
                        variant="p"
                        gutterBottom
                        textTransform="capitalize"
                        ml={3}
                      >
                        {checklist.taskMessage}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" textAlign="center" color="error">
                    No position Found !!
                  </Typography>
                )}
                {checklist?.length > 3 && (
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: "pointer", textAlign: "end" }}
                    onClick={handleOpenModal}
                  >
                    See More
                  </Typography>
                )}
              </>
            )}
          </Box>
          {/* Position Guidelines */}
          <Box
            p={2}
            pt={0}
            sx={{
              border: "2px solid gray",
              borderRadius: "10px",
              mr: "50px",
              mt: 3,
            }}
          >
            <Typography
              variant="h6"
              mt={3}
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Position Guidelines
            </Typography>
            {pending ? (
              <Skeleton animation="wave" variant="rectangular" height={200} />
            ) : (
              <FormGroup sx={{ mt: 2 }}>
                {displayedGuidelines?.map((guideline) => (
                  <Box
                    key={guideline.positionGuidelineId}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4",
                      lineHeight: "43px",
                    }}
                  >
                    <Typography
                      variant="p"
                      gutterBottom
                      textTransform="capitalize"
                      ml={4}
                      sx={{ m: "auto" }}
                    >
                      {guideline.positionGuidline}
                    </Typography>
                  </Box>
                ))}
                {guidelines?.length > 3 && (
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: "pointer", textAlign: "end" }}
                    onClick={handleOpenModal}
                  >
                    See More
                  </Typography>
                )}
              </FormGroup>
            )}
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={7} sx={{ textAlign: "center", margin: "auto", ml: 10 }}>
          {/* Task Detail */}
          <Grid xs={12}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Task Detail
            </Typography>
            <Box
              mt={5}
              p={4}
              sx={{
                border: "2px solid gray",
                boxShadow: "2px 2px 10px 1px black",
              }}
            >
              {pending ? (
                <Skeleton animation="wave" />
              ) : (
                <>
                  {taskDetails ? (
                    <Card
                      sx={{
                        border: "2px solid gray",
                        boxShadow: "2px 2px 10px black",
                      }}
                    >
                      <CardHeader
                        title={`Task Name: ${taskDetails.taskName}`}
                        subheader={
                          <>
                            {taskDetails.startDate && taskDetails.endDate ? (
                              <>
                                <Typography component="span" variant="body2">
                                  Start Date: {taskDetails.startDate}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2">
                                  End Date: {taskDetails.endDate}
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography component="span" variant="body2">
                                  Duration: {taskDetails.durationNum}{" "}
                                  {taskDetails.durationType}
                                </Typography>
                              </>
                            )}
                          </>
                        }
                      />
                      <CardActionArea>
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            <Typography
                              sx={{ variant: "p", fontWeight: "bold" }}
                            >
                              Description
                            </Typography>{" "}
                            {taskDetails.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ) : error ? (
                    <Typography variant="h5" gutterBottom>
                      {error}
                    </Typography>
                  ) : (
                    <Typography variant="h5" gutterBottom>
                      Loading...
                      <Skeleton animation="wave" />
                    </Typography>
                  )}
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>All Checklist Items and Guidelines</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6">Checklist Items</Typography>
            {checklist?.length > 0 ? (
              checklist?.map((checklist) => (
                <Typography
                  key={checklist.checklistId}
                  variant="body1"
                  gutterBottom
                >
                  {checklist.taskMessage}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" textAlign="center" color="error">
                No position Found !!
              </Typography>
            )}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Position Guidelines
            </Typography>
            {guidelines?.map((guideline) => (
              <Typography
                key={guideline.positionGuidelineId}
                variant="body1"
                gutterBottom
              >
                {guideline.positionGuidline}
              </Typography>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Checked By */}
      <Box mt={5}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Completed By
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
  )
}
export default CheckerTaskIsActiveDeatils
