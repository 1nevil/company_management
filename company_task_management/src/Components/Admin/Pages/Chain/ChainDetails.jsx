import React, { useState } from "react";
import { Form, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Autocomplete,
  Dialog,
  DialogActions,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ChainDetailSchema } from "../../../Validation/validationSchema";
import { useFormik } from "formik";

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
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

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
}));

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
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ["Writer", "anchor", "video editor", "boss"];

function ChainDetails() {
  const [openTeam, setopenTeam] = React.useState(false);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const [additionalInputCount, setAdditionalInputCount] = useState(0);
  const [checklistItems, setChecklistItems] = useState([]);

  const [checker, setChecker] = useState();

  const handleChange = (index) => (event) => {
    const newChecklistItems = [...checklistItems];
    newChecklistItems[index] = event.target.value;
    setChecklistItems(newChecklistItems);
  };

  const handleChangeChecker = (event) => {
    setChecker(event.target.value);
  };

  const handleAddInput = () => {
    setAdditionalInputCount(additionalInputCount + 1);
    setShowAdditionalInputs(true);
    setChecklistItems([...checklistItems, null]);
  };

  const handleDeleteInput = (index) => () => {
    const newChecklistItems = [...checklistItems];
    newChecklistItems.splice(index, 1);
    setChecklistItems(newChecklistItems);
    setAdditionalInputCount(additionalInputCount - 1);
    if (additionalInputCount === 1) {
      setShowAdditionalInputs(false);
    }
  };

  let { chainid } = useParams();
  const handleClickChainDetail = () => {
    setopenTeam(true);
  };

  const handleClose = () => {
    setopenTeam(false);
  };

  const handleSubmit = () => {
    console.log(chainid);
    console.log(checker);
    console.log(checklistItems);
  };
  const initValue = {
    ChainName: "",
  };
  const { errors, touched, handleBlur } = useFormik({
    initialValues: initValue,
    validationSchema: ChainDetailSchema,
    onSubmit: (data) => {
      alert("hello world");
      console.log(data);
    },
  });

  return (
    <Form>
      <Grid sx={{ "& .MuiTextField-root": { m: 1, width: "100vw" } }}>
        <Box sx={{ display: "flex", justifyContent: "end", gap: "10px" }}>
          <Box sx={{ marginTop: "8px" }}>Chain Id : {chainid}</Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleClickChainDetail}
          >
            Add ChainDetails
          </Button>
        </Box>
        <Dialog open={openTeam} onClose={handleClose}>
          {/* <AddChain></AddChain> */}
          <Box sx={{ width: "30rem", padding: "3rem 3rem" }}>
            <Box>
              <Typography variant="h6" component="h2" textAlign="center">
                Enter Chain details
              </Typography>
              <Divider width="100%" sx={{ padding: ".5rem" }} />
              <Box mt={1}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Select Checker
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    value={checker}
                    label="Select Checker"
                    onChange={handleChangeChecker}
                    onBlur={handleBlur}
                    name="chainId"
                  >
                    <MenuItem value="1">Nevil</MenuItem>
                    <MenuItem value="2">Sanjeev</MenuItem>
                    <MenuItem value="3">Sujeet</MenuItem>
                  </Select>
                </FormControl>
                {errors.chainId && touched.chainId ? (
                  <Typography variant="caption" color="error">
                    {errors.chainId}
                  </Typography>
                ) : null}
              </Box>
            </Box>
            <Box mt={1} sx={{ lineHeight: ".5px" }}>
              {showAdditionalInputs && (
                <div>
                  {[...Array(additionalInputCount)].map((_, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        margin: "4px",
                      }}
                    >
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Select Position
                        </InputLabel>
                        <Select
                          labelId={`select-label-${index}`}
                          id={`select-${index}`}
                          value={checklistItems[index] || ""}
                          onChange={handleChange(index)}
                          fullWidth
                        >
                          <MenuItem value="" disabled>
                            Select Position
                          </MenuItem>
                          <MenuItem value="1">Nevil</MenuItem>
                          <MenuItem value="2">Sanjeev</MenuItem>
                          <MenuItem value="3">Sujeet</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={handleDeleteInput(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <Box mt={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleAddInput}
                  startIcon={<AddIcon />}
                >
                  Add Positions To Chain
                </Button>
              </Box>
            </Box>
            <Box mt={2}>
              <Button fullWidth variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Stack sx={{ width: "90%", mt: "30px" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={steps.length}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </Grid>
    </Form>
  );
}

export default ChainDetails;
