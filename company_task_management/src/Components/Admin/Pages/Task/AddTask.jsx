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

  const [formData, setFormData] = useState({
    taskName: "",
    rate: "",
    role_id: "",
    task_dependency: "",
    unit: "",
    instructions: "",
    start_date: "",
    end_date_increase_time: "",
    employee_id: "",
    description: "",
    department: "",
    subdepartment_id: "",
    task_status: "",
    duration: "",
    checklist: "",
    set_Reminder: " ",
    teamname: "",
  });

  const initValue = {
    taskName: "",
    rate: "",
    role_id: "",
    task_dependency: "",
    unit: "",
    instructions: "",
    start_date: "",
    end_date_increase_time: "",
    employee_id: "",
    description: "",
    department: "",
    subdepartment_id: "",
    task_status: "",
    duration: "",
    checklist: "",
    set_Reminder: " ",
    teamname: "",
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

  // Handle form submission
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Do something with the form data, e.g., send it to a server
  //   console.log(formData);
  // };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(name);
  };

  // const handlechecklistInputChange = (event) => {
  //   const { name, value } = event.target
  //   console.log(`${name} ${value}`)
  //   setaddictionInputValues({ ...addictionInputValues, [name]: value })
  //   console.log(name)
  // }

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
    <>
      <Formik onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <form onSubmit={handleSubmit} style={{ width: "100vh" }}>
            {/* <Stack
              gap={5}
              direction={["column", "row"]}
              style={{
                padding: "20px",
                borderRadius: "20px",
                display: { sm: "block", md: "flex", lg: "flex" },
                justifyContent: "space-around",
              }}
            > */}
            <div style={{ textAlign: "center" }}>
              <Grid sx={{ "& .MuiTextField-root": { m: 1, width: "100vh" } }}>
                {/* <Grid item xs={6}> */}
                {/* <Field
                    required
                    id="taskName"
                    name="taskName"
                    label="Add Task"
                    value={formData.taskName}
                    size="small"
                    onChange={handleInputChange}
                    inputProps={{ "aria-label": "Department" }}
                    sx={{ width: "14rem" }}
                    displayEmpty
                    as={TextField}
                  /> */}
                <TextField
                  fullWidth
                  label="task Name"
                  name="taskName"
                  value={formData.taskName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.taskName && touched.taskName ? (
                  <Typography variant="caption" color="error">
                    {errors.taskName}
                  </Typography>
                ) : null}
                {/* </Grid> */}
                {/* <FormControl
                  value={formData.department}
                  onChange={handleInputChange}
                  displayEmpty
                  name="department"
                  inputProps={{ "aria-label": "Without label" }}
                  //sx={{ width: "46%", marginLeft: "8px" }}
                  sx={{ width: "97.5%" }}
                  size="small"
                >
                  <MenuItem value="">
                    <div>Department</div>
                  </MenuItem>
                  <MenuItem value={"script_writing"}>Script Writing</MenuItem>
                  <MenuItem value={"content_writing"}>Content Writing</MenuItem>
                </FormControl> */}
                {/* <FormControl fullWidth> */}
                {/* <InputLabel>Department</InputLabel> */}
                <Field
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  //sx={{ width: "46%", marginLeft: "34px" }}
                  sx={{ width: "97.5%", marginLeft: "8px" }}
                  size="small"
                  as={Select}
                >
                  <MenuItem value="">
                    <>Department</>
                  </MenuItem>
                  <MenuItem value={"script_writing"}>Script Writing</MenuItem>
                  <MenuItem value={"content_writing"}>Content Writing</MenuItem>
                </Field>
                {/* </FormControl> */}
                {errors.department && touched.department ? (
                  <Typography variant="caption" color="error">
                    {errors.department}
                  </Typography>
                ) : null}

                <Field
                  value={formData.subdepartment_id}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  displayEmpty
                  name="subdepartment_id"
                  inputProps={{ "aria-label": "Without label" }}
                  //sx={{ width: "46%", marginLeft: "34px" }}
                  sx={{ width: "97.5%", marginLeft: "8px" }}
                  size="small"
                  as={Select}
                >
                  <MenuItem value="">
                    <>Sub Department</>
                  </MenuItem>
                  <MenuItem value={"comedy"}>comedy</MenuItem>
                  <MenuItem value={"politics"}>politics</MenuItem>
                </Field>
                {errors.subdepartment_id && touched.subdepartment_id ? (
                  <Typography variant="caption" color="error">
                    {errors.subdepartment_id}
                  </Typography>
                ) : null}

                <Field
                  required
                  id="rate"
                  name="rate"
                  label="Rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  size="small"
                  as={TextField}
                />
                {errors.rate && touched.rate ? (
                  <Typography variant="caption" color="error">
                    {errors.rate}
                  </Typography>
                ) : null}
                <Field
                  required
                  id="unit"
                  name="unit"
                  label="Unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  size="small"
                  as={TextField}
                />
                {errors.unit && touched.unit ? (
                  <Typography variant="caption" color="error">
                    {errors.unit}
                  </Typography>
                ) : null}
                <Field
                  required
                  id="instructions"
                  name="instructions"
                  label="Instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  size="small"
                  as={TextField}
                />
                {errors.instructions && touched.instructions ? (
                  <Typography variant="caption" color="error">
                    {errors.instructions}
                  </Typography>
                ) : null}
                {/* <TextField
          required
          id="Set Reminder"
          name="set_Reminder"
          label="Set Reminder"
          value={formData.set_Reminder}
          onChange={handleInputChange}
          size='small'
        /> */}

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
                    <Field
                      label="Duration number"
                      type="number"
                      variant="outlined"
                      size="small"
                      name="duration"
                      //sx={{ width: "10%" }}
                      as={TextField}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.duration && touched.duration ? (
                      <Typography variant="caption" color="error">
                        {errors.duration}
                      </Typography>
                    ) : null}
                    <Field
                      value={formData.duration}
                      name="duration"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ width: "97.5%" }}
                      size="small"
                      as={Select}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="">
                        <div>Select Duration</div>
                      </MenuItem>
                      <MenuItem value={"minute"}>Minute</MenuItem>
                      <MenuItem value={"hour"}>Hour</MenuItem>
                      <MenuItem value={"day"}>Day</MenuItem>
                      <MenuItem value={"month"}>Month</MenuItem>
                      <MenuItem value={"year"}>Year</MenuItem>
                    </Field>
                    {errors.duration && touched.duration ? (
                      <Typography variant="caption" color="error">
                        {errors.duration}
                      </Typography>
                    ) : null}
                  </form>
                )}
                {showClosedForm && (
                  <form>
                    <Field
                      required
                      id="start_date"
                      name="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      size="small"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="start_date"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <TextField
                      required
                      id="end_date_increase_time"
                      name="end_date_increase_time"
                      type="date"
                      value={formData.end_date_increase_time}
                      onChange={handleInputChange}
                      size="small"
                      as={TextField}
                    />
                    <ErrorMessage
                      name="end_date_increase_time"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </form>
                )}
                <TextField
                  required
                  id="description "
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  size="small"
                />

                <Select
                  value={formData.teamname}
                  onChange={handleInputChange}
                  name="teamname"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ width: "97.5%", marginLeft: "8px" }}
                  size="small"
                >
                  <MenuItem value="">
                    <div>Select team</div>
                  </MenuItem>
                  <MenuItem value={"team1"}>team1</MenuItem>
                  <MenuItem value={"team2"}>team2</MenuItem>
                  <MenuItem value={"team3"}>team3</MenuItem>
                  <MenuItem value={"team4"}>team4</MenuItem>
                  <MenuItem value={"team5"}>team5</MenuItem>
                </Select>

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
                          variant="outlined"
                          fullWidth
                          name={`checkList ${index + 1}`}
                          onChange={handleInputChange}
                          size="small"
                        />

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
        )}
      </Formik>
    </>
  );
};

export default AddTask;
