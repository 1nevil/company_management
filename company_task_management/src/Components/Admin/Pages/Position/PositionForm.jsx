import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { PositionSchema } from "../../../Validation/validationSchema";
import { insertPosition } from "../../../../Slices/PositionSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const PositionForm = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [guidlines, setGuidlines] = useState([]);
  const [showAdditionalInputs, setShowAdditionalInputs] = useState(false);
  const [additionalInputCount, setAdditionalInputCount] = useState(0);
  const [inputs, setInputs] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddInput = () => {
    setShowAdditionalInputs(true);
    setAdditionalInputCount((prevCount) => prevCount + 1);
  };

  const handleDeleteInput = () => {
    setAdditionalInputCount((prevCount) => Math.max(0, prevCount - 1));
  };

  const handleGuildlineChange = (event, index) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const initValue = {
    positionName: "",
    duration: "",
    unit: "",
    unitName: "",
    rate: "",
    durationType: "",
  };

  // const handleAddInput = () => {
  //   setAdditionalInputCount((prevCount) => prevCount + 1);
  //   setShowAdditionalInputs(true);
  // };

  // const handleDeleteInput = () => {
  //   setAdditionalInputCount((prevCount) => prevCount - 1);
  // };

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: PositionSchema,
      onSubmit: (data) => {
        const positionWithGuidlines = { ...data, positionGuidelines: inputs };

        console.log("🚀 ~ PositionForm ~ data:", positionWithGuidlines);

        handleClose();
        dispatch(insertPosition(positionWithGuidlines));
        setAdditionalInputCount(0);
      },
    }
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Position
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Position</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ paddingTop: "10px" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Position Name"
                  name="positionName"
                  //value={employeeData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.positionName && touched.positionName ? (
                  <Typography variant="caption" color="error">
                    {errors.positionName}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  name="duration"
                  // value={employeeData.Duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.duration && touched.duration ? (
                  <Typography variant="caption" color="error">
                    {errors.duration}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Duration Type</InputLabel>
                  <Select
                    name="durationType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="">
                      <em>Select Duration Type</em>
                    </MenuItem>
                    <MenuItem value="Minutes">Minutes</MenuItem>
                    <MenuItem value="Hours">Hours</MenuItem>
                    <MenuItem value="Days">Days</MenuItem>
                    <MenuItem value="Weeks">Weeks</MenuItem>
                    <MenuItem value="Month">Month</MenuItem>
                    <MenuItem value="Year">Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Unit"
                  name="unit"
                  //value={employeeData.Unit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.unit && touched.unit ? (
                  <Typography variant="caption" color="error">
                    {errors.unit}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Unit Name"
                  name="unitName"
                  //value={employeeData.Unit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.unitName && touched.unitName ? (
                  <Typography variant="caption" color="error">
                    {errors.unitName}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Rate Per Unit"
                  name="rate"
                  // value={employeeData.Rate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.rate && touched.rate ? (
                  <Typography variant="caption" color="error">
                    {errors.rate}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
            <Grid sx={{ "& .MuiTextField-root": { m: 1 } }}>
              <Typography
                variant="h6"
                component="h6"
                color="#7986cb"
                textAlign="center"
              >
                guideline
              </Typography>
              <Divider width="100%" sx={{ marginBottom: ".5rem" }} />
              {showAdditionalInputs && (
                <div>
                  {[...Array(additionalInputCount)].map((_, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <TextField
                        label={`guideline ${index + 1}`}
                        multiline
                        rows={2}
                        fullWidth
                        name={`guideline ${index + 1}`}
                        onChange={(event) =>
                          handleGuildlineChange(event, index)
                        }
                        // onBlur={handleBlur}
                      />
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={handleDeleteInput}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
              )}
              <Button
                variant="outlined"
                sx={{ width: "97%", margin: "0.5rem 0 0 0.5rem" }}
                onClick={handleAddInput}
                startIcon={<AddIcon />}
              >
                Add Guideline
              </Button>
              {/* <Button
                variant="outlined"
                onClick={handleLogData}
                sx={{ width: "97%", margin: "0.5rem 0 0 0.5rem" }}
              >
                Log Data
              </Button> */}
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Add Position
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PositionForm;
