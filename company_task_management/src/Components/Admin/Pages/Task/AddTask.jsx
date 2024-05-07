/* eslint-disable react/jsx-key */
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
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MyButton from "../../../Layout/MyButton";
import { useFormik } from "formik";
import { TaskSchema } from "../../../Validation/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { fetchChainMater } from "../../../../Slices/ChainSliceMaster";
import { fetchPosition } from "../../../../Slices/PositionSlice";
import { insertTask } from "../../../../Slices/TaskSlice";

const AddTask = () => {
  const [showOpenForm, setshowOpenForm] = useState(false);
  const [showClosedForm, setShowClosedForm] = useState(false);

  const dispatch = useDispatch();

  const chainMaster = useSelector((state) => state.Chain.chainMaster);
  const Positions = useSelector((state) => state.Position.positions);

  console.log(chainMaster);

  const initValue = {
    taskName: "",
    rate: "",
    unit: "",
    instructions: "",
    start_date: "",
    end_date_increase_time: "",
    description: "",
    durationNum: "",
    checklist: "",
    chainid: "",
    Position: "",
  };
  useEffect(() => {
    dispatch(fetchChainMater());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchPosition());
  }, [dispatch]);

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: TaskSchema,
      onSubmit: (data) => {
        alert("hello world");
        console.log(data);
        let TaskStatus = "Pending";
        data.durationNum = String(data.durationNum);
        dispatch(insertTask({ ...data, TaskStatus }));
      },
    }
  );

  const handleAddTask = () => {};

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setshowOpenForm(value === "open");
    setShowClosedForm(value === "closed");
  };

  return (
    <div>
      {/* {JSON.stringify(chainMaster)} */}
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
            {errors.taskName && touched.taskName ? (
              <Typography variant="caption" color="error">
                {errors.taskName}
              </Typography>
            ) : null}

            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel>Position </InputLabel>
              <Select
                size="small"
                name="currentPostion"
                // value={employeeData.Position}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {Positions?.map((position) => {
                  return (
                    <MenuItem value={position.positionId}>
                      {position.positionName}
                    </MenuItem>
                  );
                })}
                <MenuItem value="video editior">video editior</MenuItem>
                <MenuItem value="writer">writer</MenuItem>
                <MenuItem value="Enimation">Enimation</MenuItem>
              </Select>
            </FormControl>

            {/* <TextField
              name="rate"
              label="Rate"
              //value={formData.rate}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />

            {errors.rate && touched.rate ? (
              <Typography variant="caption" color="error">
                {errors.rate}
              </Typography>
            ) : null} */}

            {/* <TextField
              id="unit"
              name="unit"
              label="Unit"
              //value={formData.unit}
              onChange={handleChange}
              onBlur={handleBlur}
              size="small"
            />
            {errors.unit && touched.unit ? (
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
            {errors.instructions && touched.instructions ? (
              <Typography variant="caption" color="error">
                {errors.instructions}
              </Typography>
            ) : null}

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
                  name="durationNum"
                  //sx={{ width: "10%" }}

                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.duration && touched.duration ? (
                  <Typography variant="caption" color="error">
                    {errors.duration}
                  </Typography>
                ) : null}

                {/* <FormControl fullWidth sx={{ m: 1 }}>
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
                </FormControl> */}
              </form>
            )}
            {showClosedForm && (
              <form>
                <TextField
                  id="start_date"
                  name="startDate"
                  type="date"
                  //value={formData.start_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                />
                {errors.start_date && touched.start_date ? (
                  <Typography variant="caption" color="error">
                    {errors.start_date}
                  </Typography>
                ) : null}
                <TextField
                  id="end_date_increase_time"
                  name="endDate"
                  type="date"
                  //value={formData.end_date_increase_time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="small"
                />
                {/* {errors.end_date_increase_time &&
                //  touched.end_date_increase_time ? (
                //    <Typography variant="caption" color="error">
                //      {errors.end_date_increase_time}
                //    </Typography>
                //  ) : null} */}
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
            {errors.description && touched.description ? (
              <Typography variant="caption" color="error">
                {errors.description}
              </Typography>
            ) : null}
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
                {chainMaster?.map((chain) => {
                  return (
                    <MenuItem value={chain.chainId}>{chain.chainName}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </div>
        <MyButton type="submit" fullWidth={true} onSmash={handleAddTask}>
          Submit
        </MyButton>
      </form>
    </div>
  );
};

export default AddTask;
