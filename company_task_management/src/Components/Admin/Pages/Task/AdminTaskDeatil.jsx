import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
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
import { Link, useParams } from "react-router-dom"
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

function AdminTaskDeatil(params) {
  const [chainFlow, setChainFlow] = useState([])
  const [currentPostionIndex, setCurrentPostionIndex] = useState(-1)
  const message = useSelector(
    (state) => state.Tasks.completeTaskDetailForAdmin.message
  )

  const {
    taskMaster,
    chainMaster,
    chainDetails,
    positionMaster,
    positionGuidelines,
    checklistMasters,
    history,
  } = useSelector(
    (state) => state.Tasks.completeTaskDetailForAdmin.responseData || {}
  )

  console.log(
    taskMaster,
    chainMaster,
    chainDetails,
    positionMaster,
    positionGuidelines,
    checklistMasters,
    history
  )

  const { error } = useSelector((state) => state.Tasks)

  //   const { Position: positionId } = useSelector(
  //     (state) => state.Auth.authicatedUser
  //   );

  // useEffect(() => {
  //   if (chainDetails) {
  //     const flow = chainDetails[0]?.chainFlow?.split(",");
  //     setChainFlow(flow);
  //     const currentPostion = taskMaster?.currentPostion;
  //     const indexOfPostion = flow?.indexOf(currentPostion);

  //     setCurrentPostionIndex(indexOfPostion);
  //     console.log("indx" + indexOfPostion);
  //     console.log("current postion" + currentPostion);
  //     console.log("flow" + flow);
  //   }
  // }, [chainDetails, chainMaster, currentPostionIndex, taskMaster]);

  const { chainPositions } = useSelector((state) => state.Position)
  const dispatch = useDispatch()
  useEffect(() => {
    if (chainDetails) {
      const chainFlow = chainDetails[0]?.chainFlow
      const flowarray = chainFlow.split(",")
      setChainFlow(flowarray)
      const currentPostion = taskMaster?.currentPostion
      const stringposition = currentPostion.toString()
      console.log(stringposition)
      const indexOfPostion = flowarray?.indexOf(stringposition)
      setCurrentPostionIndex(indexOfPostion)
      // setCurrentPostionIndex(indexOfPostion);
      // const flow = chainDetails[0]?.chainFlow?.split(",");
      // setChainFlow(flow);
      // console.log("chainDetails:", chainDetails[0].chainFlow);
      // console.log("indx" + indexOfPostion);
      // console.log("current postion" + currentPostion);
      // console.log("flow" + flow);
      dispatch(getPositionsByIds(chainFlow))
    }
  }, [chainDetails, taskMaster, dispatch])

  const { taskId } = useParams()
  // console.log(chainDetails[0]?.chainFlow?.split(","));
  // console.log(
  //   chainDetails[0]?.chainFlow?.split(",")?.indexOf(taskMaster?.currentPostion)
  // );
  // console.log(taskMaster.currentPostion);
  useEffect(() => {
    //1 is postion id for validation
    //task ID : for getting task
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
          to={`/employee/TaskDetail/${params.row.taskId}`}
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
      {JSON.stringify(taskMaster)}
      {JSON.stringify(chainMaster)}
      {JSON.stringify(chainDetails)}
      {JSON.stringify(positionMaster)}
      {JSON.stringify(positionGuidelines)}
      {JSON.stringify(checklistMasters)}

      <Grid container>
        <Grid item xs={4}>
          <Typography variant="h5" mt={5} ml={8} sx={{ fontWeight: "bold" }}>
            TaskList
          </Typography>
          <Box p={4} pt={0}>
            {checklistMasters?.map((checklist) => (
              <Box
                key={checklist.checklistId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4",
                }}
              >
                <input
                  type="checkbox"
                  id="demoCheckbox"
                  name="checkbox"
                  value="1"
                  checked={checklist.status === "complete" ? true : false} // Use ternary operator to conditionally set checked attribute
                  readOnly
                />
                <Typography
                  variant="h5"
                  gutterBottom
                  textTransform="capitalize"
                  ml={3}
                >
                  {checklist.taskMessage}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box p={4} pt={0}>
            <Typography variant="h5" mt={5} sx={{ fontWeight: "bold" }}>
              position Guidelines
            </Typography>
            {positionGuidelines?.map((guideline) => (
              <Box
                key={guideline.positionGuidelineId}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  textTransform="capitalize"
                  ml={3}
                >
                  {guideline.positionGuidline}
                </Typography>
              </Box>
            ))}
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
              {taskMaster ? (
                <>
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
                          <Typography component="span" variant="body2">
                            Start Date: {taskMaster.startDate}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            End Date: {taskMaster.endDate}
                          </Typography>
                        </>
                      }
                    />
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Instructions: {taskMaster.instructions}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Description: {taskMaster.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </>
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
        <Divider orientation="vertical" flexItem />
      </Grid>
      <Grid sx={{ "& .MuiTextField-root": { m: 1, width: "100vw" } }}>
        {chainDetails &&
          chainDetails[0]?.chainFlow
            ?.split(",")
            ?.map((c, index) => <h1 key={index}> {c.chainName}</h1>)}
        <Stack sx={{ width: "90%", mt: "30px" }} spacing={4}>
          {/* <Stepper
              alternativeLabel
              activeStep={chainDetails?.length}
              connector={<ColorlibConnector />}
            >
              {chainFlow?.map((chain) => (
                <Step key={chain}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    {chain.chainName}
                  </StepLabel>
                </Step>
              ))}
            </Stepper> */}
          <Stepper
            alternativeLabel
            activeStep={currentPostionIndex}
            connector={<ColorlibConnector />}
          >
            {chainPositions.map((position) => (
              <Step key={position}>
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
    </div>
  )
}
export default AdminTaskDeatil
