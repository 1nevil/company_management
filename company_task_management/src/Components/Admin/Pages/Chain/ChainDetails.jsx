import { Form, Link, useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { styled } from "@mui/material/styles"
import Stack from "@mui/material/Stack"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Check from "@mui/icons-material/Check"
import SettingsIcon from "@mui/icons-material/Settings"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import VideoLabelIcon from "@mui/icons-material/VideoLabel"
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector"
import { Grid } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getChainDetailsByChainId } from "../../../../Slices/ChainDetailsSlice"
import { getPositionsByIds } from "../../../../Slices/PositionSlice"
import EngineeringIcon from "@mui/icons-material/Engineering"
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"
import CameraIcon from "@mui/icons-material/Camera"
import ComputerIcon from "@mui/icons-material/Computer"

// "chainId": 8,
// "checkerId": 5,
// "chainFlow": null,

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

function ChainDetails() {
  let { chainid } = useParams()
  const {
    pending: chainPending,
    chainFlow,
    error: chainError,
  } = useSelector((state) => state.ChainDetail)
  console.log("🚀 ~ ChainDetails ~ chainFlow:", chainFlow)

  const { chainPositions } = useSelector((state) => state.Position)
  // console.log("🚀 ~ ChainDetails ~ positions:", chainPositions)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChainDetailsByChainId(chainid))
    dispatch(getPositionsByIds(chainFlow))
  }, [chainid, dispatch, chainFlow])

  if (chainPending) {
    return `loading.. `
  }

  if (chainFlow === "") {
    return (
      <>
        {chainError}
        <h1>Chain Details is not created </h1>
        <Link to="/admin/Chain">Create chain Details</Link>
      </>
    )
  }

  return (
    <Form>
      <Grid sx={{ "& .MuiTextField-root": { m: 1, width: "100vw" } }}>
        {chainPositions &&
          chainPositions.map((p, index) => (
            <h1 key={index}> {p.positionName}</h1>
          ))}
        <Stack sx={{ width: "90%", mt: "30px" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={chainPositions.length}
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
      {/* {JSON.stringify(positions)} */}
    </Form>
  )
}

export default ChainDetails
