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
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getHistoryDetails } from "../../Slices/TaskSlice"
import { getFileFromHistoryToSendNextEmployee } from "../../Slices/AssignToTask"

function EmpTaskDetail() {
  const { pending, error } = useSelector((state) => state.Tasks)
  const { lastFileDetailHistory } = useSelector((state) => state.AssignToTask)
  console.log(
    "🚀 ~ EmpTaskDetail ~ lastFileDetailHistory:",
    lastFileDetailHistory
  )

  const {
    messages,
    checker,
    taskDetails,
    guidelines,
    checklist,
    empTaskHistory,
  } = useSelector((state) => state.Tasks.getHistoryDetail)
  console.log("🚀 ~ EmpTaskDetail ~ taskDetails:", taskDetails)

  const { taskHistoryId } = useParams()
  const dispatch = useDispatch()

  const [showMoreChecklist, setShowMoreChecklist] = useState(false)
  const [showMoreGuidelines, setShowMoreGuidelines] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    dispatch(getHistoryDetails(taskHistoryId))
    // dispatch(getFileFromHistoryToSendNextEmployee(taskDetails))
  }, [dispatch, taskHistoryId])

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
        <Alert severity="error">{error}</Alert>
      ) : (
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                p={2}
                pt={0}
                sx={{ border: "2px solid gray", borderRadius: "10px" }}
              >
                <Typography variant="h5" sx={{ textAlign: "center", p: 1 }}>
                  Checklist
                </Typography>
                {pending ? (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={200}
                  />
                ) : (
                  <>
                    {displayedChecklist?.length > 0 ? (
                      displayedChecklist?.map((checklist) => (
                        <Box
                          key={checklist.checklistId}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4",
                          }}
                        >
                          <Typography
                            variant="body2"
                            gutterBottom
                            textTransform="capitalize"
                            ml={3}
                          >
                            {checklist.taskMessage}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        textAlign="center"
                        color="error"
                      >
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
                {pending ? (
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={200}
                  />
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
                          variant="body2"
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
            <Divider
              orientation="vertical"
              sx={{
                padding: "10px",
                display: { lg: "block", md: "block", xs: "none" },
              }}
              flexItem
            />
            <Grid item xs={12} md={7}>
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
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
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
        </div>
      )}
    </div>
  )
}

export default EmpTaskDetail
