import React, { useEffect, useState } from "react"
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
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

  return (
    <div>
      {error !== null ? (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box
                p={2}
                pt={0}
                sx={{ border: "2px solid gray", borderRadius: "10px" }}
              >
                <Typography variant="h5" sx={{ textAlign: "center", p: 1 }}>
                  Checklist
                </Typography>
                {displayedChecklist?.map((checklist) => (
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
                    >
                      File <b>{lastFileDetailHistory?.fileUpload}</b>
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
