/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material"
import { Dialog, DialogTitle, DialogContent } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import CheckIcon from "@mui/icons-material/Check"
import { Box, Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
// import { approveDisapproveTask } from "../../Slices/TaskSlice"
import {
  getTaskAssignDataForChecker,
  updateTaskWithCompeletedate,
  approveDisapprove,
} from "../../Slices/AssignToTask"

function CheckerTaskDetails(params) {
  const { task, guidelines, empTaskAssignment, emp } = useSelector(
    (state) => state.AssignToTask.taskGuidlinesChecker
  )

  const { id: employeeId } = useSelector((state) => state.Auth.authicatedUser)
  // console.table(user)
  const { taskId } = useParams()
  const [open, setOpen] = useState(false)
  const [completedGuidelines, setCompletedGuidelines] = useState([])
  const [incompleteGuidelines, setIncompleteGuidelines] = useState([])
  const [fileUpload, setFileUpload] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  // const empID = 6;
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTaskAssignDataForChecker(taskId))
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
      // empID,
      completedAt,
      fileUpload,
      isActive: "2",
    }
    dispatch(updateTaskWithCompeletedate(updatedAssign))
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

  /* public int TaskAssId { get; set; }
 public int CheckerId { get; set; }
 public bool IsApprove { get; set; }
 public string? Message { get; set; } */

  const handleApprove = () => {
    // Access the taskId from the row data
    // Dispatch your action with the taskId
    dispatch(
      approveDisapprove({
        TaskAssId: taskId,

        CheckerId: employeeId,
        IsApprove: true,
      })
    )
    navigate("CheckTaskList")
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

  const handleSubmitModel = () => {
    alert("Disapprove")
    dispatch(
      approveDisapprove({
        TaskAssId: taskId,
        CheckerId: employeeId,
        IsApprove: false,
        Message: message,
      })
    )
    setOpen(false)
    navigate("CheckTaskList")
  }

  const handleSubmitClose = () => {
    setOpen(false)
  }

  const handleSubmitOpen = () => {
    setOpen(true)
  }

  return (
    <div>
      <Box>
        <OpenModel
          open={open}
          setOpen={setOpen}
          handleSubmitModel={handleSubmitModel}
          handleSubmitClose={handleSubmitClose}
          message={message}
          setMessage={setMessage}
        ></OpenModel>
      </Box>
      <Grid container>
        <Grid item xs={4}>
          <Box mt={5} p={4}>
            {guidelines ? (
              guidelines.map((guideline) => (
                <Box
                  key={guideline.positionGuidelineId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4",
                  }}
                >
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    checked={completedGuidelines.includes(
                      guideline.positionGuidelineId
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(
                        guideline.positionGuidelineId,
                        e.target.checked
                      )
                    }
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    textTransform="capitalize"
                    ml={3}
                  >
                    {guideline.positionGuidline}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="h5" gutterBottom>
                No Guideline Available
              </Typography>
            )}
            {guidelines && (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  textTransform="capitalize"
                  ml={3}
                >
                  completed guideline
                </Typography>
                {completedGuidelines.map((guidelineId) => (
                  <Typography key={guidelineId}>{guidelineId}</Typography>
                ))}
              </>
            )}
          </Box>
        </Grid>

        <Divider orientation="vertical" flexItem />
        <Grid item xs={7} sx={{ textAlign: "center", margin: "auto" }}>
          <Grid xs={12}>
            <Typography variant="h5">Task Detail</Typography>
            <Box
              mt={5}
              p={4}
              sx={{
                border: "2px solid gray",
                boxShadow: "2px 2px 10px 1px black",
              }}
            >
              {task ? (
                <>
                  <Card
                    sx={{
                      border: "2px solid gray",
                      boxShadow: "2px 2px 10px black",
                    }}
                  >
                    <CardHeader
                      title={`Task Name: ${task.taskName}`}
                      subheader={
                        <>
                          <Typography component="span" variant="body2">
                            Start Date: {task.startDate}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            End Date: {task.endDate}
                          </Typography>
                        </>
                      }
                    />
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Instructions: {task.instructions}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Description: {task.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </>
              ) : (
                <Typography variant="h5" gutterBottom>
                  Loading...
                  <Skeleton animation="wave" />
                </Typography>
              )}
            </Box>
            {/* <Box p={2}>
              <TextField
                type="file"
                fullWidth
                name="employeeAdharImage"
                // value={employeeData.employeeResume}
                onChange={(e) => setFileUpload(e.target.value)}
                // onBlur={handleBlur}
              />
              <VisuallyHiddenInput id="employee-adhar-file" type="file" />
              <InputLabel htmlFor="employee-adhar-file">
                Upload Your File
              </InputLabel>
            </Box> */}

            {/* {JSON.stringify(emp)}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {JSON.stringify(empTaskAssignment)}
            <br />
            {JSON.stringify(empTaskAssignment?.taskName)}
            <br />
            {JSON.stringify(empTaskAssignment?.fileUpload)} */}
            <Box
              p={2}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                startIcon={<CheckIcon />}
                onClick={handleApprove}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<ClearIcon />}
                onClick={handleSubmitOpen}
              >
                Not Approved
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default CheckerTaskDetails

const OpenModel = ({
  open,
  handleSubmitModel,
  handleSubmitClose,
  message,
  setMessage,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": { m: 5, width: 1000, height: 1000 },
      }}
    >
      <Dialog open={open}>
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: 2 }}
            size="small"
            label="Enter the message"
            name="message"
            multiline
            fullWidth
            rows={6}
            required
            onChange={(e) => setMessage(e.target.value)}
          />
          <Box sx={{ display: "flex", mt: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={handleSubmitModel}
              color="primary"
              sx={{ width: "300px" }}
            >
              Submit
            </Button>
          </Box>
          <Box sx={{ display: "flex", mt: 2, justifyContent: "right" }}>
            <Button onClick={handleSubmitClose}>Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
