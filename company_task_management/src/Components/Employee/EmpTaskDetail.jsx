import React, { useEffect, useState } from "react"
import {
  Alert,
  Box,
  Button,
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
  Skeleton,
  Typography,
} from "@mui/material"
import DownloadingIcon from "@mui/icons-material/Downloading"
import { useDispatch, useSelector } from "react-redux"
import { json, useParams } from "react-router-dom"
import { getTaskUsingTaskIdAndPostionId } from "../../Slices/TaskSlice"
import { getFileFromHistoryToSendNextEmployee } from "../../Slices/AssignToTask"
import PropTypes from "prop-types"
import LinearProgress from "@mui/material/LinearProgress"
import axios from "axios"

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
  const { pending, getActiveTaskDetail, error } = useSelector(
    (state) => state.Tasks
  )

  const { lastFileDetailHistory } = useSelector((state) => state.AssignToTask)
  console.log(
    "🚀 ~ EmpTaskDetail ~ lastFileDetailHistory:",
    lastFileDetailHistory
  )

  const { checklistMasters } = useSelector(
    (state) => state.Tasks.completeTaskDetailForAdmin.responseData || {}
  )
  const { task, guidelines, checklist } = getActiveTaskDetail

  const { Position: positionId } = useSelector(
    (state) => state.Auth.authicatedUser
  )

  const { taskId } = useParams()
  const dispatch = useDispatch()

  const [showMoreChecklist, setShowMoreChecklist] = useState(false)
  const [showMoreGuidelines, setShowMoreGuidelines] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    dispatch(getTaskUsingTaskIdAndPostionId({ positionId, taskId }))
    dispatch(getFileFromHistoryToSendNextEmployee(taskId))
  }, [dispatch, positionId, taskId])

  console.log("🚀 ~ useEffect ~ taskId:", taskId)
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const displayedChecklist = showMoreChecklist
    ? checklist
    : checklist?.slice(0, 3)

  const displayedGuidelines = showMoreGuidelines
    ? guidelines
    : guidelines?.slice(0, 3)

  const downloadFile = async (url) => {
    try {
      const response = await axios.get(url, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setProgress(progress) // Assuming setProgress is a state update function
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

  return (
    <div>
      {error !== null ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box
                p={2}
                pt={0}
                sx={{ border: "2px solid gray", borderRadius: "10px" }}
                pl={5}
              >
                <Typography variant="h5" sx={{ textAlign: "center", p: 1 }}>
                  Checklist
                </Typography>
                {displayedChecklist?.map((checklist) => (
                  <>
                    <Box
                      key={checklist.checklistId}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
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
                  </>
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
                sx={{ border: "2px solid gray", borderRadius: "10px", mt: 3 }}
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
            <Divider
              orientation="vertical"
              sx={{
                padding: "10px",
                display: { lg: "block", md: "block", xs: "none" },
              }}
              flexItem
            />
            <Grid item xs={12} md={7}>
              <Grid xs={12}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
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
                  {task ? (
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
                          <Typography variant="body2" color="text.secondary">
                            <Typography
                              sx={{ variant: "p", fontWeight: "bold" }}
                            >
                              Description
                            </Typography>{" "}
                            {task.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ) : (
                    <Typography variant="h5" gutterBottom>
                      Loading... <Skeleton animation="wave" />
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Box mt={2} mb={2} p={1}>
                {progress > 0 && <LinearProgressWithLabel value={progress} />}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1rem",
                  gap: 2,
                }}
              >
                {lastFileDetailHistory && (
                  <Box sx={{ width: "50%" }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<DownloadingIcon />}
                      onClick={() => {
                        let url = lastFileDetailHistory?.fileUpload
                        downloadFile(url)
                      }}
                    >
                      File
                    </Button>
                  </Box>
                )}
                <Box sx={{ width: lastFileDetailHistory ? "50%" : "100%" }}>
                  <Button fullWidth variant="contained">
                    Take the Task
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>All Checklist Items and Guidelines</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="h6">Checklist Items</Typography>
                {checklist?.map((checklist) => (
                  <Typography
                    key={checklist.checklistId}
                    variant="body1"
                    gutterBottom
                  >
                    {checklist.taskMessage}
                  </Typography>
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

export default EmpTaskDetail
