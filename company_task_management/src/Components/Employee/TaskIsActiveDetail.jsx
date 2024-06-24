/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
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
import { updateTaskWithCompletedDate } from "../../Slices/AssignToTask"
import Modal from "@mui/material/Modal"

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

function TaskIsActiveDeatils() {
  const { pending, getActiveTaskDetail, error } = useSelector(
    (state) => state.Tasks
  )

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { task, guidelines, checklist } = getActiveTaskDetail

  const [completedGuidelines, setCompletedGuidelines] = useState([])
  const [incompleteGuidelines, setIncompleteGuidelines] = useState([])
  const { taskId } = useParams()
  const [showMoreChecklist, setShowMoreChecklist] = useState(false)
  const [showMoreGuidelines, setShowMoreGuidelines] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  console.log("🚀 ~ TaskIsActiveDeatils ~ error:", error)

  const dispatch = useDispatch()
  const { id: empId, Position: positionId } = useSelector(
    (state) => state.Auth.authicatedUser
  )

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
    dispatch(getTaskUsingTaskIdAndPostionId({ positionId, taskId }))
  }, [dispatch, taskId, positionId])

  useEffect(() => {
    const storedCompletedGuidelines =
      JSON.parse(localStorage.getItem(`completedGuidelines_${taskId}`)) || []
    const storedIncompleteGuidelines =
      JSON.parse(localStorage.getItem(`incompleteGuidelines_${taskId}`)) || []
    setCompletedGuidelines(storedCompletedGuidelines)
    setIncompleteGuidelines(storedIncompleteGuidelines)
  }, [taskId])

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
      {error !== null ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Grid container>
            <Grid item xs={4}>
              <Box
                p={2}
                pt={0}
                sx={{
                  border: "2px solid gray",
                  borderRadius: "10px",
                  mr: "50px",
                }}
              >
                <Typography variant="h5" sx={{ textAlign: "center", p: 1 }}>
                  Checklist
                </Typography>
                {displayedChecklist?.map((checklist) => (
                  <Box
                    key={checklist.checklistId}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: "43px",
                      mb: 1,
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={
                            checklist?.status === "1" ? true : false
                          }
                          disabled
                          sx={{
                            color: "rgba(0, 0, 0, 0.87) !important", // Keep the checkbox looking enabled when disabled
                            "&.Mui-disabled": {
                              color: "rgba(0, 0, 0, 0.87)",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            color: checklist?.Status
                              ? "rgba(0, 0, 0, 0.87)"
                              : "text.secondary", // Darkish gray if checked, default gray if not
                          }}
                        >
                          {checklist.taskMessage}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
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
              </Box>
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
                              {task.startDate && task.endDate ? (
                                <>
                                  <Typography component="span" variant="body2">
                                    Start Date: {task.startDate}
                                  </Typography>
                                  <br />
                                  <Typography component="span" variant="body2">
                                    End Date: {task.endDate}
                                  </Typography>
                                </>
                              ) : (
                                <>
                                  <Typography component="span" variant="body2">
                                    Duration: {task.durationNum}{" "}
                                    {task.durationType}
                                  </Typography>
                                </>
                              )}
                            </>
                          }
                        />
                        <CardActionArea>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
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
                
                </Box> */}
                <UploadFileTaskDetails
                  taskId={taskId}
                  empId={empId}
                  open={open}
                  handleClose={handleClose}
                />
                <Box p={2}>
                  <Button
                    // onClick={handleUploadWork}
                    onClick={handleOpen}
                    fullWidth
                    variant="contained"
                  >
                    Upload Your Work
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>All Checklist Items and Guidelines</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="h6">Checklist Items</Typography>
                {checklist?.map((checklist, index) => (
                  <>
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          defaultChecked={
                            checklist?.status === "0" ? false : true
                          }
                          disabled
                          sx={{
                            color: "rgba(0, 0, 0, 0.87) !important", // Keep the checkbox looking enabled when disabled
                            "&.Mui-disabled": {
                              color: "rgba(0, 0, 0, 0.87)",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            color: checklist?.Status
                              ? "rgba(0, 0, 0, 0.87)"
                              : "text.secondary", // Darkish gray if checked, default gray if not
                          }}
                        >
                          {checklist.taskMessage}
                        </Typography>
                      }
                    />
                    <br />
                  </>
                ))}
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
        </>
      )}
    </div>
  )
}
export default TaskIsActiveDeatils

const UploadFileTaskDetails = ({ taskId, empId, open, handleClose }) => {
  const [rate, setRate] = useState()
  const [quantity, setQuantity] = useState()
  const [quantityName, setQuantityName] = useState()
  const [FileUpload, setFileUpload] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  const handleSubmitWork = () => {
    var currentDate = new Date()

    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()

    day = day < 10 ? "0" + day : day
    month = month < 10 ? "0" + month : month

    var completedAt = day + "/" + month + "/" + year
    const updatedAssign = {
      taskId: Number(taskId),
      empId: Number(empId),
      completedAt,
      isActive: "2",
      rate: Number(rate),
      quantity: Number(quantity),
      quantityName,
      fileUpload: FileUpload,
    }

    console.log(updatedAssign)
    dispatch(updateTaskWithCompletedDate(updatedAssign))
    navigate("/employee/EmployeeDashboard")
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload Your Work With Naccessary Details
          </Typography>
          <Box>
            <Box mt={1}>
              <TextField
                fullWidth
                type="number"
                label="Enter Rate"
                name="rate"
                value={rate}
                required
                onChange={(e) => setRate(e.target.value)}
                // onBlur={handleBlur}
              />
            </Box>
            <Box mt={1}>
              <TextField
                fullWidth
                type="number"
                label="Enter Quantity"
                name="quantity"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                // onBlur={handleBlur}
              />
            </Box>
            <Box mt={1}>
              <TextField
                fullWidth
                label="Enter Quantity Name"
                name="quantityName"
                required
                value={quantityName}
                onChange={(e) => setQuantityName(e.target.value)}
                // onBlur={handleBlur}
              />
            </Box>
            <Box mt={1}>
              <TextField
                type="file"
                fullWidth
                required
                name="FileUpload"
                onChange={(e) => setFileUpload(e.target.value)}
              />
              <VisuallyHiddenInput id="employee-adhar-file" type="file" />
              <InputLabel htmlFor="employee-adhar-file">
                Upload Your File
              </InputLabel>
            </Box>
            <Box mt={1}>
              <Button variant="contained" onClick={handleSubmitWork} fullWidth>
                Upload Your Work
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
