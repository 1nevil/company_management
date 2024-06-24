import {
  Alert,
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
  Stack,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  stepConnectorClasses,
  styled,
} from "@mui/material"
import { Box } from "@mui/system"
import { Link, json, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getTaskUsingTaskId } from "../../../../Slices/TaskSlice"
import SettingsIcon from "@mui/icons-material/Settings"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import VideoLabelIcon from "@mui/icons-material/VideoLabel"
import EngineeringIcon from "@mui/icons-material/Engineering"
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"
import ComputerIcon from "@mui/icons-material/Computer"
import Check from "@mui/icons-material/Check"
import PropTypes from "prop-types"
import { getPositionsByIds } from "../../../../Slices/PositionSlice"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import VisibilityIcon from "@mui/icons-material/Visibility"

function AdminTaskDeatil() {
  const [chainFlow, setChainFlow] = useState([])
  const [currentPostionIndex, setCurrentPostionIndex] = useState(-1)
  const message = useSelector(
    (state) => state.Tasks.completeTaskDetailForAdmin.message
  )

  const [showMoreChecklist, setShowMoreChecklist] = useState(false)
  const [showMoreGuidelines, setShowMoreGuidelines] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const { error, pending } = useSelector((state) => state.Tasks)

  const {
    taskMaster,
    chainMaster,
    chainDetails,
    positionMaster,
    positionGuidelines,
    checklistMasters,
    history,
  } = useSelector((state) => state.Tasks.completeTaskDetailForAdmin)
  const displayedChecklist = showMoreChecklist
    ? checklistMasters
    : checklistMasters?.slice(0, 2)

  const displayedGuidelines = showMoreGuidelines
    ? positionGuidelines
    : positionGuidelines?.slice(0, 2)

  const { chainPositions } = useSelector((state) => state.Position)
  const dispatch = useDispatch()

  useEffect(() => {
    if (chainDetails) {
      const chainFlow = chainDetails[0]?.chainFlow
      const flowarray = chainFlow?.split(",")
      setChainFlow(flowarray)
      const currentPostion = taskMaster?.currentPostion
      const stringposition = currentPostion?.toString()
      const indexOfPostion = flowarray?.indexOf(stringposition)
      setCurrentPostionIndex(indexOfPostion)
      dispatch(getPositionsByIds(chainFlow))
    }
  }, [chainDetails, taskMaster, dispatch])

  const { taskId } = useParams()
  useEffect(() => {
    dispatch(getTaskUsingTaskId(taskId))
  }, [dispatch, taskId])

  const columns = [
    { field: "empTaskHistoryId", headerName: "TaskHistory Id", width: 90 },
    {
      field: "taskName",
      headerName: "Task Name",
      width: 500,
      editable: true,
    },
    {
      field: "seeDetails",
      headerName: "See Details",
      description: "Task details",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Link
          style={{ color: "gray" }}
          to={`/admin/TaskHistoryDetailForAdmin/${params.row.empTaskHistoryId}`}
        >
          <VisibilityIcon />
        </Link>
      ),
    },
  ]

  const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  }))

  function QontoStepIcon(props) {
    const { active, completed, className } = props

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    )
  }

  QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
  }

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }))

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  }))

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props

    const icons = {
      1: <SettingsIcon />,
      2: <GroupAddIcon />,
      3: <VideoLabelIcon />,
      4: <EngineeringIcon />,
      5: <WorkspacePremiumIcon />,
      6: <EngineeringIcon />,
      7: <ComputerIcon />,
    }

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    )
  }

  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  }

  return (
    <div>
      {error !== null ? (
        <Alert severity="error">{error}</Alert>
      ) : pending ? (
        <Skeleton variant="rectangular" animation="wave" height={200} />
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                p={1}
                pt={0}
                sx={{
                  border: "2px solid gray",
                  borderRadius: "10px",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  mt={3}
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  Check List
                </Typography>
                <FormGroup sx={{ mt: 2 }}>
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
                  {checklistMasters?.length > 3 && (
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

              <Box
                p={2}
                pt={0}
                sx={{
                  border: "2px solid gray",
                  borderRadius: "10px",
                  mb: 3,
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
                        lineHeight: "43px",
                      }}
                    >
                      <Typography
                        variant="body1"
                        gutterBottom
                        textTransform="capitalize"
                        ml={4}
                        sx={{ m: "auto" }}
                      >
                        {guideline.positionGuidline}
                      </Typography>
                    </Box>
                  ))}
                  {positionGuidelines?.length >= 3 && (
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
            <Grid item xs={12} md={1}>
              <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item xs={12} md={7} sx={{ textAlign: "center" }}>
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
                {taskMaster ? (
                  <Card
                    sx={{
                      border: "2px solid gray",
                      boxShadow: "2px 2px 10px black",
                    }}
                  >
                    <CardHeader
                      title={`Task Name: ${taskMaster.taskName}`}
                      subheader={
                        <>
                          {taskMaster.startDate && taskMaster.endDate ? (
                            <>
                              <Typography component="span" variant="body2">
                                Start Date: {taskMaster.startDate}
                              </Typography>
                              <br />
                              <Typography component="span" variant="body2">
                                End Date: {taskMaster.endDate}
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography component="span" variant="body2">
                                Duration: {taskMaster.durationNum}{" "}
                                {taskMaster.durationType}
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
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            Description
                          </Typography>
                          {taskMaster.description}
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
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 4 }} orientation="horizontal" flexItem />
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            Chain For Task
          </Typography>
          <Grid sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}>
            {chainDetails &&
              chainDetails[0]?.chainFlow
                ?.split(",")
                ?.map((c, index) => <h1 key={index}> {c.chainName}</h1>)}
            <Stack sx={{ width: "100%", mt: "30px" }} spacing={4}>
              <Stepper
                alternativeLabel
                activeStep={currentPostionIndex}
                connector={<ColorlibConnector />}
              >
                {chainPositions.map((position) => (
                  <Step key={position.positionName}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {position.positionName}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
          </Grid>
          {history && (
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  p: 4,
                }}
              >
                Task History
              </Typography>
              <DataGrid
                slots={{ toolbar: GridToolbar }}
                rows={history}
                columns={columns}
                getRowId={(row) => row.taskId}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </Box>
          )}
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>All Checklist Items and Guidelines</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="h6">Checklist Items</Typography>
                {checklistMasters?.map((checklist, index) => (
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
                {positionGuidelines?.map((guideline) => (
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

export default AdminTaskDeatil
