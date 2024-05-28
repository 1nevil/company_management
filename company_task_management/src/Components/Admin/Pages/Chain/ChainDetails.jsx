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
import { Grid, Box, Typography, Alert } from "@mui/material"
import { Skeleton } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getChainDetailsByChainId } from "../../../../Slices/ChainDetailsSlice"
import { getPositionsByIds } from "../../../../Slices/PositionSlice"
import EngineeringIcon from "@mui/icons-material/Engineering"
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"
import ComputerIcon from "@mui/icons-material/Computer"
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft"
import CallMadeIcon from "@mui/icons-material/CallMade"

// Define the number of steps per row
const stepsPerRow = 5

// Styled component for the step icon in Qonto style
const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  backgroundImage: "linear-gradient( 95deg, #00bcd4 0%, #3f51b5 100%)",
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
  "& .QontoStepIcon-completedIcon": {
    zIndex: 1,
    fontSize: 20,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}))

// Custom step icon component for Qonto style
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

// Styled component for the step connector with Colorlib style
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient( 95deg, #00bcd4 0%, #3f51b5 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient( 95deg, #00bcd4 0%, #3f51b5 100%)",
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

// Styled component for the step icon with Colorlib style
const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "linear-gradient( 136deg, #00bcd4 0%, #3f51b5 100%)",
  boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
}))

// Custom step icon component for Colorlib style
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

// Main component for displaying chain details
function ChainDetails() {
  let { chainid } = useParams()
  const {
    pending: chainPending,
    chainFlow,
    error: chainError,
  } = useSelector((state) => state.ChainDetail)
  const { chainPositions } = useSelector((state) => state.Position)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChainDetailsByChainId(chainid))
    dispatch(getPositionsByIds(chainFlow))
  }, [chainid, dispatch, chainFlow])

  // Function to chunk the array into smaller arrays for each row of steps
  const chunkArray = (array, chunkSize) => {
    const chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
  }

  // Chunk the positions array into smaller arrays for each row
  const stepChunks = chunkArray(chainPositions, stepsPerRow)

  // Render loading skeleton if data is pending
  if (chainPending) {
    return <Skeleton variant="rectangular" width="100%" height={60} />
  }

  // Render error message if chain details are not found
  if (chainError) {
    return (
      <>
        <Alert variant="filled" severity="error">
          {chainError}
        </Alert>
        <Box mt={2}>
          <Link
            style={{ color: "blue", textDecoration: "none" }}
            to="/admin/Chain"
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <CallMadeIcon /> Go back to chain page !!
            </Box>
          </Link>
        </Box>
      </>
    )
  }

  // Render the chain details with stepper
  return (
    <Form>
      <Grid container justifyContent="center">
        <Box sx={{ width: "90%", mt: "30px" }}>
          {stepChunks.map((chunk, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Stepper alternativeLabel connector={<ColorlibConnector />}>
                {chunk.map((position, posIndex) => (
                  <Step key={position.id}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      <Typography sx={{ fontWeight: 500 }} variant="body2">
                        {position.positionName}
                      </Typography>
                    </StepLabel>
                    {/* Render arrow icon for last step in each row */}
                    {posIndex === stepsPerRow - 1 &&
                      index !== stepChunks.length - 1 && (
                        <StepLabel icon={<SubdirectoryArrowLeftIcon />} />
                      )}
                  </Step>
                ))}
              </Stepper>
            </Box>
          ))}
        </Box>
      </Grid>
    </Form>
  )
}

export default ChainDetails
