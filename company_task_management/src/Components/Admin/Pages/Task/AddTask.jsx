import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MyButton from "../../../Layout/MyButton";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { TaskSchema } from "../../../Validation/validationSchema";

const AddTask = () => {
  // State variables to hold form data
  const [showOpenForm, setshowOpenForm] = useState(false);
  const [showClosedForm, setShowClosedForm] = useState(false);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const [additionalInputCount, setAdditionalInputCount] = useState(0);
  // const [addictionInputValues, setaddictionInputValues] = useState({})

  const initValue = {
    taskName: "",
    rate: "",
    unit: "",
    instructions: "",
    start_date: "",
    end_date_increase_time: "",
    description: "",
    duration: "",
    checklist: "",
    chainid: "",
    Position: "",
  };

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: TaskSchema,
      onSubmit: (data) => {
        alert("hello world");
        console.log(data);
      },
    }
  );

  const handleAddTask = () => {};

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setshowOpenForm(value === "open");
    setShowClosedForm(value === "closed");
  };

  const handleAddInput = () => {
    setAdditionalInputCount((prevCount) => prevCount + 1);
    setShowAdditionalInputs(true);
  };

  const handleDeleteInput = () => {
    setAdditionalInputCount((prevCount) => prevCount - 1);
  };

  return (
    <div>
      {/* <Formik onSubmit={handleSubmit}>
        {({ isSubmitting }) => ( */}
      <form onSubmit={handleSubmit} style={{ width: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <Grid sx={{ "& .MuiTextField-root": { m: 1, width: "100vh" } }}>
            <TextField
              size="small"
              label="task Name"
              name="taskName"
              //value={formData.taskName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/* {errors.taskName && touched.taskName ? (
              <Typography variant="caption" color="error">
                {errors.taskName}
              </Typography>
            ) : null} */}

            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Position </InputLabel>
              <Select
                size="small"
                name="Position"
                // value={employeeData.Position}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="video editior">video editior</MenuItem>
                <MenuItem value="writer">writer</MenuItem>
                <MenuItem value="Enimation">Enimation</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="rate"
              label="Rate"
              //value={formData.rate}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />

            {/* {errors.rate && touched.rate ? (
              <Typography variant="caption" color="error">
                {errors.rate}
              </Typography>
            ) : null} */}

            <TextField
              id="unit"
              name="unit"
              label="Unit"
              //value={formData.unit}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />
            {/* {errors.unit && touched.unit ? (
              <Typography variant="caption" color="error">
                {errors.unit}
              </Typography>
            ) : null} */}
            <TextField
              id="instructions"
              name="instructions"
              label="Instructions"
              //value={formData.instructions}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />
            {/* {errors.instructions && touched.instructions ? (
              <Typography variant="caption" color="error">
                {errors.instructions}
              </Typography>
            ) : null} */}

            <Typography
              variant="h6"
              component="h6"
              color="#7986cb"
              textAlign="center"
            >
              Set Reminder
            </Typography>
            <Divider width="100%" sx={{ marginBottom: ".5rem" }} />

            <RadioGroup
              name="formStatus"
              value={showOpenForm ? "open" : "closed"}
              onChange={handleRadioChange}
            >
              <Box marginLeft="10px">
                <FormControlLabel
                  value="open"
                  control={<Radio />}
                  label="Time"
                />
                <FormControlLabel
                  value="closed"
                  control={<Radio />}
                  label="Date"
                />
              </Box>
            </RadioGroup>

            {showOpenForm && (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Duration number"
                  type="number"
                  variant="outlined"
                  size="small"
                  name="duration"
                  //sx={{ width: "10%" }}

                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* {errors.duration && touched.duration ? (
                  <Typography variant="caption" color="error">
                    {errors.duration}
                  </Typography>
                ) : null} */}

                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel>duration </InputLabel>
                  <Select
                    size="small"
                    name="duration"
                    // value={employeeData.duration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="">
                      <div>Select Duration</div>
                    </MenuItem>
                    <MenuItem value="minute">Minute</MenuItem>
                    <MenuItem value="hour">Hour</MenuItem>
                    <MenuItem value="day">Day</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                  </Select>
                </FormControl>
              </form>
            )}
            {showClosedForm && (
              <form>
                <TextField
                  id="start_date"
                  name="start_date"
                  type="date"
                  //value={formData.start_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                />
                {/* {errors.start_date && touched.start_date ? (
                  <Typography variant="caption" color="error">
                    {errors.start_date}
                  </Typography>
                ) : null} */}
                <TextField
                  id="end_date_increase_time"
                  name="end_date_increase_time"
                  type="date"
                  //value={formData.end_date_increase_time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                />
                {/* {errors.end_date_increase_time &&
                 touched.end_date_increase_time ? (
                   <Typography variant="caption" color="error">
                     {errors.end_date_increase_time}
                   </Typography>
                 ) : null} */}
              </form>
            )}
            <TextField
              name="description"
              label="Description"
              //value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />
            {/* {errors.description && touched.description ? (
              <Typography variant="caption" color="error">
                {errors.description}
              </Typography>
            ) : null} */}
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>chain </InputLabel>
              <Select
                //value={formData.teamname}
                onChange={handleChange}
                label="chain"
                name="chainid"
                size="small"
              >
                <MenuItem value="">
                  <div>Select chain</div>
                </MenuItem>
                <MenuItem value={"chain1"}>chain1</MenuItem>
                <MenuItem value={"chain2"}>chain2</MenuItem>
                <MenuItem value={"chain3"}>chain3</MenuItem>
                <MenuItem value={"chain4"}>chain4</MenuItem>
                <MenuItem value={"chain5"}>chain5</MenuItem>
              </Select>
            </FormControl>

            <Typography
              variant="h6"
              component="h6"
              color="#7986cb"
              textAlign="center"
            >
              Checklist
            </Typography>
            <Divider width="100%" sx={{ marginBottom: ".5rem" }} />
            {showAdditionalInputs && (
              <div>
                {[...Array(additionalInputCount)].map((_, index) => (
                  <div key={index}>
                    <TextField
                      label={`check list ${index + 1}`}
                      //variant="outlined"
                      fullWidth
                      name={`checkList ${index + 1}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      size="small"
                    />
                    {/* {errors.checklist && touched.checklist ? (
                      <Typography variant="caption" color="error">
                        {errors.checklist}
                      </Typography>
                    ) : null} */}

                    <Button
                      variant="outlined"
                      sx={{ marginLeft: "0.5rem" }}
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={handleDeleteInput}
                    >
                      Delete checklist
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Render button to add input */}

            <Button
              variant="outlined"
              sx={{ width: "97%", margin: "0.5rem 0 0 0.5rem" }}
              onClick={handleAddInput}
              startIcon={<AddIcon />}
            >
              Add Checklist
            </Button>
          </Grid>
        </div>
        {/* </Stack> */}
        <MyButton type="submit" fullWidth={true} onSmash={handleAddTask}>
          Submit
        </MyButton>
      </form>
      {/* )}
      </Formik> */}
    </div>
  );
};

export default AddTask;
