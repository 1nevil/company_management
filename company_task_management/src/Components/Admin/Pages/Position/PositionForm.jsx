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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { PositionSchema } from "../../../Validation/validationSchema";
import {
  insertPosition,
  fetchPosition,
} from "../../../../Slices/PositionSlice";
import { useDispatch } from "react-redux";

// const Positions = ["Engineering", "Marketing", "Finance", "HR"];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const PositionForm = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const initValue = {
    PositionName: "",
    Duration: "",
    Unit: "",
    Unitname: "",
    Rate: "",
  };

  const { errors, touched, handleChange, handleSubmit, handleBlur } = useFormik(
    {
      initialValues: initValue,
      validationSchema: PositionSchema,
      onSubmit: (data) => {
        handleClose();
        dispatch(insertPosition(data));
      },
    }
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Position
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Position</DialogTitle>
        <DialogContent>
          <form style={{ paddingTop: "10px" }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Position Name"
                  name="PositionName"
                  //value={employeeData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.PositionName && touched.PositionName ? (
                  <Typography variant="caption" color="error">
                    {errors.PositionName}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  name="Duration"
                  // value={employeeData.Duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.Duration && touched.Duration ? (
                  <Typography variant="caption" color="error">
                    {errors.Duration}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Unit"
                  name="Unit"
                  //value={employeeData.Unit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.Unit && touched.Unit ? (
                  <Typography variant="caption" color="error">
                    {errors.Unit}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Unitname</InputLabel>
                  <Select
                    name="Unitname"
                    // value={employeeData.Unitname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="word">word</MenuItem>
                    <MenuItem value="Paragraph">Paragraph</MenuItem>
                    <MenuItem value="Pages">Pages</MenuItem>
                  </Select>
                </FormControl>
                {errors.Unitname && touched.Unitname ? (
                  <Typography variant="caption" color="error">
                    {errors.Unitname}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Rate"
                  name="Rate"
                  // value={employeeData.Rate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.Rate && touched.Rate ? (
                  <Typography variant="caption" color="error">
                    {errors.Rate}
                  </Typography>
                ) : null}
              </Grid>
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
